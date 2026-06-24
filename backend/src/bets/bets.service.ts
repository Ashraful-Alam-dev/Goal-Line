import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FixtureStatus, MarketType, Prediction, BetStatus } from '@prisma/client';

@Injectable()
export class BetsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async placeBet(userId: string, dto: any) {
    return this.prisma.$transaction(async (tx) => {
      const stake = Number(dto.stake);

      if (!stake || stake <= 0) {
        throw new BadRequestException(
          'Stake must be greater than 0',
        );
      }

      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException(
          'User not found',
        );
      }

      if (user.points < stake) {
        throw new BadRequestException(
          'Insufficient points',
        );
      }

      const fixture = await tx.fixture.findUnique({
        where: {
          id: dto.fixtureId,
        },
      });

      if (!fixture) {
        throw new BadRequestException(
          'Fixture not found',
        );
      }

      if (fixture.status !== FixtureStatus.OPEN) {
        throw new BadRequestException(
          'Fixture is closed',
        );
      }

      const existingBet = await tx.bet.findFirst({
        where: {
          userId,
          fixtureId: dto.fixtureId,
          marketType: dto.marketType,
        },
      });

      if (existingBet) {
        throw new BadRequestException(
          'You already placed this market bet',
        );
      }

      let targetOdds = 0;

      if (dto.marketType === MarketType.RESULT) {
        if (dto.prediction === Prediction.HOME) {
          targetOdds = fixture.oddsHome;
        }

        if (dto.prediction === Prediction.AWAY) {
          targetOdds = fixture.oddsAway;
        }

        if (dto.prediction === Prediction.DRAW) {
          targetOdds = fixture.oddsDraw;
        }
      }

      if (dto.marketType === MarketType.GOALS) {
        if (
          dto.prediction !== Prediction.OVER &&
          dto.prediction !== Prediction.UNDER
        ) {
          throw new BadRequestException(
            'Invalid prediction for GOALS market',
          );
        }

        targetOdds =
          dto.prediction === Prediction.OVER
            ? fixture.oddsOver
            : fixture.oddsUnder;
      }

      if (dto.marketType === MarketType.BTTS) {
        if (
          dto.prediction !== Prediction.YES &&
          dto.prediction !== Prediction.NO
        ) {
          throw new BadRequestException(
            'Invalid prediction for BTTS market',
          );
        }

        targetOdds =
          dto.prediction === Prediction.YES
            ? fixture.oddsBttsYes
            : fixture.oddsBttsNo;
      }

      if (!targetOdds) {
        throw new BadRequestException(
          'Invalid market or prediction',
        );
      }

      const payout = stake * targetOdds;

      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          points: {
            decrement: stake,
          },
        },
      });

      return tx.bet.create({
        data: {
          userId,
          fixtureId: dto.fixtureId,

          marketType: dto.marketType,
          prediction: dto.prediction,

          stake,
          payout,

          status: BetStatus.PENDING,
        },
      });
    });
  }

  async myBets(userId: string) {
    return this.prisma.bet.findMany({
      where: {
        userId,
      },
      include: {
        fixture: {
          select: {
            id: true,
            homeTeam: true,
            awayTeam: true,
            status: true,
            finalHomeScore: true,
            finalAwayScore: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}