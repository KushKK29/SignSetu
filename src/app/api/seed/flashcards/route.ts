import { NextResponse } from "next/server";
import { getMongo } from "@/lib/mongo/client";

export async function POST() {
  const db = await getMongo();
  const flashcards = [
    {
      id: "card_1",
      question: "Capital of France?",
      answer: "Paris",
      deck: "geography",
    },
    { id: "card_2", question: "2 + 2 = ?", answer: "4", deck: "math" },
    {
      id: "card_3",
      question: "Opposite of hot?",
      answer: "cold",
      deck: "vocab",
    },
  ];
  await db
    .collection("flashcards")
    .insertMany(flashcards, { ordered: false })
    .catch(() => {});
  return NextResponse.json({ inserted: flashcards.length });
}



