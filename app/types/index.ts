export type ActivityType = "event" | "sport";

export type ActivityMutation = {
  id?: string;
  name: string;
  type: string;
  image: string; // Image path in assets ex. /activities/cosplay.png, /activities/battle-of-the-bands.png
  banner: string; // for hero swiper
  url: string; // URL route ex. /cosplay, /battle-of-the-bands
  startDate: Date; // Start date and time
  endDate: Date; // End date and time
  isOverall: boolean; // if event is included in the overall tabulation
  isScored: boolean;
};

export type ActivityRecord = ActivityMutation & {
  id: string;
};

export type ScoreMutation = {
  id?: string;
  score: number;
  activity: ActivityRecord; //
  team: Team;
  participant?: Person; // optional: Person involved in the activity
};

export type ScoreRecord = ScoreMutation & {
  id: string;
  createdAt: Date;
};

export type Team = {
  id?: string;
  name: string; // team 1, team 2,
  festivalName: string; // bruh , Maskara,
  image: string; // image path
};

export type Person = {
  id?: string;
  firstName: string;
  lastName: string;
};

// NONE DB
export type EventStatus =
  | { type: "upcoming"; message: string; timeRange: string }
  | { type: "countdown"; timeUntilStart: number; timeRange: string }
  | { type: "ongoing"; message: string }
  | { type: "finished"; message: string };

// POLISH
export type MedalColor = "blue" | "yellow" | "red" | "light-blue";

// Frontend Result Convert
export type Result = {
  activity: string;
  categories: Category[];
};

export type Category = {
  category: string | null;
  scores: Score[];
};

export type Score = {
  score?: number | null; // Allow null as well as undefined
  image: string;
  displayRank?: number;
  team: string;
  participant?: string | null; // Allow null as a possible value
};

export type ScoreRank = Score & {
  rank: number;
};

export type ResultType = "team" | "participant";
