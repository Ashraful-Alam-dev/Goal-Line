"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Flag, AlertTriangle, Loader2 } from "lucide-react";

import {
  Fixture,
  fixturesService,
} from "@/services/fixtures";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  fixture: Fixture;
  onClose: () => void;
  onSuccess: () => void;
};

export function SettleDialog({
  fixture,
  onClose,
  onSuccess,
}: Props) {
  const [homeScore, setHomeScore] =
    useState("");

  const [awayScore, setAwayScore] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const settle = async () => {
    setLoading(true);

    try {
      await fixturesService.settleFixture(
        fixture.id,
        {
          homeScore: Number(homeScore),
          awayScore: Number(awayScore),
        }
      );

      toast.success(
        "Fixture settled successfully."
      );

      onSuccess();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Failed to settle fixture."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden gap-0">
        <div className="h-[3px] w-full bg-red-600" />

        <div className="p-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 shrink-0">
                <Flag className="h-4 w-4 text-red-400" />
              </span>
              {fixture.homeTeam} vs {fixture.awayTeam}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/5 px-3 py-2 text-xs text-red-400/90">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Settling this match locks in the final score and cannot be undone.
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="space-y-1.5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
                  {fixture.homeTeam}
                </p>
                <Input
                  type="number"
                  placeholder="0"
                  value={homeScore}
                  onChange={(e) =>
                    setHomeScore(e.target.value)
                  }
                  className="h-14 text-center text-2xl font-bold tabular"
                />
              </div>

              <span className="text-2xl font-bold text-muted-foreground mt-5">
                –
              </span>

              <div className="space-y-1.5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
                  {fixture.awayTeam}
                </p>
                <Input
                  type="number"
                  placeholder="0"
                  value={awayScore}
                  onChange={(e) =>
                    setAwayScore(e.target.value)
                  }
                  className="h-14 text-center text-2xl font-bold tabular"
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full h-11 gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-none"
            disabled={loading}
            onClick={settle}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Settling...
              </>
            ) : (
              <>
                <Flag className="h-4 w-4" />
                Settle Match
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}