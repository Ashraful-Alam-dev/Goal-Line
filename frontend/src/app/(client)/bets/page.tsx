"use client";

import { useQuery } from "@tanstack/react-query";

import { Bet, betsService } from "@/services/bets";
import { queryKeys } from "@/lib/query-keys";

import { BetCard } from "@/components/bet-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyBetsPage() {
  const { data = [], isLoading } = useQuery<Bet[]>({
    queryKey: queryKeys.myBets,
    queryFn: betsService.getMyBets,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-44"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">
        My Bets
      </h1>

      {data.length === 0 ? (
        <p className="text-muted-foreground">
          You haven't placed any bets yet.
        </p>
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