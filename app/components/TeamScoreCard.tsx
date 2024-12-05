import { cn, getListColor } from "~/lib/util";
import { TempTeamRank } from "~/types";

interface TeamScoreCardProps {
  team: TempTeamRank;
}

const TeamScoreCard = ({ team }: TeamScoreCardProps) => {
  return (
    <div
      className={cn("flex gap-4 px-6 py-5 rounded-lg", getListColor(team.rank))}
    >
      <div className="w-24 h-24 flex-shrink-0 md:w-20 md:h-20 text-lg bg-white rounded-full relative justify-center flex items-center">
        <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 translate-y-3">
          <p className="flex h-full items-center justify-center text-sm font-bold text-white">
            {team.rank}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-bold text-sm text-white">Team {team.teamNumber}</p>
        <p className="uppercase text-xl font-bold text-white text-nowrap">
          {team.teamName}
        </p>
        <div className="mr-auto rounded-lg bg-white mt-4">
          <p className="text-md px-4 tracking-wider font-bold text-red-700">
            {team.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamScoreCard;
