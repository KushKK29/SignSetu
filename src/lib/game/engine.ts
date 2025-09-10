import type { MatchEvent } from "./types";

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  deck?: string;
};

export type RoomState = {
  roomId: string;
  player1: string;
  player2?: string;
  status: "waiting" | "active" | "finished";
  currentCard?: Flashcard;
  p1Score: number;
  p2Score: number;
};

export function isCorrectAnswer(input: string, correct: string) {
  return input.trim().toLowerCase() === correct.trim().toLowerCase();
}

export function nextCard(
  cards: Flashcard[],
  used: Set<string>
): Flashcard | null {
  const next = cards.find((c) => !used.has(c.id));
  return next || null;
}

export function applyAnswer(
  state: RoomState,
  actorId: string,
  input: string,
  correctAnswer: string
): { updated: RoomState; scored: boolean; event: MatchEvent } {
  const scored = isCorrectAnswer(input, correctAnswer);
  const updated = { ...state };
  if (scored) {
    if (actorId === state.player1) updated.p1Score += 1;
    else updated.p2Score += 1;
  }
  const event: MatchEvent = {
    ts: Date.now(),
    type: scored ? "score" : "answer",
    actor: actorId,
    payload: { input },
  };
  return { updated, scored, event };
}



