import { PrismaService } from '../../prisma/prisma.service';
export declare class SettlementController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    startFixture(id: string): Promise<{
        id: string;
        homeTeam: string;
        awayTeam: string;
        oddsHome: number;
        oddsAway: number;
        oddsDraw: number;
        goalsTarget: import("@prisma/client/runtime/library").Decimal;
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
    settleFixture(id: string, body: {
        homeScore: number;
        awayScore: number;
    }): Promise<{
        id: string;
        homeTeam: string;
        awayTeam: string;
        oddsHome: number;
        oddsAway: number;
        oddsDraw: number;
        goalsTarget: import("@prisma/client/runtime/library").Decimal;
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
}
