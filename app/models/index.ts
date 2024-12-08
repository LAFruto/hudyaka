// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { ActivityRecord, ActivityMutation, ActivityType } from "~/types";

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
    const id = values.name.toLowerCase().replace(/\s+/g, "-");
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
  const filteredActivities = activities.filter((a) => a.type === type);
  return filteredActivities.sort(sortBy("startDate"));
}

export async function getActivityById(id: string) {
  return fakeActivities.get(id);
}

export async function getFakeOverallLeaderboard() {
  return;
}

export function getFakeLeaderboardById() {
  return;
}

[
  {
    name: "Parade of Festivals",
    type: "event",
    image: "/activities/parade-of-festivals.png",
    banner: "/banner/parade-of-festivals.png",
    url: "/a/parade-of-festivals",
    startDate: new Date(new Date("12/8/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(9, 0, 0, 0)),
    isOverall: true,
    isScored: true,
  },
  {
    name: "Laro ng Lahi",
    type: "event",
    image: "/activities/laro-ng-lahi.png",
    banner: "/banner/laro-ng-lahi.png",
    url: "/a/laro-ng-lahi",
    startDate: new Date(new Date("12/9/24").setHours(13, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(16, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Sinag",
    type: "event",
    image: "/activities/sinag.png",
    banner: "/banner/sinag.png",
    url: "/a/sinag",
    startDate: new Date(new Date("12/9/24").setHours(16, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(20, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Cosplay",
    type: "event",
    image: "/activities/cosplay.png",
    banner: "/banner/cosplay.png",
    url: "/a/cosplay",
    startDate: new Date(new Date("12/10/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Battle of the Bands",
    type: "event",
    image: "/activities/battle-of-the-bands.png",
    banner: "/banner/battle-of-the-bands.png",
    url: "/a/battle-of-the-bands",
    startDate: new Date(new Date("12/10/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(18, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Spoken Poetry",
    type: "event",
    image: "/activities/spoken-poetry.png",
    banner: "/banner/spoken-poetry.png",
    url: "/a/spoken-poetry",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Killer Karaoke",
    type: "event",
    image: "/activities/killer-karaoke.png",
    banner: "/banner/killer-karaoke.png",
    url: "/a/killer-karaoke",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Kaloka-like with Talent",
    type: "event",
    image: "/activities/kaloka-like-with-talent.png",
    banner: "/banner/kaloka-like-with-talent.png",
    url: "/a/kaloka-like-with-talent",
    startDate: new Date(new Date("12/11/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(17, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Indak Mapua",
    type: "event",
    image: "/activities/indak-mapua.png",
    banner: "/banner/indak-mapua.png",
    url: "/a/indak-mapua",
    startDate: new Date(new Date("12/11/24").setHours(17, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(19, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Folk Dance",
    type: "event",
    image: "/activities/folk-dance.png",
    banner: "/banner/folk-dance.png",
    url: "/a/folk-dance",
    startDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Tawag ng Tanghalan",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    banner: "/banner/tawag-ng-tanghalan.png",
    url: "/a/tawag-ng-tanghalan",
    startDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Petsyonista",
    type: "event",
    image: "/activities/petsyonista.png",
    banner: "/banner/petsyonista.png",
    url: "/a/petsyonista",
    startDate: new Date(new Date("12/13/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/13/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  //////////////////////////////////////
  // SPORTS
  //////////////////////////////////////

  {
    name: "Table Tennis",
    type: "sport",
    image: "/activities/table-tennis.png",
    banner: "/banner/table-tennis.png",
    url: "/a/table-tennis",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(21, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Scrabble",
    type: "sport",
    image: "/activities/scrabble.png",
    banner: "/banner/scrabble.png",
    url: "/a/scrabble",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(19, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Badminton",
    type: "sport",
    image: "/activities/badminton.png",
    banner: "/banner/badminton.png",
    url: "/a/badminton",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(21, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Chess",
    type: "sport",
    image: "/activities/chess.png",
    banner: "/banner/chess.png",
    url: "/a/chess",
    startDate: new Date(new Date("12/12/24").setHours(10, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(19, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Mobile Legends",
    type: "sport",
    image: "/activities/mobile-legends.png",
    banner: "/banner/mobile-legends.png",
    url: "/a/mobile-legends",
    startDate: new Date(new Date("12/10/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(20, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Volleyball",
    type: "sport",
    image: "/activities/volleyball.png",
    banner: "/banner/volleyball.png",
    url: "/a/volleyball",
    startDate: new Date(new Date("12/9/24").setHours(13, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(18, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Basketball",
    type: "sport",
    image: "/activities/basketball.png",
    banner: "/banner/basketball.png",
    url: "/a/basketball",
    startDate: new Date(new Date("12/13/24").setHours(7, 30, 0, 0)),
    endDate: new Date(new Date("12/13/24").setHours(12, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
].forEach((activity) => {
  fakeActivities.create({
    ...activity,
    type: activity.type as ActivityType,
  });
});
