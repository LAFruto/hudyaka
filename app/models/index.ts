// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ActivityType = "event" | "sport";

type ActivityMutation = {
  id?: string;
  name: string;
  type: ActivityType;
  image: string; // Image path in assets ex. /activities/cosplay.png, /activities/battle-of-the-bands.png
  url: string; // URL route ex. /cosplay, /battle-of-the-bands
  startDate: Date; // Start date and time
  endDate: Date; // End date and time
};

type ActivityRecord = ActivityMutation & {
  id: string;
};

type ScoreMutation = {
  id?: string;
  score: number;
  activity: ActivityRecord; //
  team: Team;
  participant?: Person; // optional: Person involved in the activity
};

type ScoreRecord = ScoreMutation & {
  id: string;
  createdAt: Date;
};

type Team = {
  id?: string;
  name: string;
  image: string; // image path
};

type Person = {
  id?: string;
  firstName: string;
  lastName: string;
};

// TODO
// Overall only aggregates event of type "event" not "sports"
export async function getOverallLeaderboard() {
  return;
}

// TODO
export async function getLeaderboardById() {
  return;
}

// TODO
// Based on Activity - startDate & endDate
export async function getRemainingActivitiesByTypeId() {}

////////////////////////
// For frontend demo
/////////////////////////
const fakeActivities = {
  records: {} as Record<string, ActivityRecord>,

  async getAll(): Promise<ActivityRecord[]> {
    return Object.keys(fakeActivities.records).map(
      (key) => fakeActivities.records[key]
    );
  },

  async get(id: string): Promise<ActivityRecord | null> {
    return fakeActivities.records[id] || null;
  },

  async create(values: ActivityMutation): Promise<ActivityRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const newActivity = { id, ...values };
    fakeActivities.records[id] = newActivity;
    return newActivity;
  },

  async set(id: string, values: ActivityMutation): Promise<ActivityRecord> {
    const activity = await fakeActivities.get(id);
    invariant(activity, `No activity found for ${id}`);
    const updateActivity = { ...activity, ...values };
    fakeActivities.records[id] = updateActivity;
    return updateActivity;
  },

  destroyI(id: string): null {
    delete fakeActivities.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getActivitiesByType(type: ActivityType) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Temp Load Simulation
  const activities = await fakeActivities.getAll();
  const filteredActivities = activities.map((a) => a.type === type);
  return filteredActivities.sort(sortBy("startDate"));
}

export async function getFakeOverallLeaderboard() {
  return;
}

export function getFakeLeaderboardById() {
  return;
}

