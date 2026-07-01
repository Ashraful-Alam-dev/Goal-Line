"use client";

import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";

import { fixturesService } from "@/services/fixtures";

import { LeaderboardTable } from "@/components/leaderboard-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPage() {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fixturesService.getLeaderboard,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5 border-b border-border pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
          <Trophy className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
            League Standing
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Top prediction performance profiles ranked by obtained points.
          </p>
        </div>
      </div>

      <LeaderboardTable
        leaderboard={data?.leaderboard ?? []}
        currentUser={data?.currentUser ?? null}
      />
    </div>
  );
}