"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect } from "react";
import { HERO_CAROUSEL } from "~/constants";
import { Image } from "../Image";
import { DotButton, useDotButton } from "../ui/EmblaCarouselDotButton";

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

  const HEROCAROUSEL = HERO_CAROUSEL.sort(
    (a, b) => b.startTime.getTime() - a.startTime.getTime()
  );

  return (
    <section className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {HEROCAROUSEL.map(({ startTime, endTime, event, url }, index) => {
            const now = new Date();

            let status = "Upcoming";
            if (now >= startTime && now <= endTime) {
              status = "Happening Now";
            } else if (now > endTime) {
              status = "Ended";
            }

            return (
              <div className="relative flex-[0_0_100%] min-w-0" key={index}>
                <div className="h-screen text-4xl relative text-white overflow-hidden select-none">
                  <Image
                    src={url}
                    width={2048}
                    height={2048}
                    alt={event}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute inset-0 padding-container py-24 flex flex-col justify-end space-y-4 z-10">
                    <p className="text-[1.5rem] uppercase">{status}</p>
                    <h1 className="tracking-wider text-start">{event}</h1>
                    <div className="transform flex  ">
                      {scrollSnaps.map((_, index) => (
                        <DotButton
                          key={index}
                          onClick={() => onDotButtonClick(index)}
                          isSelected={index === selectedIndex}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
