import { Category, ScoreType } from "~/types";
import Medal from "../icons/Medal";
import ScoreCard from "../ScoreCard";

interface ActivityLeaderboardProps {
  category: Category;
  type?: ScoreType;
}

const ActivityLeaderboard = ({ category, type }: ActivityLeaderboardProps) => {
  return (
    <section className="max-container padding-container lg:px-[250px] flex flex-col w-full mt-4 mb-12 lg:mb-20">
      <div className="h-full mb-0">
        <div className="mb-4 flex justify-center items-center gap-4 text-lg font-semibold bg-red-800 rounded-lg px-6 py-2 lg:py-4">
          <div className="h-8 w-8 lg:w-16 lg:h-16">
            <Medal />
          </div>
          {category.category ? (
            <p className="text-xl lg:text-4xl font-semibold text-white">
              {category.category}
            </p>
          ) : (
            <p className="text-4xl font-semibold text-white">Leaderboard</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:gap-4">
        {category.scores.map((score, index) => (
          <ScoreCard key={index} score={score} type={type} />
        ))}
      </div>
    </section>
  );
};

export default ActivityLeaderboard;
