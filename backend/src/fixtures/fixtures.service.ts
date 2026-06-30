import { Injectable } from '@nestjs/common';
import { FixtureStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FixturesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: any) {
    return this.prisma.fixture.create({
      data: {
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,

        oddsHome: Number(data.oddsHome),
        oddsAway: Number(data.oddsAway),
        oddsDraw: Number(data.oddsDraw),

        goalsTarget: new Prisma.Decimal(data.goalsTarget ?? 2.5),

        oddsOver: Number(data.oddsOver),
        oddsUnder: Number(data.oddsUnder),

        oddsBttsYes: Number(data.oddsBttsYes),
        oddsBttsNo: Number(data.oddsBttsNo),

        status: FixtureStatus.OPEN,
      },
    });
  }

  async findAllOpen() {
  return this.prisma.fixture.findMany({
    where: {
      status: {
        in: [
          FixtureStatus.OPEN,
          FixtureStatus.IN_PROGRESS,
        ],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

  async findSettled(limit = 50) {
    return this.prisma.fixture.findMany({
      where: {
        status: FixtureStatus.SETTLED,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: limit,
    });
  }

  async getLeaderboard(userId?: string) {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'USER',
      },
      select: {
        id: true,
        username: true,
        points: true,
      },
      orderBy: {
        points: 'desc',
      },
    });

    const leaderboard = users
      .slice(0, 10)
      .map((user, index) => ({
        rank: index + 1,
        username: user.username,
        points: user.points,
      }));

    let currentUser = null;

    if (userId) {
      const userIndex = users.findIndex(
        (user) => user.id === userId,
      );

      if (userIndex !== -1) {
        currentUser = {
          rank: userIndex + 1,
          username: users[userIndex].username,
          points: users[userIndex].points,
        };
      }
    }

    return {
      leaderboard,
      currentUser,
    };
  }
}