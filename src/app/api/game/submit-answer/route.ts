import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getMongo } from "@/lib/mongo/client";
import { applyAnswer } from "@/lib/game/engine";

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { roomId, input, correctAnswer } = await req.json();

  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();
  if (error || !room)
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  if (room.status !== "active")
    return NextResponse.json({ error: "Room not active" }, { status: 400 });
  if (user.id !== room.player1 && user.id !== room.player2)
    return NextResponse.json({ error: "Not a participant" }, { status: 403 });

  const { updated, scored, event } = applyAnswer(
    {
      roomId,
      player1: room.player1,
      player2: room.player2,
      status: room.status,
      p1Score: room.p1_score,
      p2Score: room.p2_score,
    },
    user.id,
    input,
    correctAnswer
  );

  const { error: upErr } = await supabase
    .from("rooms")
    .update({
      p1_score: updated.p1Score,
      p2_score: updated.p2Score,
      last_event: event,
    })
    .eq("id", roomId);
  if (upErr)
    return NextResponse.json({ error: upErr.message }, { status: 400 });

  const db = await getMongo();
  await db.collection("matches").updateOne(
    { roomId },
    {
      $setOnInsert: {
        roomId,
        players: [{ id: room.player1 }, { id: room.player2 }],
        startedAt: new Date(room.created_at),
        stats: {
          [room.player1]: { score: 0, correct: 0, incorrect: 0 },
          [room.player2]: { score: 0, correct: 0, incorrect: 0 },
        },
      },
      $push: { events: event },
      $inc: scored
        ? { [`stats.${user.id}.score`]: 1, [`stats.${user.id}.correct`]: 1 }
        : { [`stats.${user.id}.incorrect`]: 1 },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
