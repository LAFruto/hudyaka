import { Link } from "@remix-run/react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { getEventStatus } from "~/lib/util";
import { ActivityRecord } from "~/types";
import { Image } from "../Image";
import Arrow from "../icons/Arrow";
import { DotButton, useDotButton } from "../ui/EmblaCarouselDotButton";
import { CountdownTimer } from "../CountdownTimer";
import { useCurrentTime } from "~/hooks/useCurrentTime";

const OPTIONS: EmblaOptionsType = { loop: true };
const AUTOPLAY_DELAY = 5000;

interface HeroCarouselProps {
  activities: ActivityRecord[];
}

const HeroCarousel = ({ activities }: HeroCarouselProps) => {
  const currentTime = useCurrentTime();

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
    Fade(),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const eventWithStatus = activities.map((event) => ({
    event,
    status: getEventStatus(
      new Date(event.startDate),
      new Date(event.endDate),
      event.isScored
    ),
  }));

  const ongoing = eventWithStatus.filter(
    (item) => item.status.type === "ongoing"
  );
  const countdown = eventWithStatus.filter(
    (item) => item.status.type === "countdown"
  );
  const finished = eventWithStatus
    .filter((item) => item.status.type === "finished")
    .slice(-2);

  const HERO_CAROUSEL = [...ongoing, ...countdown, ...finished];

  return (
    <div className="relative overflow-hidden h-full">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex touch-pan-y h-full">
          {HERO_CAROUSEL.map(({ event, status }, index) => {
            return (
              <Link
                to={event.url}
                className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden rounded-3xl group"
                key={index}
              >
                <div className="text-lg md:text-4xl relative text-white select-none h-full overflow-hidden">
                  <Image
                    src={event.banner}
                    height={1024}
                    width={1024}
                    fill
                    aria-label={event.name}
                    className="object-contain h-full w-full overflow-hidden brightness-90 bg-slate-900"
                  />
                  <div className="flex justify-end p-6">
                    {scrollSnaps.map((_, index) => (
                      <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        isSelected={index === selectedIndex}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 inline-flex justify-end p-6">
                    <div className="self-end flex-col lg:flex-row flex justify-between w-full">
                      <div className="w-1/3 rounded-lg self-start lg:self-end cursor-pointer group ">
                        <Image
                          src={event.image}
                          alt="Event logo"
                          width={1024}
                          height={1024}
                          className="object-contain overflow-hidden"
                        />
                      </div>
                      <div className="self-start lg:self-end  ease-in-out duration-300 transition-all">
                        {status.type === "ongoing" ? (
                          <div className="mt-2 inline-flex w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5">
                            <div className="h-6 md:h-10 overflow-hidden mr-2">
                              <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                                <p className="text-lg md:text-4xl font-bold leading-4  md:leading-9 ">
                                  {status.message}
                                </p>
                                <p className="text-lg md:text-4xl font-bold md:leading-10 py-2">
                                  {status.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : status.type === "countdown" ? (
                          <div className="mt-2 inline-flex w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5">
                            <div className="h-6 md:h-10 overflow-hidden mr-2">
                              <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                                <div className="text-lg md:text-4xl font-bold ">
                                  <CountdownTimer
                                    timeUntilStart={status.timeUntilStart}
                                    currentTime={currentTime}
                                    className="leading-4 md:leading-9"
                                  />
                                </div>
                                <div className="text-lg md:text-4xl font-bold ">
                                  <CountdownTimer
                                    timeUntilStart={status.timeUntilStart}
                                    currentTime={currentTime}
                                    className="md:leading-10 py-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 inline-flex w-full justify-center rounded-lg items-center gap-2 text-white lg:px-4 py-1.5">
                            <div className="h-5 md:h-10 overflow-hidden mr-2">
                              <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                                <p className="text-lg md:text-4xl font-bold">
                                  View Results
                                </p>
                                <p className="text-lg md:text-4xl font-bold">
                                  View Results
                                </p>
                              </div>
                            </div>
                            <div className="w-[30px] h-[30px] -rotate-45 group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">
                              <Arrow />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
