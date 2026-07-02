"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { LayoutDashboard, CalendarOff, Radio, CheckCircle2 } from "lucide-react";

import {
  Fixture,
  fixturesService,
} from "@/services/fixtures";

import { queryKeys } from "@/lib/query-keys";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
      toast.success("Match started successfully.");
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
      <div className="mx-auto max-w-5xl space-y-4">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-48 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  const open = fixtures.filter((f) => f.status === "OPEN").length;
  const inProgress = fixtures.filter((f) => f.status === "IN_PROGRESS").length;

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
              <LayoutDashboard className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight">
                Fixture Management
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Monitor, activate, and settle ongoing matches.
              </p>
            </div>
          </div>

          {fixtures.length > 0 && (
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1.5 border-amber-600/40 text-amber-500 font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                {open} open
              </Badge>
              <Badge variant="outline" className="gap-1.5 border-rose-600/30 text-rose-500 font-semibold">
                <Radio className="h-3 w-3" />
                {inProgress} live
              </Badge>
            </div>
          )}
        </div>

        {fixtures.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
            <CalendarOff className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">
              No fixtures found.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Create one to start managing predictions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {fixtures.map((fixture) => (
              <FixtureCard
                key={fixture.id}
                fixture={fixture}
                admin
                onStart={() => startFixture(fixture.id)}
                onSettle={() => setFixture(fixture)}
              />
            ))}
          </div>
        )}
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