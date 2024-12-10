export type ActivityType = "event" | "sport";
export type ResultType = "team" | "participant";

export type EventStatus =
  | { type: "upcoming"; message: string; timeRange: string }
  | { type: "countdown"; timeUntilStart: number; timeRange: string }
  | { type: "ongoing"; message: string }
  | { type: "finished"; message: string };

export type MedalColor = "blue" | "yellow" | "red" | "light-blue";

export type Result = {
  activity: string;
  categories: Category[];
};

export type Category = {
  category: string | null;
  scores: Score[];
};

export type Score = {
  score?: number | null;
  image: string;
  displayRank?: number;
  team: string;
  participant?: string | null;
};

export type ScoreRank = Score & {
  rank: number;
};
