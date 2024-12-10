import { attachRanks } from "~/lib/util";
import { Category } from "~/types";
import TeamScoreCard from "../TeamScoreCard";
import Medal from "../icons/Medal";

interface ActivityLeaderboardProps {
  category: Category;
}

const ActivityLeaderboard = ({ category }: ActivityLeaderboardProps) => {
  const teams = attachRanks(category.scores);

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
        {teams.map((team, index) => (
          <TeamScoreCard key={index} team={team} type="team" />
        ))}
      </div>
    </section>
  );
};

export default ActivityLeaderboard;
