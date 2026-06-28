"use client";

import { useState } from "react";
import { toast } from "sonner";

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
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            {fixture.homeTeam} vs{" "}
            {fixture.awayTeam}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            type="number"
            placeholder="Home Score"
            value={homeScore}
            onChange={(e) =>
              setHomeScore(e.target.value)
            }
          />

          <Input
            type="number"
            placeholder="Away Score"
            value={awayScore}
            onChange={(e) =>
              setAwayScore(e.target.value)
            }
          />

          <Button
            className="w-full"
            disabled={loading}
            onClick={settle}
          >
            {loading
              ? "Settling..."
              : "Settle Match"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}