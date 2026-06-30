import { PrismaService } from '../../prisma/prisma.service';
export declare class BetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    placeBet(userId: string, dto: any): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.BetStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fixtureId: string;
        marketType: import("@prisma/client").$Enums.MarketType;
        prediction: import("@prisma/client").$Enums.Prediction;
        stake: number;
        payout: number;
    }>;
    myBets(userId: string): Promise<({
        fixture: {
            id: string;
            homeTeam: string;
            awayTeam: string;
            status: import("@prisma/client").$Enums.FixtureStatus;
            finalHomeScore: number;
            finalAwayScore: number;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.BetStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fixtureId: string;
        marketType: import("@prisma/client").$Enums.MarketType;
        prediction: import("@prisma/client").$Enums.Prediction;
        stake: number;
        payout: number;
    })[]>;
    getAllBets(): Promise<({
        fixture: {
            id: string;
            homeTeam: string;
            awayTeam: string;
            status: import("@prisma/client").$Enums.FixtureStatus;
            finalHomeScore: number;
            finalAwayScore: number;
        };
        user: {
            id: string;
            username: string;
            points: number;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.BetStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fixtureId: string;
        marketType: import("@prisma/client").$Enums.MarketType;
        prediction: import("@prisma/client").$Enums.Prediction;
        stake: number;
        payout: number;
    })[]>;
}
