import { cn, getListColor, toCapitalCase } from "~/lib/util";
import { Score, ScoreType } from "~/types";
import { Image } from "./Image";

interface ScoreCardProps {
  score: Score;
  type?: ScoreType;
}

const ScoreCard = ({ score, type = "team" }: ScoreCardProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 px-6 py-4 lg:py-5 rounded-lg w-full",
        getListColor(score.rank || 0)
      )}
    >
      <div className="w-12 h-12 lg:w-16 lg:h-16  text-lg flex-shrink-0 outline outline-white outline-4 rounded-full relative justify-center flex items-center">
        <div className="absolute z-20 w-6 h-6 rounded-full bg-red-500 bottom-0 translate-y-3">
          <p className="flex h-full items-center justify-center text-sm font-bold text-white">
            {score.rank}
          </p>
        </div>
        <Image
          src={score.image}
          height={1024}
          width={1024}
          fill
          aria-label={score.team}
          className="object-contain h-full w-full overflow-hidden rounded-full"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center">
          <p className="uppercase text-xl font-bold text-white text-nowrap">
            {score.team}
          </p>
          {score.participant && (
            <p className="text-md text-white tracking-wider font-semibold ">
              {toCapitalCase(score.participant)}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <p className="bg-white rounded-full text-lg md:text-xl px-4 tracking-wider font-bold text-red-700">
            {type == "team" && score.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
