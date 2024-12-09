import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TIMEZONE_OFFSET } from "~/constants";
import { EventStatus, Score, ScoreRank, TempTeam, TempTeamRank } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPodiumColor = (position: number): string => {
  switch (position) {
    case 1:
      return "outline-yellow-600"; // First
    case 2:
      return "outline-blue-900"; // Second
    case 3:
      return "outline-red-700"; // Third
    default:
      return "outline-blue-500"; // Fourth Below...
  }
};

export const getListColor = (position: number): string => {
  switch (position) {
    case 1:
      return "bg-yellow-600"; // First
    case 2:
      return "bg-blue-900"; // Second
    case 3:
      return "bg-red-700"; // Third
    default:
      return "bg-blue-500"; // Fourth Below...
  }
};

export const attachRanks = (teams: TempTeam[]): TempTeamRank[] => {
  // First, sort the teams by score in descending order
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  let rank = 1;
  let lastScore: number | null = null;
  const rankedTeams: TempTeamRank[] = [];

  // Loop through the sorted teams to assign ranks
  for (let i = 0; i < sortedTeams.length; i++) {
    const team = sortedTeams[i];

    // If the score is the same as the last team's score, assign the same rank
    if (team.score === lastScore) {
      rankedTeams.push({ ...team, rank: rank });
    } else {
      // Otherwise, increment the rank and assign it to the team
      rank = i + 1; // Rank is based on the index + 1 (for 1-based ranking)
      rankedTeams.push({ ...team, rank: rank });
    }

    // Update the last score
    lastScore = team.score;
  }

  return rankedTeams;
};

export const getLeaderboardLayout = (teams: TempTeam[]): [TempTeamRank[], TempTeamRank[]] => {
  const rankedTeams = attachRanks(teams);
  // Sort teams by score in descending order
  const podium: TempTeamRank[] = [];
  const list: TempTeamRank[] = [];

  let temp: TempTeamRank[] = [];
  let podiumFull = false; // Flag to indicate if the podium is full

  for (const team of rankedTeams) {
    if (!podiumFull) {
      // Accumulate teams with the same score
      if (temp.length === 0 || team.score === temp[0].score) {
        temp.push(team);
      } else {
        // When score changes, check if we can add the accumulated teams to the podium
        if (podium.length + temp.length <= 3) {
          podium.push(...temp);
        } else {
          // If adding this group exceeds the podium limit, move the extra teams to the list
          list.push(...temp);
          podiumFull = true; // Set the flag to true to indicate that podium is full
        }
        temp = [team]; // Start a new group for the next score
      }
    } else {
      list.push(team);
    }
  }

  if (temp.length > 0) {
    list.push(...temp);
  }

  const sortedList = [...list].sort((a, b) => b.score - a.score);

  return [podium, sortedList];
};

export const attachRanks2 = (scores: Score[]): ScoreRank[] => {
  // First, sort the teams by score in descending order
  const sortedTeams = [...scores].sort((a, b) => b.score! - a.score!);

  let rank = 1;
  let lastScore: number | null = null;
  const rankedTeams: ScoreRank[] = [];

  // Loop through the sorted teams to assign ranks
  for (let i = 0; i < sortedTeams.length; i++) {
    const team = sortedTeams[i];

    // If the score is the same as the last team's score, assign the same rank
    if (team.score === lastScore) {
      rankedTeams.push({ ...team, rank: rank });
    } else {
      // Otherwise, increment the rank and assign it to the team
      rank = i + 1; // Rank is based on the index + 1 (for 1-based ranking)
      rankedTeams.push({ ...team, rank: rank });
    }

    // Update the last score
    lastScore = team.score;
  }

  return rankedTeams;
};

export const attachRanks3 = (scores: Score[]): ScoreRank[] => {
  // First, sort the teams by score in descending order
  const sortedTeams = [...scores].sort((a, b) => a.displayRank! - b.displayRank!);

  const rankedTeams: ScoreRank[] = [];

  for (const team of sortedTeams) {
    rankedTeams.push({ ...team, rank: team.displayRank! });
  }

  return rankedTeams;
};

