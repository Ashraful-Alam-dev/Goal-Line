import { api } from "@/lib/api";

export type Bet = {
  id: string;

  marketType: "RESULT" | "GOALS" | "BTTS";

  prediction:
    | "HOME"
    | "DRAW"
    | "AWAY"
    | "OVER"
    | "UNDER"
    | "YES"
    | "NO";

  stake: number;
  payout: number;

  status: "PENDING" | "WON" | "LOST";

  createdAt: string;

  user: {
    id: string;
    username: string;
    points: number;
  };

  fixture: {
    id: string;
    homeTeam: string;
    awayTeam: string;

    status: "OPEN" | "SETTLED";

    finalHomeScore: number | null;
    finalAwayScore: number | null;
  };
};

export const betsService = {
  placeBet: async (data: any) => {
    const res = await api.post("/bets", data);
    return res.data;
  },

  getMyBets: async () => {
    const res = await api.get<Bet[]>("/bets/my");
    return res.data;
  },

  getAllBets: async () => {
    const res = await api.get<Bet[]>("/bets");
    return res.data;
  },
};