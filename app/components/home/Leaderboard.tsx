import { cn } from "~/lib/util";
import ScoreMedal from "../ScoreMedal";
import TeamScoreCard from "../TeamScoreCard";
import Pattern from "../ui/Pattern";

export type MedalColor = "blue" | "red";

const Leaderboard = () => {
  return (
    <>
      <Pattern />
      <section className="padding-container flex flex-col lg:grid lg:grid-cols-3 py-14">
        <div className="col-span-2 h-full mb-64 lg:mb-0">
          <h1>Leaderboard</h1>
          <div className="grid grid-cols-3 gap-x-[8%] md:gap-x-[10%] md:px-[10%] mt-8 lg:mt-0">
            {[1, 2, 3].map((position, index) => (
              <div key={index}>
                <div className={cn(position % 2 === 1 && "py-10")} />
                <div key={position}>
                  <ScoreMedal color={position % 2 === 0 ? "red" : "blue"} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
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
