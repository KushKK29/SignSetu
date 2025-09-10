import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

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
  if (room.player2 && room.player2 !== user.id)
    return NextResponse.json({ error: "Room full" }, { status: 400 });

  const { data: updated, error: upErr } = await supabase
    .from("rooms")
    .update({ player2: user.id, status: "active" })
    .eq("id", roomId)
    .select()
    .single();
  if (upErr)
    return NextResponse.json({ error: upErr.message }, { status: 400 });

  return NextResponse.json({ room: updated });
}
