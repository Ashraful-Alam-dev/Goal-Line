"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarPlus, Users, Target, TrendingUp, Users2, Rocket } from "lucide-react";

import { fixturesService } from "@/services/fixtures";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FieldGroup({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 pt-3 first:pt-0">
      <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-amber-500" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function CreateFixturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    oddsHome: "",
    oddsDraw: "",
    oddsAway: "",
    goalsTarget: "2.5",
    oddsOver: "",
    oddsUnder: "",
    oddsBttsYes: "",
    oddsBttsNo: "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (
      !form.homeTeam.trim() ||
      !form.awayTeam.trim() ||
      !form.oddsHome ||
      !form.oddsDraw ||
      !form.oddsAway ||
      !form.goalsTarget ||
      !form.oddsOver ||
      !form.oddsUnder ||
      !form.oddsBttsYes ||
      !form.oddsBttsNo
    ) {
      toast.error("All parameters are required.");
      return;
    }

    const odds = [
      Number(form.oddsHome),
      Number(form.oddsDraw),
      Number(form.oddsAway),
      Number(form.oddsOver),
      Number(form.oddsUnder),
      Number(form.oddsBttsYes),
      Number(form.oddsBttsNo),
    ];

    if (odds.some((value) => Number.isNaN(value))) {
      toast.error("All odds fields must be formatted as numeric numbers.");
      return;
    }

    if (odds.some((value) => value <= 1)) {
      toast.error("All competitive odds multipliers must be higher than 1.00.");
      return;
    }

    if (Number(form.goalsTarget) <= 0) {
      toast.error("Goals target target metric must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      await fixturesService.createFixture({
        ...form,
        oddsHome: Number(form.oddsHome),
        oddsDraw: Number(form.oddsDraw),
        oddsAway: Number(form.oddsAway),
        goalsTarget: Number(form.goalsTarget),
        oddsOver: Number(form.oddsOver),
        oddsUnder: Number(form.oddsUnder),
        oddsBttsYes: Number(form.oddsBttsYes),
        oddsBttsNo: Number(form.oddsBttsNo),
      });

      toast.success("New game fixture populated successfully.");
      router.push("/admin");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Unable to save fixture details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-0 overflow-hidden shadow-md">
        <div className="h-[3px] w-full bg-gold-gradient" />

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shrink-0">
              <CalendarPlus className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gold-gradient">
                New Betting Fixture
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure line metadata, goals targets, and market margins.
              </p>
            </div>
          </div>

          <div className="space-y-3.5 divide-y divide-border">
            <FieldGroup icon={Users} title="Teams Allocation">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Home Team Name"
                  value={form.homeTeam}
                  onChange={(e) => update("homeTeam", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Away Team Name"
                  value={form.awayTeam}
                  onChange={(e) => update("awayTeam", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </FieldGroup>

            <FieldGroup icon={Target} title="Match Result Odds (1X2)">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Home (1)"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsHome}
                  onChange={(e) => update("oddsHome", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Draw (X)"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsDraw}
                  onChange={(e) => update("oddsDraw", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Away (2)"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsAway}
                  onChange={(e) => update("oddsAway", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </FieldGroup>

            <FieldGroup icon={TrendingUp} title="Over / Under Settings">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Target (e.g. 2.5)"
                  type="number"
                  min={0.5}
                  step="0.5"
                  value={form.goalsTarget}
                  onChange={(e) => update("goalsTarget", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Over Multiplier"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsOver}
                  onChange={(e) => update("oddsOver", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="Under Multiplier"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsUnder}
                  onChange={(e) => update("oddsUnder", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </FieldGroup>

            <FieldGroup icon={Users2} title="Both Teams To Score (BTTS)">
              <div className="grid grid-cols-2 gap-2 pb-1">
                <Input
                  placeholder="Yes Multiplier"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsBttsYes}
                  onChange={(e) => update("oddsBttsYes", e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  placeholder="No Multiplier"
                  type="number"
                  min={1.01}
                  step="0.01"
                  value={form.oddsBttsNo}
                  onChange={(e) => update("oddsBttsNo", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </FieldGroup>
          </div>

          <Button
            className="w-full mt-2 h-10 gap-2 font-semibold"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              "Publishing..."
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Publish Fixture
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}