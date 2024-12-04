import { cn } from "~/lib/util";
import ScoreMedal from "../ScoreMedal";
import TeamScoreCard from "../TeamScoreCard";
import Medal from "../Medal";

export type MedalColor = "blue" | "red" | "yellow";

const Leaderboard = () => {
  return (
    <>
      <section className="max-container padding-container flex flex-col w-full lg:grid lg:grid-cols-3 py-24">
        <div className="col-span-2 h-full mb-64 lg:mb-0">
          <div className="inline-flex max-x-0 w-auto flex-shrink-0 gap-4 text-lg font-semibold bg-red-800 rounded-lg px-6 py-4">
            <div className="w-[40px] h-[40px]">
              <Medal />
            </div>
            <p className="text-4xl font-semibold text-white">Leaderboard</p>
          </div>
          <div className="grid grid-cols-3 gap-x-[8%] md:gap-x-[10%] md:px-[10%] mt-8 lg:mt-0">
            {[1, 2, 3].map((position, index) => (
              <div key={index}>
                <div className={cn(position % 2 === 1 && "py-10")} />
                <div key={position}>
                  <ScoreMedal
                    color={
                      position === 1
                        ? "blue"
                        : position === 2
                        ? "yellow"
                        : "red"
                    }
                    position={position.toString()}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TeamScoreCard />
          <TeamScoreCard />
          <TeamScoreCard />
          <TeamScoreCard />
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