export const getLeaderboardLayout3 = (scores: Score[]): [ScoreRank[], ScoreRank[]] => {
  const rankedTeams = attachRanks3(scores);
  // Sort teams by score in descending order
  const podium: ScoreRank[] = [];
  const list: ScoreRank[] = [];

  let temp: ScoreRank[] = [];
  let podiumFull = false; // Flag to indicate if the podium is full

  for (const team of rankedTeams) {
    if (!podiumFull) {
      // Accumulate teams with the same score
      if (temp.length === 0 || team.score === temp[0].score) {
        temp.push(team);
      } else {
        // When score changes, check if we can add the accumulated teams to the podium
        if (podium.length + temp.length <= 3) {
          podium.push(...temp);
        } else {
          // If adding this group exceeds the podium limit, move the extra teams to the list
          list.push(...temp);
          podiumFull = true; // Set the flag to true to indicate that podium is full
        }
        temp = [team]; // Start a new group for the next score
      }
    } else {
      list.push(team);
    }
  }

  if (temp.length > 0) {
    list.push(...temp);
  }

  const sortedList = [...list].sort((a, b) => b.score! - a.score!);

  return [podium, sortedList];
};

export const getLeaderboardLayout2 = (scores: Score[]): [ScoreRank[], ScoreRank[]] => {
  const rankedTeams = attachRanks2(scores);
  // Sort teams by score in descending order
  const podium: ScoreRank[] = [];
  const list: ScoreRank[] = [];

  let temp: ScoreRank[] = [];
  let podiumFull = false; // Flag to indicate if the podium is full

  for (const team of rankedTeams) {
    if (!podiumFull) {
      // Accumulate teams with the same score
      if (temp.length === 0 || team.score === temp[0].score) {
        temp.push(team);
      } else {
        // When score changes, check if we can add the accumulated teams to the podium
        if (podium.length + temp.length <= 3) {
          podium.push(...temp);
        } else {
          // If adding this group exceeds the podium limit, move the extra teams to the list
          list.push(...temp);
          podiumFull = true; // Set the flag to true to indicate that podium is full
        }
        temp = [team]; // Start a new group for the next score
      }
    } else {
      list.push(team);
    }
  }

  if (temp.length > 0) {
    list.push(...temp);
  }

  const sortedList = [...list].sort((a, b) => b.score! - a.score!);

  return [podium, sortedList];
};

export function getEventStatus(start: Date, end: Date, isScored: boolean): EventStatus {
  const serverNow = new Date();
  const phNow = new Date(serverNow);
  phNow.setHours(phNow.getHours());
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid start or end date provided");
  }

  const oneDayMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

  // Get calendar day differences, ignoring time
  const daysUntilStart = Math.ceil((startDate.getTime() - phNow.getTime()) / oneDayMs);

  const timeUntilStart = startDate.getTime() - phNow.getTime();
  const timeUntilEnd = endDate.getTime() - phNow.getTime();

  // Format time range as "4:00 PM - 5:00 PM" with +8 timezone offset
  const timeRange = ""; //TODO;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = parseInt(start.toISOString().split("T")[0].split("-")[2], 10);

  // Check if the event hasn't started yet
  if (timeUntilStart > 0) {
    if (timeUntilStart < oneDayMs) {
      return {
        type: "countdown",
        timeUntilStart,
        timeRange: timeRange,
      };
    } else {
      return {
        type: "upcoming",
        message: daysUntilStart === 1 ? "Starting Tomorrow!" : `${months[startDate.getMonth()]} ${day}`,
        timeRange: timeRange,
      };
    }
  }

  if (timeUntilEnd > 0) {
    return {
      type: "ongoing",
      message: "Now Happening!",
    };
  }

  // Event has finished but not scored
  if (!isScored) {
    return {
      type: "ongoing",
      message: "Waiting for results",
    };
  }

  // Event has finished and scored
  return {
    type: "finished",
    message: "Results are out!",
  };
}
