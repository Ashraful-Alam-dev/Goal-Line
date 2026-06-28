"use client";

import { useEffect, useState } from "react";

import { Fixture, fixturesService } from "@/services/fixtures";

import { FixtureCard } from "@/components/fixture-card";
import { BetDialog } from "@/components/bet-dialog";
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
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-72 w-full rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Open Fixtures
          </h1>

          <p className="mt-2 text-muted-foreground">
            Select any available market to place a bet.
          </p>
        </div>

        {fixtures.length === 0 ? (
          <div className="rounded-lg border p-10 text-center text-muted-foreground">
            No open fixtures available.
          </div>
        ) : (
          <div className="grid gap-6">
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