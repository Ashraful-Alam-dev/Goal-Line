"use client";

import { useQuery } from "@tanstack/react-query";
import { History, Archive } from "lucide-react";

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
        <Skeleton className="h-9 w-56 rounded-lg" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-20 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-2.5 border-b border-border pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
          <History className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
            Fixture History
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Archived records of settled matches.
          </p>
        </div>
      </div>

      {fixtures.length === 0 ? (
        <Card className="p-12 flex flex-col items-center gap-2 text-center shadow-sm rounded-xl border-dashed">
          <Archive className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            No settled matches yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {fixtures.map((fixture) => (
            <Card
              key={fixture.id}
              className="p-4 hover:border-amber-500/25 hover:shadow-[0_0_20px_-10px_rgba(245,158,11,0.3)] transition-all rounded-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-foreground">
                    {fixture.homeTeam} <span className="text-xs font-semibold text-muted-foreground px-1">vs</span> {fixture.awayTeam}
                  </h2>

                  <p className="text-xs font-medium text-muted-foreground">
                    Full-time Score:{" "}
                    <span className="text-sm font-black text-amber-400 ml-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 tabular">
                      {fixture.finalHomeScore} — {fixture.finalAwayScore}
                    </span>
                  </p>
                </div>

                <Badge className="text-[10px] font-bold uppercase tracking-wider bg-secondary border border-border text-muted-foreground rounded px-2 py-0.5 pointer-events-none">
                  {fixture.status.replace("_", " ")}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}