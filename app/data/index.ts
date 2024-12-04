type Activity = {
  id: string;
  name: string;
  type: string; // event | sport
  startDate: Date; // date time
  endDate: Date; // date time
};

type ActivityScore = {
  id: string;
  name: string;
  score: number;
  partcipant?: string; // not sure, not every event has a participant attached, review mechanics
  url: string; // route rul in assets ex. /cosplay , /battle-of-the-bands
  image: string; // Image url in assets ex. /events/cosplay
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

// For frontend demo
export async function getFakeOverallLeaderboard() {
  return;
}

export function getFakeLeaderboardById() {
  return;
}
