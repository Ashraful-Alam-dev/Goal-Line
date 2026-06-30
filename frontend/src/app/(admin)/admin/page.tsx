"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const startFixture = async (id: string) => {
    try {
      await fixturesService.startFixture(id);

      toast.success("Match started.");

      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to start match."
      );
    }
  };

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
            Fixtures
          </h1>

          <p className="text-muted-foreground">
            Start or settle matches.
          </p>
        </div>

        {fixtures.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            fixture={fixture}
            admin
            onStart={() =>
              startFixture(fixture.id)
            }
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