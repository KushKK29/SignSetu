import { createSupabaseServer } from "@/lib/supabase/server";
import { getMongo } from "@/lib/mongo/client";

export default async function PlayerDashboard() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const db = await getMongo();
  const matches = await db
    .collection("matches")
    .find({ "players.id": user.id })
    .sort({ startedAt: -1 })
    .limit(20)
    .toArray();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Match History</h1>
      <ul className="space-y-2">
        {matches.map((m: any) => (
          <li key={m._id} className="border rounded p-3">
            <div className="text-sm text-gray-600">
              {new Date(m.startedAt).toLocaleString()}
            </div>
            <div className="font-semibold">Winner: {m.winnerId ?? "TBD"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
