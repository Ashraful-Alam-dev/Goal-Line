import { api } from "@/lib/api";

export type Fixture = {
  id: string;
  homeTeam: string;
  awayTeam: string;

  oddsHome: number;
  oddsAway: number;
  oddsDraw: number;

  oddsOver: number;
  oddsUnder: number;

  oddsBttsYes: number;
  oddsBttsNo: number;

  goalsTarget: number;

  status: "OPEN" | "IN_PROGRESS" | "SETTLED";

  finalHomeScore?: number | null;
  finalAwayScore?: number | null;

  createdAt?: string;
  updatedAt?: string;
};

export type CreateFixtureDto = {
  homeTeam: string;
  awayTeam: string;

  oddsHome: number;
  oddsAway: number;
  oddsDraw: number;

  goalsTarget: number;

  oddsOver: number;
  oddsUnder: number;

  oddsBttsYes: number;
  oddsBttsNo: number;
};

export type LeaderboardResponse = {
  leaderboard: {
    rank: number;
    username: string;
    points: number;
  }[];

  currentUser: {
    rank: number;
    username: string;
    points: number;
  } | null;
};

export const fixturesService = {
  getOpenFixtures: async () => {
    const res = await api.get<Fixture[]>("/fixtures");
    return res.data;
  },

  getHistory: async () => {
    const res = await api.get<Fixture[]>("/fixtures/history");
    return res.data;
  },

  createFixture: async (data: CreateFixtureDto) => {
    const res = await api.post("/fixtures", data);
    return res.data;
  },

  startFixture: async (id: string) => {
    const res = await api.post(`/fixtures/${id}/start`);
    return res.data;
  },

  settleFixture: async (
    id: string,
    data: {
      homeScore: number;
      awayScore: number;
    }
  ) => {
    const res = await api.post(
      `/fixtures/${id}/settle`,
      data
    );

    return res.data;
  },

  getLeaderboard: async () => {
    const res =
      await api.get<LeaderboardResponse>(
        "/fixtures/leaderboard"
      );

    return res.data;
  },
};