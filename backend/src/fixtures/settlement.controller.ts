import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { BetStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { FixtureStatus } from '@prisma/client';

@Controller('fixtures')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class SettlementController {
  constructor(private readonly prisma: PrismaService) {}

  @Post(':id/start')
  async startFixture(
    @Param('id') id: string,
  ) {
    const fixture = await this.prisma.fixture.findUnique({
      where: { id },
    });

    if (!fixture) {
      throw new BadRequestException('Fixture not found');
    }

    if (fixture.status === FixtureStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Match already started',
      );
    }

    if (fixture.status === FixtureStatus.SETTLED) {
      throw new BadRequestException(
        'Match already settled',
      );
    }

    return this.prisma.fixture.update({
      where: { id },
      data: {
        status: FixtureStatus.IN_PROGRESS,
      },
    });
  }


  @Post(':id/settle')
  async settleFixture(
    @Param('id') id: string,
    @Body() body: { homeScore: number; awayScore: number },
  ) {
    const { homeScore, awayScore } = body;

    return this.prisma.$transaction(async (tx) => {
      const fixture = await tx.fixture.findUnique({
        where: { id },
      });

      if (!fixture) {
        throw new BadRequestException('Fixture not found');
      }

      if (fixture.status === 'SETTLED') {
        throw new BadRequestException('Fixture already settled');
      }

      if (fixture.status === FixtureStatus.OPEN) {
        throw new BadRequestException('Start the match before settling it');
      }

      const trueResult =
        homeScore > awayScore
          ? 'HOME'
          : homeScore < awayScore
          ? 'AWAY'
          : 'DRAW';

      const totalGoals = homeScore + awayScore;

      const trueGoals =
        totalGoals > Number(fixture.goalsTarget)
          ? 'OVER'
          : 'UNDER';

      const trueBtts =
        homeScore > 0 && awayScore > 0
          ? 'YES'
          : 'NO';

      const pendingBets = await tx.bet.findMany({
        where: {
          fixtureId: id,
          status: BetStatus.PENDING,
        },
      });

      for (const bet of pendingBets) {
        let isWin = false;

        if (
          bet.marketType === 'RESULT' &&
          bet.prediction === trueResult
        ) {
          isWin = true;
        }

        if (
          bet.marketType === 'GOALS' &&
          bet.prediction === trueGoals
        ) {
          isWin = true;
        }

        if (
          bet.marketType === 'BTTS' &&
          bet.prediction === trueBtts
        ) {
          isWin = true;
        }

        await tx.bet.update({
          where: { id: bet.id },
          data: {
            status: isWin ? BetStatus.WON : BetStatus.LOST,
          },
        });

        if (isWin) {
          await tx.user.update({
            where: {
              id: bet.userId,
            },
            data: {
              points: {
                increment: bet.payout,
              },
            },
          });
        }
      }

      return tx.fixture.update({
        where: { id },
        data: {
          status: FixtureStatus.SETTLED,
          finalHomeScore: homeScore,
          finalAwayScore: awayScore,
        },
      });
    });
  }
}