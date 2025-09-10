import { createSupabaseServer } from "@/lib/supabase/server";
import { getMongo } from "@/lib/mongo/client";

export default async function TeacherDashboard() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "teacher" && profile?.role !== "admin")
    return <div>Unauthorized</div>;

  const db = await getMongo();
  const matches = await db
    .collection("matches")
    .find({})
    .sort({ startedAt: -1 })
    .limit(50)
    .toArray();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Matches</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Started</th>
            <th>Players</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m: any) => (
            <tr key={m._id} className="border-b">
              <td className="py-2">{new Date(m.startedAt).toLocaleString()}</td>
              <td>{m.players.map((p: any) => p.id).join(", ")}</td>
              <td>{m.winnerId ?? "TBD"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
