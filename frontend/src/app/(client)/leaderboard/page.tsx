"use client";

import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";

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

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-center sm:justify-start gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
          <Trophy className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
          League Leaderboard
        </h1>
      </div>

      <LeaderboardTable
        leaderboard={data.leaderboard}
        currentUser={data.currentUser}
      />
    </div>
  );
}