export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto py-6 flex flex-col items-center justify-center gap-4 text-center">
        <div>
          <p className="font-semibold">GoalLine</p>
          <p className="text-sm text-muted-foreground">
            Football Prediction League
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 GoalLine
        </p>
      </div>
    </footer>
  );
}