import { cn, getPodiumColor } from "~/lib/util";
import { TempTeamRank } from "~/types";
import SerratedBanner from "../ui/SerratedBanner";
import { Image } from "../Image";
interface ScoreMedalProps {
  team: TempTeamRank;
}

const ScoreMedal = ({ team }: ScoreMedalProps) => {
  return (
    <div className="flex flex-col relative">
      <div
        className={cn(
          "w-[100%] aspect-square max-w-[24rem] rounded-full outline outline-8 bg-white z-10 mx-auto",
          getPodiumColor(team.rank)
        )}
      >
        <Image
          src={team.image}
          height={1024}
          width={1024}
          fill
          aria-label={team.teamName}
          className="object-contain h-full w-full overflow-hidden rounded-full outline outline-[6px] outline-white -outline-offset-8"
        />
      </div>
      <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 self-center translate-y-3">
        <p className="flex h-full items-center justify-center text-md font-bold text-white">
          {team.rank}
        </p>
      </div>
      <div className="relative w-full self-start ">
        <div className="absolute mt-9 sm:mt-16 z-10 flex flex-col items-center justify-center w-full h-full">
          <p className="uppercase px-2 pt-2 font-bold text-lg text-center rounded-md text-white">
            {team.teamName}
          </p>
          <p className="px-4 sm:mt-2 font-bold text-lg sm:text-xl md:text-2xl bg-white rounded-full text-red-800">
            {/* {team.score} */}0
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
