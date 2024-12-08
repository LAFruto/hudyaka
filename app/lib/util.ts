import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventStatus, TempTeam, TempTeamRank } from "~/types";

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

export const getLeaderboardLayout = (
  teams: TempTeam[]
): [TempTeamRank[], TempTeamRank[]] => {
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

export function getEventStatus(
  start: Date,
  end: Date,
  isScored: boolean
): EventStatus {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid start or end date provided");
  }

  const oneDayMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

  // Get calendar day differences, ignoring time
  const daysUntilStart = Math.ceil(
    (startDate.getTime() - now.getTime()) / oneDayMs
  );

  const timeUntilStart = startDate.getTime() - now.getTime();
  const timeUntilEnd = endDate.getTime() - now.getTime();

  // Format time range as "4:00 PM - 5:00 PM"
  const timeRange = `${startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} - ${endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  // Check if the event hasn't started yet
  if (timeUntilStart > 0) {
    if (timeUntilStart < oneDayMs) {
      return {
        type: "countdown",
        timeUntilStart,
        timeRange: timeRange,
      };
    } else if (daysUntilStart === 1) {
      return {
        type: "upcoming",
        message: "Starting Tomorrow!",
        timeRange: timeRange,
      };
    }

    return {
      type: "upcoming",
      message: `${start.toLocaleString("en-US", {
        month: "long",
      })} ${start.getDate()}`,
      timeRange: timeRange,
    };
  }

  // Check if the event is ongoing
  if (timeUntilEnd > 0 || !isScored) {
    return {
      type: "ongoing",
      message: "Now Happening!",
    };
  }

  // Event has finished
  return {
    type: "finished",
    message: "Results are out!",
  };
}

export function getHeroCarousel() {
  return;
}
