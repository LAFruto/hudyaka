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
  const filteredActivities = activities.filter((a) => a.type === type);
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
    name: "Laro ng Lahi",
    type: "event",
    image: "/activities/laro-ng-lahi.png",
    url: "/events/laro-ng-lahi",
    startDate: new Date(new Date("12/1/24").setHours(13, 0, 0, 0)),
    endDate: new Date(new Date("12/1/24").setHours(16, 0, 0, 0)),
    isOverall: true,
    isScored: true,
  },
  {
    name: "Sinag Mr. & Ms. MMCM",
    type: "event",
    image: "/activities/sinag.png",
    url: "/events/sinag",
    startDate: new Date(new Date("12/9/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(20, 0, 0, 0)),
    isOverall: true,
    isScored: true,
  },
  {
    name: "Cosplay",
    type: "event",
    image: "/activities/cosplay.png",
    url: "/events/cosplay",
    startDate: new Date(new Date("12/10/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Battle of the Bands",
    type: "event",
    image: "/activities/battle-of-the-bands.png",
    url: "/events/battle-of-the-bands",
    startDate: new Date(new Date("12/10/24").setHours(15, 0, 0, 0)),
    endDate: new Date(new Date("12/10/24").setHours(18, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Spoken Poetry",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    url: "/events/spoken-poetry",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Killer Karaoke",
    type: "event",
    image: "/activities/killer-karaoke.png",
    url: "/events/killer-karaoke",
    startDate: new Date(new Date("12/11/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(12, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Indak Mapua",
    type: "event",
    image: "/activities/indak-mapua.png",
    url: "/events/folk-dance",
    startDate: new Date(new Date("12/11/24").setHours(17, 0, 0, 0)),
    endDate: new Date(new Date("12/11/24").setHours(19, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Folk Dance",
    type: "event",
    image: "/activities/folk-dance.png",
    url: "/events/folk-dance",
    startDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(9, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  ////////////////////////
  // NO SCHEDULES YET
  {
    name: "Tawag ng Tanghalan",
    type: "event",
    image: "/activities/tawag-ng-tanghalan.png",
    url: "/events/tawag-ng-tanghalan",
    startDate: new Date(new Date("12/6/24").setHours(6, 0, 0, 0)),
    endDate: new Date(new Date("12/6/24").setHours(10, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Hudyaka Parade of Festivals",
    type: "event",
    image: "/activities/parade-of-festivals.png",
    url: "/events/parade-of-festivals",
    startDate: new Date(new Date("12/7/24").setHours(20, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(21, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },
  {
    name: "Mapua Kaloka-like with Talent",
    type: "event",
    image: "/activities/kaloka-like-with-talent.png",
    url: "/events/kaloka-like-with-talent",
    startDate: new Date(new Date("12/5/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(14, 0, 0, 0)),
    isOverall: true,
    isScored: false,
  },

  //////////////////////////////////////
  // SPORTS
  //////////////////////////////////////

  // NO SCHEDULEs
  {
    name: "Table Tennis",
    type: "sport",
    image: "/activities/table-tennis.png",
    url: "/activity/table-tennis",
    startDate: new Date(new Date("12/5/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/5/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: true,
  },
  {
    name: "Scrabble",
    type: "sport",
    image: "/activities/scrabble.png",
    url: "/sports/scrabble",
    startDate: new Date(new Date("12/7/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/7/24").setHours(14, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Badminton",
    type: "sport",
    image: "/activities/badminton.png",
    url: "/sports/badminton",
    startDate: new Date(new Date("12/8/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Chess",
    type: "sport",
    image: "/activities/chess.png",
    url: "/sports/chess",
    startDate: new Date(new Date("12/8/24").setHours(12, 0, 0, 0)),
    endDate: new Date(new Date("12/8/24").setHours(14, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Mobile Legends",
    type: "sport",
    image: "/activities/mobile-legends.png",
    url: "/sports/esports",
    startDate: new Date(new Date("12/9/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/9/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  ////////////////////////
  {
    name: "Volleyball",
    type: "sport",
    image: "/activities/volleyball.png",
    url: "/sports/volleyball",
    startDate: new Date(new Date("12/12/24").setHours(8, 0, 0, 0)),
    endDate: new Date(new Date("12/12/24").setHours(20, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
  {
    name: "Basketball",
    type: "sport",
    image: "/activities/basketball.png",
    url: "/sports/basketball",
    startDate: new Date(new Date("12/13/24").setHours(9, 0, 0, 0)),
    endDate: new Date(new Date("12/13/24").setHours(11, 0, 0, 0)),
    isOverall: false,
    isScored: false,
  },
].forEach((activity) => {
  fakeActivities.create({
    ...activity,
    type: activity.type as ActivityType,
  });
});
