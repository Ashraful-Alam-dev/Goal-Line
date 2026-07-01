import { Goal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background mt-10 overflow-hidden">
      {/* faint pitch center-circle motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
      />
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container relative mx-auto py-8 flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient">
            <Goal className="h-3.5 w-3.5 text-background" strokeWidth={2.5} />
          </span>
          <p className="text-lg font-extrabold text-gold-gradient tracking-tight">
            GoalLine
          </p>
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Football Prediction League
        </p>

        <div className="mt-1 h-px w-16 bg-border" />

        <p className="text-[11px] text-muted-foreground/60">
          © 2026 GoalLine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}