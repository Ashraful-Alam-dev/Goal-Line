"use client";

import { useQuery } from "@tanstack/react-query";

import { fixturesService } from "@/services/fixtures";
import { queryKeys } from "@/lib/query-keys";

import { LeaderboardTable } from "@/components/leaderboard-table";

import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.leaderboard,
    queryFn: fixturesService.getLeaderboard,
  });

  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        Leaderboard
      </h1>

      <LeaderboardTable
        leaderboard={data.leaderboard}
        currentUser={data.currentUser}
      />
    </div>
  );
}