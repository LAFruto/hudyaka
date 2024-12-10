import { cn, getListColor, toCapitalCase } from "~/lib/util";
import { ResultType, ScoreRank } from "~/types";
import { Image } from "./Image";

interface TeamScoreCardProps {
  team: ScoreRank;
  type: ResultType;
}

const TeamScoreCard = ({ team, type }: TeamScoreCardProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 px-6 py-5 rounded-lg w-full",
        getListColor(team.rank)
      )}
    >
      <div className="w-24 h-24 flex-shrink-0 md:w-20 md:h-20 text-lg outline outline-white outline-4 rounded-full relative justify-center flex items-center">
        <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 translate-y-3">
          <p className="flex h-full items-center justify-center text-sm font-bold text-white">
            {team.rank}
          </p>
        </div>
        <Image
          src={team.image}
          height={1024}
          width={1024}
          fill
          aria-label={team.team}
          className="object-contain h-full w-full overflow-hidden rounded-full"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center">
          <p className="uppercase text-xl font-bold text-white text-nowrap">
            {team.team}
          </p>
          {/* {team.participant && (
            <p className="text-md text-white tracking-wider font-semibold ">
              {toCapitalCase(team.participant)}
            </p>
          )} */}
        </div>

        <div className="flex items-center">
          <p className="bg-white rounded-full text-lg md:text-xl px-4 tracking-wider font-bold text-red-700">
            {type == "team" && team.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamScoreCard;
