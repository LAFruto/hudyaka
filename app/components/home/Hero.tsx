import { ActivityRecord } from "~/types";
import { Image } from "../Image";
import EventsLink from "./EventsLink";
import HeroCarousel from "./HeroCarousel";
import SportsLink from "./SportsLink";

interface HeroProps {
  activities: ActivityRecord[];
}

const Hero = ({ activities }: HeroProps) => {
  return (
    <section className="max-container padding-container py-[4%] md:py-[2%] h-screen z-10">
      <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
        <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 ">
          <div className="flex md:h-2/5">
            <div className="flex-shrink-0 lg:flex self-end hidden md:w-32 lg:w-40 h-auto">
              <Image
                src="/hudyaka_figure.svg"
                alt="Hudyaka logo"
                width={512}
                height={512}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-4 justify-end ">
              <div>
                <Image
                  src="/hudyaka_text.svg"
                  alt="Hudyaka logo"
                  width={1024}
                  height={1024}
                  className="object-contain overflow-hidden"
                />
              </div>
              <span className="md:inline-flex text-white font-bold bg-blue-800 rounded-tr-3xl rounded-bl-3xl px-4 py-2 text-base sm:text-xl w-full flex justify-center text-center md:text-start md:w-auto text-nowrap">
                MAPÚA MCM FOUNDATION WEEK
              </span>
            </div>
          </div>
          <div className="rounded-3xl bg-red-500 md:h-3/5 h-[40vh] ">
            <HeroCarousel activities={activities} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex flex-col gap-4">
          <SportsLink className="md:h-2/5" />
          <EventsLink className="md:h-3/5" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
