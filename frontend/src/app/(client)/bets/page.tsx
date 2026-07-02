"use client";

import { useQuery } from "@tanstack/react-query";
import { Ticket, TicketX, TrendingUp, TrendingDown, Clock } from "lucide-react";

import { Bet, betsService } from "@/services/bets";
import { queryKeys } from "@/lib/query-keys";

import { BetCard } from "@/components/bet-card";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone?: "gold" | "danger" | "muted";
}) {
  const toneClass =
    tone === "gold"
      ? "text-amber-500"
      : tone === "danger"
      ? "text-rose-500"
      : "text-foreground";

  return (
    <div className="rounded-xl border border-border bg-card p-3.5 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary shrink-0">
        <Icon className={`h-4 w-4 ${toneClass}`} />
      </div>
      <div>
        <p className={`text-lg font-bold tabular leading-none ${toneClass}`}>{value}</p>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function MyBetsPage() {
  const { data = [], isLoading } = useQuery<Bet[]>({
    queryKey: queryKeys.myBets,
    queryFn: betsService.getMyBets,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-9 w-56 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const won = data.filter((b) => b.status === "WON").length;
  const lost = data.filter((b) => b.status === "LOST").length;
  const pending = data.length - won - lost;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
          <Ticket className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
          My Predictions
        </h1>
      </div>

      {data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Ticket} label="Total" value={data.length} />
          <StatCard icon={TrendingUp} label="Won" value={won} tone="gold" />
          <StatCard icon={TrendingDown} label="Lost" value={lost} tone="danger" />
          <StatCard icon={Clock} label="Pending" value={pending} />
        </div>
      )}

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
          <TicketX className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            You haven&apos;t placed any predictions yet.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Head to Fixtures to place your first bet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((bet) => (
            <BetCard
              key={bet.id}
              bet={bet}
            />
          ))}
        </div>
      )}
    </div>
  );
}