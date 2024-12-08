import { useState, useEffect } from "react";
import { TIMEZONE_OFFSET } from "~/constants";

export type EventStatus =
  | { type: "countdown"; timeUntilStart: number; timeRange: string }
  | { type: "upcoming"; message: string; timeRange: string }
  | { type: "ongoing"; message: string }
  | { type: "finished"; message: string };

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

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

export function useEventStatus(
  start: Date,
  end: Date,
  isScored: boolean,
  currentTime: Date
) {
  const [status, setStatus] = useState<EventStatus>(() =>
    calculateEventStatus(start, end, isScored, currentTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(calculateEventStatus(start, end, isScored, new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, [start, end, isScored]);

  return status;
}

function calculateEventStatus(
  start: Date,
  end: Date,
  isScored: boolean,
  currentTime: Date
): EventStatus {
  const phNow = new Date(currentTime);
  phNow.setHours(phNow.getHours() + TIMEZONE_OFFSET);
  const startDate = new Date(start);
  const endDate = new Date(end);

  const timeUntilStart = startDate.getTime() - phNow.getTime();
  const timeUntilEnd = endDate.getTime() - phNow.getTime();
  const daysUntilStart = Math.ceil(timeUntilStart / ONE_DAY_MS);

  const timeRange = `${startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} - ${endDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  if (timeUntilStart > 0) {
    if (timeUntilStart < ONE_DAY_MS) {
      return {
        type: "countdown",
        timeUntilStart,
        timeRange,
      };
    } else {
      return {
        type: "upcoming",
        message:
          daysUntilStart === 1
            ? "Starting Tomorrow!"
            : `${months[startDate.getMonth()]} ${startDate.getDate()}`,
        timeRange,
      };
    }
  }

  if (timeUntilEnd > 0 || !isScored) {
    return {
      type: "ongoing",
      message: "Now Happening!",
    };
  }

  return {
    type: "finished",
    message: "Results are out!",
  };
}
