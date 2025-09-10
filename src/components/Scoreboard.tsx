export function Scoreboard({ p1, p2 }: { p1: number; p2: number }) {
  return (
    <div className="flex gap-6 text-xl">
      <div>
        <span className="font-semibold">Player 1:</span> {p1}
      </div>
      <div>
        <span className="font-semibold">Player 2:</span> {p2}
      </div>
    </div>
  );
}



