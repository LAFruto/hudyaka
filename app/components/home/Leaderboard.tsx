import { cn, getLeaderboardLayout } from "~/lib/util";
import { TempTeam } from "~/types";
import TeamScoreCard from "../TeamScoreCard";
import Medal from "../icons/Medal";
import ScoreMedal from "./ScoreMedal";

const teams: TempTeam[] = [
  {
    teamNumber: 1,
    teamName: "kadayawan",
    image: "/teams/kadayawan.png",
    score: 7,
  },
  {
    teamNumber: 3,
    teamName: "pintados",
    image: "/teams/pintados.png",
    score: 5,
  },
  {
    teamNumber: 4,
    teamName: "sinulog",
    image: "/teams/sinulog.png",
    score: 4,
  },
  {
    teamNumber: 5,
    teamName: "ati-atihan",
    image: "/teams/ati-atihan.png",
    score: 3,
  },
  {
    teamNumber: 6,
    teamName: "masskara",
    image: "/teams/masskara.png",
    score: 2,
  },
  {
    teamNumber: 7,
    teamName: "dinagyang",
    image: "/teams/dinagyang.png",
    score: 1,
  },
];

const Leaderboard = () => {
  const [podiumTeams, listTeams] = getLeaderboardLayout(teams);

  return (
    <section className="max-container padding-container flex flex-col w-full lg:grid lg:grid-cols-3 pt-20 pb-40 lg:pb-64">
      <div className="col-span-2 h-full mb-4">
        <div className="flex lg:inline-flex  justify-center lg:max-x-0 lg:w-auto lg:flex-shrink-0 gap-4 text-lg font-semibold bg-red-800 rounded-lg px-6 py-4">
          <div className="w-[40px] h-[40px]">
            <Medal />
          </div>
          <p className="text-4xl font-semibold text-white">Leaderboard</p>
        </div>
        <div
          className={cn(
            " mt-8 lg:mt-0 hidden lg:grid",
            podiumTeams.length !== 2
              ? "grid-cols-3  gap-x-[10%] md:px-[2%] lg:px-[10%]"
              : "grid-cols-2  gap-x-[10%] px-[24%]"
          )}
        >
          {podiumTeams.length === 1 && <div />}
          {podiumTeams.map((team, index) => (
            <div
              key={index}
              className={cn(
                index === 1 && podiumTeams.length === 3 && "order-first"
              )}
            >
              <div
                className={cn(
                  team.rank === 1
                    ? "mt-6"
                    : team.rank === 2
                    ? "mt-20"
                    : team.rank === 3 && "mt-28"
                )}
              >
                <ScoreMedal team={team} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        {[...podiumTeams, ...listTeams].map((team, index) => (
          <TeamScoreCard key={index} team={team} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 lg:mt-28 lg:flex">
        {listTeams.map((team, index) => (
          <TeamScoreCard key={index} team={team} />
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;
