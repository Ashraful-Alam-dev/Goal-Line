"use client";

import { Target, TrendingUp, Users, Goal } from "lucide-react";

import { Fixture } from "@/services/fixtures";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  fixture: Fixture;
  admin?: boolean;
  onBet?: (
    marketType: "RESULT" | "GOALS" | "BTTS",
    prediction: "HOME" | "DRAW" | "AWAY" | "OVER" | "UNDER" | "YES" | "NO",
    odds: number
  ) => void;
  onSettle?: () => void;
  onStart?: () => void;
}

function OddsButton({
  label,
  odds,
  disabled,
  onClick,
}: {
  label: string;
  odds: number;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="group/button h-14 flex-col gap-0.5 transition-all duration-200 hover:scale-[1.03] bg-background/40 text-foreground hover:bg-amber-500/10 hover:border-gold hover:shadow-[0_0_16px_-4px_rgba(245,158,11,0.5)] disabled:opacity-40 disabled:hover:scale-100"
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover/button:text-amber-300">
        {label}
      </span>
      <span className="text-base font-bold tabular text-gold-gradient">
        {odds.toFixed(2)}
      </span>
    </Button>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  tag,
  extra,
}: {
  icon: React.ElementType;
  title: string;
  tag: string;
  extra?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-amber-400" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {extra && (
          <span className="text-xs font-bold text-amber-400">{extra}</span>
        )}
      </div>
      <Badge
        variant="outline"
        className="text-[10px] border-border text-amber-400 font-bold bg-transparent px-1.5 py-0"
      >
        {tag}
      </Badge>
    </div>
  );
}

export function FixtureCard({
  fixture,
  admin,
  onBet,
  onSettle,
  onStart,
}: Props) {
  const bettingClosed = fixture.status !== "OPEN";

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-amber-500/15 text-amber-400 border-amber-500/40";
      case "IN_PROGRESS":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-foreground/5 text-muted-foreground border-border";
    }
  };

  return (
    <Card className="overflow-hidden p-0 transition-all duration-300 hover:shadow-[0_0_28px_-10px_rgba(245,158,11,0.3)] hover:border-amber-500/25">
      <div className="border-b border-border bg-secondary/60 p-4">
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex-1 text-center">
              <h2 className="text-base font-bold text-foreground leading-tight">
                {fixture.homeTeam}
              </h2>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_14px_-3px_rgba(245,158,11,0.55)]">
              <Goal className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>

            <div className="flex-1 text-center">
              <h2 className="text-base font-bold text-foreground leading-tight">
                {fixture.awayTeam}
              </h2>
            </div>
          </div>

          {!admin && (
            <Badge
              className={`gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold border ${getStatusStyles(
                fixture.status
              )}`}
            >
              {fixture.status === "IN_PROGRESS" && (
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
              )}
              {fixture.status.replace("_", " ")}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3.5 p-4">
        {admin ? (
          <div className="space-y-2">
            <Badge
              className={`w-full justify-center py-1 font-semibold uppercase tracking-wider text-xs border ${getStatusStyles(
                fixture.status
              )}`}
            >
              {fixture.status.replace("_", " ")}
            </Badge>
            {fixture.status === "OPEN" && (
              <Button className="w-full h-9 text-sm gap-1.5" onClick={onStart}>
                <Target className="h-3.5 w-3.5" />
                Start Match
              </Button>
            )}
            {fixture.status === "IN_PROGRESS" && (
              <Button
                className="w-full h-9 text-sm gap-1.5 bg-red-600 hover:bg-red-700 text-white shadow-none"
                onClick={onSettle}
              >
                Settle Match
              </Button>
            )}
          </div>
        ) : (
          <>
            <section className="space-y-2 rounded-lg border border-border bg-background/30 p-3">
              <SectionHeader icon={Target} title="Match Result" tag="1X2" />
              <div className="grid grid-cols-3 gap-1.5">
                <OddsButton
                  disabled={bettingClosed}
                  label="Home"
                  odds={fixture.oddsHome}
                  onClick={() => onBet?.("RESULT", "HOME", fixture.oddsHome)}
                />
                <OddsButton
                  disabled={bettingClosed}
                  label="Draw"
                  odds={fixture.oddsDraw}
                  onClick={() => onBet?.("RESULT", "DRAW", fixture.oddsDraw)}
                />
                <OddsButton
                  disabled={bettingClosed}
                  label="Away"
                  odds={fixture.oddsAway}
                  onClick={() => onBet?.("RESULT", "AWAY", fixture.oddsAway)}
                />
              </div>
            </section>

            <section className="space-y-2 rounded-lg border border-border bg-background/30 p-3">
              <SectionHeader
                icon={TrendingUp}
                title="Goals"
                tag="O/U"
                extra={`Over/Under ${fixture.goalsTarget}`}
              />
              <div className="grid grid-cols-2 gap-1.5">
                <OddsButton
                  disabled={bettingClosed}
                  label="Over"
                  odds={fixture.oddsOver}
                  onClick={() => onBet?.("GOALS", "OVER", fixture.oddsOver)}
                />
                <OddsButton
                  disabled={bettingClosed}
                  label="Under"
                  odds={fixture.oddsUnder}
                  onClick={() => onBet?.("GOALS", "UNDER", fixture.oddsUnder)}
                />
              </div>
            </section>

            <section className="space-y-2 rounded-lg border border-border bg-background/30 p-3">
              <SectionHeader
                icon={Users}
                title="Both Teams To Score"
                tag="BTTS"
              />
              <div className="grid grid-cols-2 gap-1.5">
                <OddsButton
                  disabled={bettingClosed}
                  label="Yes"
                  odds={fixture.oddsBttsYes}
                  onClick={() => onBet?.("BTTS", "YES", fixture.oddsBttsYes)}
                />
                <OddsButton
                  disabled={bettingClosed}
                  label="No"
                  odds={fixture.oddsBttsNo}
                  onClick={() => onBet?.("BTTS", "NO", fixture.oddsBttsNo)}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </Card>
  );
}