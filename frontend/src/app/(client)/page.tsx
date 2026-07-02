"use client";

import { useEffect, useState } from "react";
import { Goal, CalendarOff, ListChecks } from "lucide-react";

import { Fixture, fixturesService } from "@/services/fixtures";

import { FixtureCard } from "@/components/fixture-card";
import { BetDialog } from "@/components/bet-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type BetSelection = {
  fixture: Fixture;
  marketType: "RESULT" | "GOALS" | "BTTS";
  prediction:
    | "HOME"
    | "DRAW"
    | "AWAY"
    | "OVER"
    | "UNDER"
    | "YES"
    | "NO";
  odds: number;
};

export default function HomePage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  const [selection, setSelection] =
    useState<BetSelection | null>(null);

  const fetchFixtures = async () => {
    try {
      const data =
        await fixturesService.getOpenFixtures();

      setFixtures(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex flex-col items-center gap-2 pb-2">
          <Skeleton className="h-9 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-64 w-full rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_20px_-4px_rgba(194,112,10,0.55)]">
            <Goal className="h-5 w-5 text-background" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
            Active Fixtures
          </h1>

          <p className="text-sm text-muted-foreground">
            Select any available market to place your prediction.
          </p>

          {fixtures.length > 0 && (
            <Badge variant="outline" className="gap-1.5 border-border text-muted-foreground font-semibold">
              <ListChecks className="h-3 w-3" />
              {fixtures.length} active {fixtures.length === 1 ? "fixture" : "fixtures"}
            </Badge>
          )}
        </div>

        {fixtures.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
            <CalendarOff className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              No active fixtures at the moment.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Check back soon — new matches are added regularly.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {fixtures.map((fixture) => (
              <FixtureCard
                key={fixture.id}
                fixture={fixture}
                onBet={(
                  marketType,
                  prediction,
                  odds
                ) =>
                  setSelection({
                    fixture,
                    marketType,
                    prediction,
                    odds,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {selection && (
        <BetDialog
          fixture={selection.fixture}
          marketType={selection.marketType}
          prediction={selection.prediction}
          odds={selection.odds}
          onClose={() => setSelection(null)}
          onSuccess={async () => {
            setSelection(null);
            await fetchFixtures();
          }}
        />
      )}
    </>
  );
}