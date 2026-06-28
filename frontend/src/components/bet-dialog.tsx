"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Fixture } from "@/services/fixtures";
import { betsService } from "@/services/bets";
import { queryKeys } from "@/lib/query-keys";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Props = {
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
  onClose: () => void;
  onSuccess?: () => void;
};

export function BetDialog({
  fixture,
  marketType,
  prediction,
  odds,
  onClose,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const [stake, setStake] = useState("");
  const [loading, setLoading] = useState(false);

  const payout = useMemo(() => {
    const value = Number(stake);

    if (!value) return 0;

    return value * odds;
  }, [stake, odds]);

  const placeBet = async () => {
    setLoading(true);

    try {
      await betsService.placeBet({
        fixtureId: fixture.id,
        marketType,
        prediction,
        stake: Number(stake),
      });

      toast.success("Bet placed successfully.");

      await queryClient.invalidateQueries({
        queryKey: queryKeys.myBets,
      });

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to place bet."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>
            {fixture.homeTeam} vs {fixture.awayTeam}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div className="flex items-center justify-between">

            <Badge>{marketType}</Badge>

            <Badge variant="secondary">
              {prediction}
            </Badge>

          </div>

          <div className="rounded-lg border p-4 space-y-2">

            <div className="flex justify-between">

              <span>Odds</span>

              <span className="font-semibold">
                {odds.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Potential Return</span>

              <span className="font-bold text-lg">
                {payout.toFixed(2)}
              </span>

            </div>

          </div>

          <Input
            type="number"
            min={1}
            placeholder="Stake"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
          />

          <Button
            className="w-full"
            disabled={!stake || loading}
            onClick={placeBet}
          >
            {loading ? "Placing Bet..." : "Place Bet"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}