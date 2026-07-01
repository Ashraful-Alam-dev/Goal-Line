"use client";

import { TrendingUp, TrendingDown, Clock, Target } from "lucide-react";

import { Bet } from "@/services/bets";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  bet: Bet;
  admin?: boolean;
}

function Stat({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-secondary/40 border border-border/60 p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`font-semibold tabular ${highlight ? "text-amber-400" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

export function BetCard({ bet, admin = false }: Props) {
  const odds = bet.payout / bet.stake;

  const statusMeta =
    bet.status === "WON"
      ? { icon: TrendingUp, className: "gap-1" }
      : bet.status === "LOST"
      ? { icon: TrendingDown, className: "gap-1 bg-rose-500/15 text-rose-400 border border-rose-500/30" }
      : { icon: Clock, className: "gap-1 bg-secondary text-muted-foreground" };

  const StatusIcon = statusMeta.icon;

  return (
    <Card className="p-5 space-y-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_-10px_rgba(245,158,11,0.25)]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg text-foreground leading-tight">
            {bet.fixture.homeTeam} <span className="text-muted-foreground font-normal">vs</span> {bet.fixture.awayTeam}
          </h2>

          {admin && (
            <p className="text-sm text-muted-foreground">
              Player: <span className="font-medium text-foreground">{bet.user.username}</span>
            </p>
          )}
        </div>

        <Badge className={statusMeta.className}>
          <StatusIcon className="h-3 w-3" />
          {bet.status}
        </Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2.5">
        <Stat
          label="Market"
          value={
            <span className="inline-flex items-center gap-1">
              <Target className="h-3 w-3 text-amber-400" />
              {bet.marketType}
            </span>
          }
        />
        <Stat label="Prediction" value={bet.prediction} />
        <Stat label="Stake" value={bet.stake} />
        <Stat label="Odds" value={odds.toFixed(2)} />
        <Stat label="Potential Return" value={bet.payout.toFixed(2)} highlight />

        {bet.fixture.status === "SETTLED" && (
          <Stat
            label="Score"
            value={`${bet.fixture.finalHomeScore} - ${bet.fixture.finalAwayScore}`}
          />
        )}
      </div>
    </Card>
  );
}