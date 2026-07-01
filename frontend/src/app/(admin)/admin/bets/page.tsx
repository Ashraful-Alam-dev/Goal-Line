"use client";

import { useQuery } from "@tanstack/react-query";
import { ClipboardList, ClipboardX } from "lucide-react";

import { Bet, betsService } from "@/services/bets";
import { queryKeys } from "@/lib/query-keys";

import { BetCard } from "@/components/bet-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminBetsPage() {
  const { data = [], isLoading } = useQuery<Bet[]>({
    queryKey: queryKeys.allBets,
    queryFn: betsService.getAllBets,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-36 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
            <ClipboardList className="h-4 w-4 text-background" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
              Global Bets Ledger
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review and track all player bets placed across the system.
            </p>
          </div>
        </div>

        {data.length > 0 && (
          <Badge variant="outline" className="gap-1.5 border-border text-muted-foreground font-semibold w-fit">
            {data.length} total {data.length === 1 ? "bet" : "bets"}
          </Badge>
        )}
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
          <ClipboardX className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            No user has placed a bet yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((bet) => (
            <BetCard
              key={bet.id}
              bet={bet}
              admin
            />
          ))}
        </div>
      )}
    </div>
  );
}