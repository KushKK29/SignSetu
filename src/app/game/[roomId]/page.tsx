"use client";
import { useEffect, useState } from "react";
import { subscribeToRoom } from "@/lib/supabase/client-realtime";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { LiveAnnouncer } from "@/components/LiveAnnouncer";
import { Scoreboard } from "@/components/Scoreboard";

export default function GamePage({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const supabase = createSupabaseBrowser();
  const [room, setRoom] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [announce, setAnnounce] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();
      setRoom(data);
    }
    load();
    const sub = subscribeToRoom(roomId, async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();
      setRoom(data);
      if (data?.last_event?.type === "score") {
        const name =
          data.last_event.actor === data.player1 ? "Player 1" : "Player 2";
        setAnnounce(`${name} scored a point!`);
      }
    });
    return () => {
      supabase.removeChannel(sub);
    };
  }, [roomId]);

  async function submit() {
    await fetch("/api/game/submit-answer", {
      method: "POST",
      body: JSON.stringify({
        roomId,
        input: answer,
        correctAnswer: room?.correct_answer,
      }),
    });
    setAnswer("");
  }
  async function next() {
    await fetch("/api/game/next-card", {
      method: "POST",
      body: JSON.stringify({ roomId }),
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Scoreboard p1={room?.p1_score || 0} p2={room?.p2_score || 0} />
      <div className="border rounded p-4 min-h-[120px]">
        <div className="text-lg font-semibold">Question</div>
        <div className="mt-2">{room?.current_card_id ?? "Waiting..."}</div>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer..."
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={submit}
        >
          Submit
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={next}
        >
          Next Card
        </button>
      </div>
      <LiveAnnouncer message={announce} />
    </div>
  );
}
