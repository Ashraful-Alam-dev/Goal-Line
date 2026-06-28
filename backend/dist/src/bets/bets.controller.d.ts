import { BetsService } from './bets.service';
export declare class BetsController {
    private readonly betsService;
    constructor(betsService: BetsService);
    placeBet(req: any, body: any): Promise<{
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
    myBets(req: any): Promise<({
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
    getAllBets(): Promise<({
        user: {
            id: string;
            username: string;
            points: number;
        };
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
