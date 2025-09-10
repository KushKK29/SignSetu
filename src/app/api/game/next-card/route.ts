import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getMongo } from "@/lib/mongo/client";

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { roomId } = await req.json();

  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();
  if (error || !room)
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  if (user.id !== room.player1 && user.id !== room.player2)
    return NextResponse.json({ error: "Not a participant" }, { status: 403 });

  const db = await getMongo();
  const usedIds = new Set<string>();
  const match = await db.collection("matches").findOne({ roomId });
  match?.events?.forEach((e: any) => {
    if (e.type === "next_card" && e.payload?.cardId)
      usedIds.add(e.payload.cardId);
  });
  const next = await db
    .collection("flashcards")
    .findOne({ id: { $nin: [...usedIds] } });
  if (!next) return NextResponse.json({ done: true });

  await db.collection("matches").updateOne(
    { roomId },
    {
      $push: {
        events: {
          ts: Date.now(),
          type: "next_card",
          payload: { cardId: next.id },
        },
      },
    },
    { upsert: true }
  );

  const { error: upErr } = await supabase
    .from("rooms")
    .update({
      current_card_id: next.id,
      last_event: {
        ts: Date.now(),
        type: "next_card",
        payload: { cardId: next.id },
      },
    })
    .eq("id", roomId);
  if (upErr)
    return NextResponse.json({ error: upErr.message }, { status: 400 });

  return NextResponse.json({ card: { id: next.id, question: next.question } });
}
