"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Goal, TrendingUp, Percent, Coins, Loader2 } from "lucide-react";

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
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        <div className="h-[3px] w-full bg-gold-gradient" />

        <div className="p-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                <Goal className="h-4 w-4 text-background" strokeWidth={2.5} />
              </span>
              {fixture.homeTeam} vs {fixture.awayTeam}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-gold text-amber-500 font-semibold">
              {marketType}
            </Badge>

            <Badge className="font-semibold">{prediction}</Badge>
          </div>

          <div className="rounded-xl border border-gold/20 bg-gradient-to-br from-amber-600/5 to-orange-600/5 p-4 space-y-3">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5 text-sm">
                <Percent className="h-3.5 w-3.5" />
                Odds
              </span>

              <span className="font-semibold text-foreground tabular">
                {odds.toFixed(2)}
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                Potential Return
              </span>

              <span className="font-bold text-xl text-gold-gradient tabular">
                {payout.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="relative">
            <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              min={1}
              placeholder="Enter stake"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              className="pl-9 h-11"
            />
          </div>

          <Button
            className="w-full h-11 gap-2 font-semibold"
            disabled={!stake || loading}
            onClick={placeBet}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Placing Bet...
              </>
            ) : (
              "Place Bet"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}