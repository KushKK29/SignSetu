export type MatchEvent = {
  ts: number;
  type: "start" | "answer" | "score" | "end" | "next_card";
  actor?: string;
  payload?: any;
};

export type MatchDoc = {
  _id?: string;
  roomId: string;
  players: { id: string; email?: string }[];
  winnerId?: string;
  startedAt: Date;
  endedAt?: Date;
  events: MatchEvent[];
  stats: {
    [userId: string]: { score: number; correct: number; incorrect: number };
  };
};
