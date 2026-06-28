"use client";

import { useQuery } from "@tanstack/react-query";

import { fixturesService } from "@/services/fixtures";
import { queryKeys } from "@/lib/query-keys";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const {
    data: fixtures = [],
    isLoading,
  } = useQuery({
    queryKey: queryKeys.history,
    queryFn: fixturesService.getHistory,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-28 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Fixture History
        </h1>

        <p className="text-muted-foreground">
          Settled matches.
        </p>
      </div>

      {fixtures.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          No settled fixtures found.
        </Card>
      ) : (
        fixtures.map((fixture) => (
          <Card
            key={fixture.id}
            className="p-5"
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  {fixture.homeTeam} vs{" "}
                  {fixture.awayTeam}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Final Score:{" "}
                  <strong>
                    {fixture.finalHomeScore} -{" "}
                    {fixture.finalAwayScore}
                  </strong>
                </p>
              </div>

              <Badge>
                {fixture.status}
              </Badge>

            </div>
          </Card>
        ))
      )}
    </div>
  );
}