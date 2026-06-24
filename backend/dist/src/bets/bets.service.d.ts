import { PrismaService } from '../../prisma/prisma.service';
export declare class BetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    placeBet(userId: string, dto: any): Promise<{
        id: string;
        userId: string;
        fixtureId: string;
        marketType: import("@prisma/client").$Enums.MarketType;
        prediction: import("@prisma/client").$Enums.Prediction;
        stake: number;
        payout: number;
        status: import("@prisma/client").$Enums.BetStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    myBets(userId: string): Promise<({
        fixture: {
            id: string;
            status: import("@prisma/client").$Enums.FixtureStatus;
            homeTeam: string;
            awayTeam: string;
            finalHomeScore: number;
            finalAwayScore: number;
        };
    } & {
        id: string;
        userId: string;
        fixtureId: string;
        marketType: import("@prisma/client").$Enums.MarketType;
        prediction: import("@prisma/client").$Enums.Prediction;
        stake: number;
        payout: number;
        status: import("@prisma/client").$Enums.BetStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
