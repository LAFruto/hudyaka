import { Link } from "@remix-run/react";
import Arrow from "../Arrow";
import Ball from "../Ball";
import Festival from "../Festival";
import HeroCarousel from "../HeroCarousel";
import { Image } from "../Image";

const Hero = () => {
  return (
    <section className="max-container padding-container py-[4%] md:py-[2%] h-screen">
      <div className="grid-cols-1 grid md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
        <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 ">
          <div className="flex md:h-2/4">
            <div className="flex-shrink-0 lg:flex self-end hidden md:w-32 lg:w-40 h-auto">
              <Image
                src="/hudyak.svg"
                alt="Hudyaka logo"
                width={512}
                height={512}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-4 justify-end ">
              <span className="md:inline-flex text-white font-bold bg-blue-800 rounded-lg px-4 py-2 text-base sm:text-xl w-full flex justify-center text-center md:text-start md:w-auto text-nowrap">
                Mapúa MCM Foundation Week • 2024 - 2025
              </span>
              <div>
                <Image
                  src="/hudyaka_text.svg"
                  alt="Hudyaka logo"
                  width={1024}
                  height={1024}
                  className="object-contain overflow-hidden"
                />
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-red-500 h-[30vh] md:h-3/4">
            <HeroCarousel />
          </div>
        </div>
        <div className="grid grid-cols-2 h-full md:flex flex-col gap-4">
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
          <Link
            to="#events"
            className="flex flex-col justify-between gap-8  rounded-3xl bg-yellow-500 md:h-3/4 p-6 group cursor-pointer transition-all hover:opacity-90"
          >
            <div className="flex-shrink-0 max-w-[100px] p-3 rounded-2xl bg-white">
              <Festival color="yellow" />
            </div>
            <div className="flex text-white items-end justify-between">
              <div className="flex flex-col leading-tight">
                <div className="h-8 md:h-11 overflow-hidden">
                  <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                    <p className="text-2xl md:text-4xl font-bold h-8 md:h-11">
                      Events
                    </p>
                    <p className="text-2xl md:text-4xl font-bold h-8 md:h-11">
                      Events
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-base">View event results!</p>
              </div>
              <div className="w-[30px] h-[30px]">
                <Arrow className="group-hover:translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
