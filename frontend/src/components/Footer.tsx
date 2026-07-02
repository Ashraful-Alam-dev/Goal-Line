import { Goal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
      />

      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container relative mx-auto flex flex-col items-center justify-center gap-2 py-5 text-center">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient">
            <Goal className="h-3.5 w-3.5 text-background" strokeWidth={2.5} />
          </span>

          <p className="text-lg font-extrabold tracking-tight text-gold-gradient">
            GoalLine
          </p>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Football Prediction League
        </p>

        <div className="h-px w-14 bg-border" />

        <p className="text-[10px] text-muted-foreground/60">
          © 2026 GoalLine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}