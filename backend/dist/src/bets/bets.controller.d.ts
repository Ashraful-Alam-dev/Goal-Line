import { BetsService } from './bets.service';
export declare class BetsController {
    private readonly betsService;
    constructor(betsService: BetsService);
    placeBet(req: any, body: any): Promise<{
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
    myBets(req: any): Promise<({
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