[
  {
    name: "Tawag ng Tanghalan",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    imageUrl: "https://example.com/activities/tawag-ng-tanghalan.png",
    startDate: new Date(new Date("12/3/24").setHours(6, 0, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(10, 0, 0, 0)),
  },
  {
    name: "Battle of the Bands",
    type: "event",
    image: "/activities/battle-of-the-bands.png",
    imageUrl: "https://example.com/activities/battle-of-the-bands.png",
    startDate: new Date(new Date("12/3/24").setHours(10, 30, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(13, 0, 0, 0)),
  },
  {
    name: "Spoken Poetry",
    type: "event",
    image: "/activities/spoken-poetry.png",
    imageUrl: "https://example.com/activities/spoken-poetry.png",
    startDate: new Date(new Date("12/3/24").setHours(13, 30, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(15, 0, 0, 0)),
  },
  {
    name: "Killer Karaoke",
    type: "event",
    image: "/activities/killer-karaoke.png",
    imageUrl: "https://example.com/activities/killer-karaoke.png",
    startDate: new Date(new Date("12/4/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/4/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Laro ng Lahi",
    type: "event",
    image: "/activities/laro-ng-lahi.png",
    imageUrl: "https://example.com/activities/laro-ng-lahi.png",
    startDate: new Date(new Date("12/4/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/4/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Hudyaka Parade of Festivals",
    type: "event",
    image: "/activities/hudyaka-parade-of-festivals.png",
    imageUrl: "https://example.com/activities/hudyaka-parade-of-festivals.png",
    startDate: new Date(new Date("12/5/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Mapua Kaloka-like with Talent",
    type: "event",
    image: "/activities/mapua-kaloka-like-with-talent.png",
    imageUrl:
      "https://example.com/activities/mapua-kaloka-like-with-talent.png",
    startDate: new Date(new Date("12/5/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Sinag Mr. & Ms. MMCM",
    type: "event",
    image: "/activities/sinag-mr-and-ms-mmcm.png",
    imageUrl: "https://example.com/activities/sinag-mr-and-ms-mmcm.png",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
  },
  {
    name: "Volleyball",
    type: "sport",
    image: "/activities/sports-volleyball.png",
    imageUrl: "https://example.com/activities/sports-volleyball.png",
    startDate: new Date(new Date("12/6/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/6/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Basketball",
    type: "sport",
    image: "/activities/sports-basketball.png",
    imageUrl: "https://example.com/activities/sports-basketball.png",
    startDate: new Date(new Date("12/6/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/6/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Table Tennis",
    type: "sport",
    image: "/activities/sports-table-tennis.png",
    imageUrl: "https://example.com/activities/sports-table-tennis.png",
    startDate: new Date(new Date("12/7/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Futsal",
    type: "sport",
    image: "/activities/sports-futsal.png",
    imageUrl: "https://example.com/activities/sports-futsal.png",
    startDate: new Date(new Date("12/7/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Badminton",
    type: "sport",
    image: "/activities/sports-badminton.png",
    imageUrl: "https://example.com/activities/sports-badminton.png",
    startDate: new Date(new Date("12/8/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Chess",
    type: "sport",
    image: "/activities/sports-chess.png",
    imageUrl: "https://example.com/activities/sports-chess.png",
    startDate: new Date(new Date("12/8/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Esports",
    type: "sport",
    image: "/activities/sports-esports.png",
    imageUrl: "https://example.com/activities/sports-esports.png",
    startDate: new Date(new Date("12/9/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(11, 0, 0, 0)),
  },
];

[
  {
    name: "Tawag ng Tanghalan",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    url: "/tawag-ng-tanghalan",
    startDate: new Date(new Date("12/3/24").setHours(6, 0, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(10, 0, 0, 0)),
  },
  {
    name: "Battle of the Bands",
    type: "event",
    image: "/activities/battle-of-the-bands.png",
    url: "/battle-of-the-bands",
    startDate: new Date(new Date("12/3/24").setHours(10, 30, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(13, 0, 0, 0)),
  },
  {
    name: "Spoken Poetry",
    type: "event",
    image: "/activities/spoken-poetry.png",
    url: "/spoken-poetry",
    startDate: new Date(new Date("12/3/24").setHours(13, 30, 0, 0)),
    endDate: new Date(new Date("12/3/24").setHours(15, 0, 0, 0)),
  },
  {
    name: "Killer Karaoke",
    type: "event",
    image: "/activities/killer-karaoke.png",
    url: "/killer-karaoke",
    startDate: new Date(new Date("12/4/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/4/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Laro ng Lahi",
    type: "event",
    image: "/activities/laro-ng-lahi.png",
    url: "/laro-ng-lahi",
    startDate: new Date(new Date("12/4/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/4/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Hudyaka Parade of Festivals",
    type: "event",
    image: "/activities/hudyaka-parade-of-festivals.png",
    url: "/hudyaka-parade-of-festivals",
    startDate: new Date(new Date("12/5/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Mapua Kaloka-like with Talent",
    type: "event",
    image: "/activities/mapua-kaloka-like-with-talent.png",
    url: "/mapua-kaloka-like-with-talent",
    startDate: new Date(new Date("12/5/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Sinag Mr. & Ms. MMCM",
    type: "event",
    image: "/activities/sinag-mr-and-ms-mmcm.png",
    url: "/sinag-mr-and-ms-mmcm",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
  },
  {
    name: "Volleyball",
    type: "sport",
    image: "/activities/sports-volleyball.png",
    url: "/volleyball",
    startDate: new Date(new Date("12/6/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/6/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Basketball",
    type: "sport",
    image: "/activities/sports-basketball.png",
    url: "/basketball",
    startDate: new Date(new Date("12/6/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/6/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Table Tennis",
    type: "sport",
    image: "/activities/sports-table-tennis.png",
    url: "/table-tennis",
    startDate: new Date(new Date("12/7/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Futsal",
    type: "sport",
    image: "/activities/sports-futsal.png",
    url: "/futsal",
    startDate: new Date(new Date("12/7/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Badminton",
    type: "sport",
    image: "/activities/sports-badminton.png",
    url: "/badminton",
    startDate: new Date(new Date("12/8/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(11, 0, 0, 0)),
  },
  {
    name: "Chess",
    type: "sport",
    image: "/activities/sports-chess.png",
    url: "/chess",
    startDate: new Date(new Date("12/8/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(14, 0, 0, 0)),
  },
  {
    name: "Esports",
    type: "sport",
    image: "/activities/sports-esports.png",
    url: "/esports",
    startDate: new Date(new Date("12/9/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(11, 0, 0, 0)),
  },
].forEach((activity) => {
  fakeActivities.create({
    ...activity,
    type: activity.type as ActivityType,
  });
});
