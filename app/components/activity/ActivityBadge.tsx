import { ActivityType } from "~/types";
import Festival from "../icons/Festival";
import Ball from "../icons/Ball";
import { cn } from "~/lib/util";

interface ActivityBadgeProps {
  type: string;
}

const ActivityBadge = ({ type }: ActivityBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-yellow-500 p-2 sm:py-1.5 rounded-full px-4",
        type === "event" ? "bg-yellow-500" : "bg-red-500"
      )}
    >
      <div className="w-6 h-6 mr-2">
        {type === "event" ? <Festival color="white" /> : <Ball color="white" />}
      </div>
      <p className="font-bold text-sm sm:text-lg capitalize">{type}</p>
    </div>
  );
};

export default ActivityBadge;
