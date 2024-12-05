import { cn, getPodiumColor } from "~/lib/util";
import { TempTeamRank } from "~/types";
import SerratedBanner from "../ui/SerratedBanner";
interface ScoreMedalProps {
  team: TempTeamRank;
}

const ScoreMedal = ({ team }: ScoreMedalProps) => {
  return (
    <div className="flex flex-col relative">
      <div
        className={cn(
          "w-[100%] aspect-square max-w-[24rem] rounded-full border-8 bg-white z-10 mx-auto",
          getPodiumColor(team.rank)
        )}
      ></div>
      <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 self-center translate-y-3">
        <p className="flex h-full items-center justify-center text-md font-bold text-white">
          {team.rank}
        </p>
      </div>
      <div className="relative w-full self-start ">
        <div className="absolute mt-9 sm:mt-12 z-10 flex flex-col items-center justify-center w-full h-full">
          <p className="px-2 font-bold mt-4 text-xs sm:text-sm text-center rounded-md text-white">
            Team {team.teamNumber}
          </p>
          <p className="px-2 font-bold text-sm sm:text-base text-center rounded-md text-white">
            {team.teamName}
          </p>
          <p className="px-4 sm:mt-2 font-bold text-base sm:text-lg md:text-xl bg-white rounded-full text-red-800">
            {team.score}
          </p>
        </div>
        <div className="w-full p-2 absolute -translate-y-1/4">
          <SerratedBanner team={team} />
        </div>
      </div>
    </div>
  );
};

export default ScoreMedal;
