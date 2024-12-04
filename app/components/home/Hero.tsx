import { Image } from "../Image";
import EventsLink from "./EventsLink";
import HeroCarousel from "./HeroCarousel";
import SportsLink from "./SportsLink";

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
          <SportsLink />
          <EventsLink />
        </div>
      </div>
    </section>
  );
};

export default Hero;
