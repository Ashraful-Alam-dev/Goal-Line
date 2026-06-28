"use client";

import { useQuery } from "@tanstack/react-query";

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
      <div className="space-y-4">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Leaderboard
        </h1>

        <p className="text-muted-foreground">
          Top 10 players ranked by points.
        </p>

      </div>

      <LeaderboardTable
        leaderboard={data?.leaderboard ?? []}
        currentUser={data?.currentUser ?? null}
      />

    </div>
  );
}