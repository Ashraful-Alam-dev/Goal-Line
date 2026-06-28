import { FixturesService } from './fixtures.service';
export declare class FixturesController {
    private readonly fixturesService;
    constructor(fixturesService: FixturesService);
    create(body: any): Promise<{
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
    findAllOpen(): Promise<{
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
    }[]>;
    getHistory(): Promise<{
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
    }[]>;
    getLeaderboard(req: any): Promise<{
        leaderboard: {
            rank: number;
            username: string;
            points: number;
        }[];
        currentUser: any;
    }>;
}
