"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Fixture,
  fixturesService,
} from "@/services/fixtures";

import { queryKeys } from "@/lib/query-keys";

import { Skeleton } from "@/components/ui/skeleton";
import { FixtureCard } from "@/components/fixture-card";
import { SettleDialog } from "@/components/settle-dialog";

export default function AdminHomePage() {
  const [fixture, setFixture] =
    useState<Fixture | null>(null);

  const {
    data: fixtures = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: queryKeys.fixtures,
    queryFn: fixturesService.getOpenFixtures,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-72 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Open Fixtures
          </h1>

          <p className="text-muted-foreground">
            Settle completed matches.
          </p>
        </div>

        {fixtures.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            fixture={fixture}
            admin
            onSettle={() =>
              setFixture(fixture)
            }
          />
        ))}
      </div>

      {fixture && (
        <SettleDialog
          fixture={fixture}
          onClose={() => setFixture(null)}
          onSuccess={() => {
            setFixture(null);
            refetch();
          }}
        />
      )}
    </>
  );
}