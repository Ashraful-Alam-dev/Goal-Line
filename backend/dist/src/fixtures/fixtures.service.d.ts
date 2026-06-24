import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class FixturesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        homeTeam: string;
        awayTeam: string;
        oddsHome: number;
        oddsAway: number;
        oddsDraw: number;
        goalsTarget: Prisma.Decimal;
        oddsOver: number;
        oddsUnder: number;
        oddsBttsYes: number;
        oddsBttsNo: number;
        status: import("@prisma/client").$Enums.FixtureStatus;
        finalHomeScore: number | null;
        finalAwayScore: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllOpen(): Promise<{
        id: string;
        homeTeam: string;
        awayTeam: string;
        oddsHome: number;
        oddsAway: number;
        oddsDraw: number;
        goalsTarget: Prisma.Decimal;
        oddsOver: number;
        oddsUnder: number;
        oddsBttsYes: number;
        oddsBttsNo: number;
        status: import("@prisma/client").$Enums.FixtureStatus;
        finalHomeScore: number | null;
        finalAwayScore: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findSettled(limit?: number): Promise<{
        id: string;
        homeTeam: string;
        awayTeam: string;
        oddsHome: number;
        oddsAway: number;
        oddsDraw: number;
        goalsTarget: Prisma.Decimal;
        oddsOver: number;
        oddsUnder: number;
        oddsBttsYes: number;
        oddsBttsNo: number;
        status: import("@prisma/client").$Enums.FixtureStatus;
        finalHomeScore: number | null;
        finalAwayScore: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getLeaderboard(): Promise<{
        username: string;
        points: number;
    }[]>;
}
