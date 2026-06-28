"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { fixturesService } from "@/services/fixtures";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateFixturePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",

    oddsHome: "",
    oddsDraw: "",
    oddsAway: "",

    goalsTarget: "",

    oddsOver: "",
    oddsUnder: "",

    oddsBttsYes: "",
    oddsBttsNo: "",
  });

  const update = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      toast.error("All fields are required.");
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
      toast.error("All odds must be valid numbers.");
      return;
    }

    if (odds.some((value) => value <= 1)) {
      toast.error("All odds must be greater than 1.");
      return;
    }

    if (Number(form.goalsTarget) <= 0) {
      toast.error("Goals target must be greater than 0.");
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

      toast.success("Fixture created.");

      router.push("/admin");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to create fixture."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">

      <Card className="p-6 space-y-6">

        <div>

          <h1 className="text-2xl font-bold">
            New Fixture
          </h1>

          <p className="text-muted-foreground">
            Create a betting fixture.
          </p>

        </div>

        <div className="grid gap-4">

          <Input
            placeholder="Home Team"
            value={form.homeTeam}
            onChange={(e) =>
              update("homeTeam", e.target.value)
            }
          />

          <Input
            placeholder="Away Team"
            value={form.awayTeam}
            onChange={(e) =>
              update("awayTeam", e.target.value)
            }
          />

        </div>

        <div className="grid grid-cols-3 gap-4">

          <Input
            placeholder="Home Odds"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsHome}
            onChange={(e) =>
              update("oddsHome", e.target.value)
            }
          />

          <Input
            placeholder="Draw Odds"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsDraw}
            onChange={(e) =>
              update("oddsDraw", e.target.value)
            }
          />

          <Input
            placeholder="Away Odds"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsAway}
            onChange={(e) =>
              update("oddsAway", e.target.value)
            }
          />

        </div>

        <div className="grid grid-cols-3 gap-4">

          <Input
            placeholder="Goals Target"
            type="number"
            min={0.5}
            step="0.5"
            value={form.goalsTarget}
            onChange={(e) =>
              update("goalsTarget", e.target.value)
            }
          />

          <Input
            placeholder="Over Odds"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsOver}
            onChange={(e) =>
              update("oddsOver", e.target.value)
            }
          />

          <Input
            placeholder="Under Odds"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsUnder}
            onChange={(e) =>
              update("oddsUnder", e.target.value)
            }
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <Input
            placeholder="BTTS Yes"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsBttsYes}
            onChange={(e) =>
              update("oddsBttsYes", e.target.value)
            }
          />

          <Input
            placeholder="BTTS No"
            type="number"
            min={1.01}
            step="0.01"
            value={form.oddsBttsNo}
            onChange={(e) =>
              update("oddsBttsNo", e.target.value)
            }
          />

        </div>

        <Button
          className="w-full"
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Fixture"}
        </Button>

      </Card>

    </div>
  );
}