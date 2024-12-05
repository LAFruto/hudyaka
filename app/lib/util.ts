import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventStatus } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

  const timeUntilStart = startDate.getTime() - now.getTime();
  const timeUntilEnd = endDate.getTime() - now.getTime();

  const oneDayMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

  // Check if the event hasn't started yet
  if (timeUntilStart > 0) {
    if (timeUntilStart <= oneDayMs) {
      return {
        type: "countdown",
        timeUntilStart,
      };
    } else if (timeUntilStart <= 2 * oneDayMs) {
      return {
        type: "upcoming",
        message: "Starting Tomorrow!",
      };
    }

    return {
      type: "upcoming",
      message: `Starts on ${start.toLocaleString("en-US", {
        month: "long",
      })} ${start.getDate()}`,
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
