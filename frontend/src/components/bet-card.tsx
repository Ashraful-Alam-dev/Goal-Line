"use client";

import { Bet } from "@/services/bets";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  bet: Bet;
  admin?: boolean;
}

export function BetCard({ bet, admin = false }: Props) {
  const odds = bet.payout / bet.stake;

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">
            {bet.fixture.homeTeam} vs {bet.fixture.awayTeam}
          </h2>

          {admin && (
            <p className="text-sm text-muted-foreground">
              Player: <span className="font-medium">{bet.user.username}</span>
            </p>
          )}
        </div>

        <Badge
          variant={
            bet.status === "WON"
              ? "default"
              : bet.status === "LOST"
              ? "destructive"
              : "secondary"
          }
        >
          {bet.status}
        </Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Market</p>
          <p className="font-medium">{bet.marketType}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Prediction</p>
          <p className="font-medium">{bet.prediction}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Stake</p>
          <p>{bet.stake}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Odds</p>
          <p>{odds.toFixed(2)}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Potential Return</p>
          <p className="font-semibold">{bet.payout.toFixed(2)}</p>
        </div>

        {bet.fixture.status === "SETTLED" && (
          <div>
            <p className="text-xs text-muted-foreground">Score</p>
            <p>
              {bet.fixture.finalHomeScore} - {bet.fixture.finalAwayScore}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}