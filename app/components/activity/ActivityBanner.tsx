import { ActivityRecord } from "~/types";
import HoverMedal from "../HoverMedal";
import { Image } from "../Image";
import Arrow from "../icons/Arrow";
import ActivityBadge from "./ActivityBadge";
import { Link } from "@remix-run/react";
import { getEventStatus } from "~/lib/util";
import { CountdownTimer } from "../CountdownTimer";
import { useCurrentTime } from "~/hooks/useCurrentTime";
import Clock from "../icons/Clock";

interface ActivityBannerProps {
  activity: ActivityRecord;
}

const ActivityBanner = ({ activity }: ActivityBannerProps) => {
  const currentTime = useCurrentTime();

  const status = getEventStatus(
    new Date(activity.startDate),
    new Date(activity.endDate),
    activity.isScored
  );

  return (
    <section className="max-container padding-container pt-[4%] md:pt-[2%]">
      <div className="relative min-h-[300px] p-6">
        <Image
          src={activity.banner}
          height={1024}
          width={1024}
          fill
          aria-label="API"
          className="object-contain h-full w-full overflow-hidden rounded-3xl"
        />
        <div className="flex w-full justify-between">
          <Link
            to="/"
            prefetch="viewport"
            className="inline-flex w-full rounded-lg items-center gap-2 text-white lg:px-4 py-1.5 group"
          >
            <div className="w-[15px] h-[15px] md:w-[30px] md:h-[30px] rotate-135 mr-2 group-hover:-translate-x-2 transform transition-transform duration-300 ease-in-out">
              <Arrow />
            </div>
            <div className="h-7 md:h-10 overflow-hidden mr-2">
              <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                <p className="text-lg md:text-4xl font-bold">Back</p>
                <p className="text-lg md:text-4xl font-bold">Back</p>
              </div>
            </div>
          </Link>
          <div className="text-white z-20 flex gap-2">
            <span className="pointer-events-auto">
              {activity.isOverall && <HoverMedal />}
            </span>
            <span>
              <ActivityBadge type={activity.type} />
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full h-[200px] relative rounded-3xl overflow-hidden mt-4 mb-4 sm:mb-0">
            <Image
              src={activity.image}
              height={1024}
              width={1024}
              aria-label="API"
              className="object-contain h-full w-full overflow-hidden"
            />
          </div>
          <div className="z-20">
            {status.type === "ongoing" ? (
              <p className="inline-flex w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5 text-lg md:text-xl font-semibold mt-4">
                {status.message}
              </p>
            ) : status.type === "countdown" ? (
              <div className="flex flex-col w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5 font-semibold mt-4">
                <CountdownTimer
                  currentTime={currentTime}
                  timeUntilStart={status.timeUntilStart}
                  className="text-lg md:text-xl"
                />
                <p className="inline-flex items-center bg-red-800  text-white rounded-md px-4 py-1">
                  <Clock className="w-4 h-4 mr-2" />
                  {status.timeRange}
                </p>
              </div>
            ) : status.type === "upcoming" ? (
              <div className="flex flex-col w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5 font-semibold mt-4">
                <p className="text-lg lg:text-xl">{status.message}</p>
                <p className="inline-flex items-center bg-red-800 text-white rounded-md px-4 py-1">
                  <Clock className="w-4 h-4 mr-2" />
                  {status.timeRange}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="inline-flex   rounded-lg items-center gap-2 bg-red-800 text-white lg:px-4 py-1.5 text-lg md:text-xl font-semibold mt-4 ">
                  {status.message}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:inline-flex h-[100px] relative rounded-3xl overflow-hidden mt-4 ">
          <Image
            src="/hudyaka.svg"
            height={1024}
            width={1024}
            aria-label="API"
            className="object-contain h-full w-full overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default ActivityBanner;
