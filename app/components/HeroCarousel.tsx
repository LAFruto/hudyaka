"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect } from "react";
import { EVENTS_CAROUSEL } from "~/constants";
import { DotButton, useDotButton } from "./ui/EmblaCarouselDotButton";
import { Image } from "./Image";
import Arrow from "./Arrow";

const OPTIONS: EmblaOptionsType = { loop: true };
const AUTOPLAY_DELAY = 5000;

const HeroCarousel: React.FC = () => {
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

  const HERO_CAROUSEL = EVENTS_CAROUSEL.sort(
    (a, b) => b.startTime.getTime() - a.startTime.getTime()
  );

  return (
    <div className="relative overflow-hidden h-full">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex touch-pan-y h-full">
          {HERO_CAROUSEL.map(
            ({ startTime, endTime, event, url, image }, index) => {
              const now = new Date();

              let status = "Upcoming";
              if (now >= startTime && now <= endTime) {
                status = "Happening Now";
              } else if (now > endTime) {
                status = "View Results";
              }

              return (
                <div
                  className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden rounded-3xl"
                  key={index}
                >
                  <div className="text-4xl relative text-white select-none h-full overflow-hidden">
                    <Image
                      src={image}
                      height={1024}
                      width={1024}
                      fill
                      aria-label="API"
                      className="object-contain h-full w-full overflow-hidden rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="flex justify-end p-6">
                      {scrollSnaps.map((_, index) => (
                        <DotButton
                          key={index}
                          onClick={() => onDotButtonClick(index)}
                          isSelected={index === selectedIndex}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 ">
                      <div className="relative   flex md:flex-col items-end md:items-start justify-between  md:justify-end gap-2 group cursor-pointer">
                        <div className="w-1/4">
                          <Image
                            src="/event.png"
                            alt="Event logo"
                            width={1024}
                            height={1024}
                            className="object-contain overflow-hidden"
                          />
                        </div>
                        <p className="inline-flex text-base rounded-lg items-center gap-2">
                          <div className="h-5 md:h-6 overflow-hidden mr-2">
                            <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                              <p className="text-base h-5 md:h-6">
                                View Results
                              </p>
                              <p className="text-base h-5 md:h-6">
                                View Results
                              </p>
                            </div>
                          </div>
                          <div className="w-3 h-3 -rotate-45 group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out">
                            <Arrow />
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
