import { MedalColor } from "./home/Leaderboard";
import SerratedBanner from "./ui/SerratedBanner";

interface ScoreMedalProps {
  color: MedalColor;
}

const ScoreMedal = ({ color }: ScoreMedalProps) => {
  return (
    <div className="flex flex-col relative">
      <div className="w-[100%] aspect-square max-w-[24rem] rounded-full border-4 border-blue-950 bg-white z-10 mx-auto"></div>
      <div className="absolute z-20 w-8 h-8 rounded-full bg-red-500 bottom-0 self-center translate-y-3">
        <p className="flex h-full items-center justify-center text-xl font-bold text-white">
          1
        </p>
      </div>
      <div className="relative w-full self-start ">
        <div className="absolute mt-9 sm:mt-12 z-10 flex flex-col items-center justify-center w-full h-full">
          <p className="font-bold text-lg sm:text-xl md:text-2xl text-white">
            Team 1
          </p>
          <p className="px-4 sm:mt-2 font-bold text-base sm:text-lg md:text-xl bg-white rounded-full text-red-800">
            500
          </p>
        </div>
        <div className="w-full p-2 absolute -translate-y-1/4">
          <SerratedBanner color={color} />
        </div>
      </div>
    </div>
  );
};

export default ScoreMedal;
