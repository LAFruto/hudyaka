import { Link } from "@remix-run/react";
import Arrow from "../icons/Arrow";
import Ball from "../icons/Ball";

const SportsLink = () => {
  return (
    <Link
      to="#sports"
      className="flex flex-col justify-between gap-8 rounded-3xl bg-red-600 h-full md:h-2/4 p-6 group cursor-pointer hover:opacity-90 transition-all"
    >
      <div className="flex-shrink-0 max-w-[100px] p-5 rounded-2xl bg-white">
        <Ball color="red" />
      </div>
      <div className="flex text-white items-end justify-between">
        <div className="flex flex-col leading-tight">
          <div className="h-8 md:h-11 overflow-hidden">
            <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
              <p className="text-2xl md:text-4xl font-bold h-8 md:h-11">
                Sports
              </p>
              <p className="text-2xl md:text-4xl font-bold h-8 md:h-11">
                Sports
              </p>
            </div>
          </div>
          <p className="text-xs md:text-base">View sports results!</p>
        </div>
        <div className="w-[30px] h-[30px]">
          <Arrow className="group-hover:translate-y-1 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default SportsLink;
