"use client";

import { Fixture } from "@/services/fixtures";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  fixture: Fixture;
  admin?: boolean;
  onBet?: (
    marketType: "RESULT" | "GOALS" | "BTTS",
    prediction:
      | "HOME"
      | "DRAW"
      | "AWAY"
      | "OVER"
      | "UNDER"
      | "YES"
      | "NO",
    odds: number
  ) => void;
  onSettle?: () => void;
}

function OddsButton({
  label,
  odds,
  onClick,
}: {
  label: string;
  odds: number;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-16 flex-col gap-1 transition-all hover:scale-[1.03] hover:border-primary"
    >
      <span className="text-xs text-muted-foreground">
        {label}
      </span>

      <span className="text-lg font-bold">
        {odds.toFixed(2)}
      </span>
    </Button>
  );
}

export function FixtureCard({
  fixture,
  admin,
  onBet,
  onSettle,
}: Props) {
  return (
    <Card className="overflow-hidden">

      <div className="border-b bg-muted/30 p-6">

        <div className="flex items-center justify-between">

          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold">
              {fixture.homeTeam}
            </h2>
          </div>

          <Badge
            variant="secondary"
            className="mx-4"
          >
            VS
          </Badge>

          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold">
              {fixture.awayTeam}
            </h2>
          </div>

        </div>

      </div>

      <div className="space-y-5 p-5">

        {admin ? (
          <Button
            className="w-full"
            onClick={onSettle}
          >
            Settle Match
          </Button>
        ) : (
          <>
            {/* RESULT */}

            <section className="space-y-3 rounded-lg border p-4">

              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Match Result
                </h3>

                <Badge variant="outline">
                  1X2
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2">

                <OddsButton
                  label="Home"
                  odds={fixture.oddsHome}
                  onClick={() =>
                    onBet?.(
                      "RESULT",
                      "HOME",
                      fixture.oddsHome
                    )
                  }
                />

                <OddsButton
                  label="Draw"
                  odds={fixture.oddsDraw}
                  onClick={() =>
                    onBet?.(
                      "RESULT",
                      "DRAW",
                      fixture.oddsDraw
                    )
                  }
                />

                <OddsButton
                  label="Away"
                  odds={fixture.oddsAway}
                  onClick={() =>
                    onBet?.(
                      "RESULT",
                      "AWAY",
                      fixture.oddsAway
                    )
                  }
                />

              </div>

            </section>

            {/* GOALS */}

            <section className="space-y-3 rounded-lg border p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-baseline gap-2">
                  <h3 className="font-semibold">
                    Goals
                  </h3>
                  <span className="text-italic font-semibold text-primary">
                    - {fixture.goalsTarget}
                  </span>
                </div>

                <Badge variant="outline">
                  O/U
                </Badge>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <OddsButton
                  label="Over"
                  odds={fixture.oddsOver}
                  onClick={() =>
                    onBet?.(
                      "GOALS",
                      "OVER",
                      fixture.oddsOver
                    )
                  }
                />

                <OddsButton
                  label="Under"
                  odds={fixture.oddsUnder}
                  onClick={() =>
                    onBet?.(
                      "GOALS",
                      "UNDER",
                      fixture.oddsUnder
                    )
                  }
                />

              </div>

            </section>

            {/* BTTS */}

            <section className="space-y-3 rounded-lg border p-4">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  Both Teams To Score
                </h3>

                <Badge variant="outline">
                  BTTS
                </Badge>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <OddsButton
                  label="Yes"
                  odds={fixture.oddsBttsYes}
                  onClick={() =>
                    onBet?.(
                      "BTTS",
                      "YES",
                      fixture.oddsBttsYes
                    )
                  }
                />

                <OddsButton
                  label="No"
                  odds={fixture.oddsBttsNo}
                  onClick={() =>
                    onBet?.(
                      "BTTS",
                      "NO",
                      fixture.oddsBttsNo
                    )
                  }
                />

              </div>

            </section>
          </>
        )}

      </div>

    </Card>
  );
}