import { EmblaCarouselType } from "embla-carousel";
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi
        .off("reInit", onInit)
        .off("reInit", onSelect)
        .off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button"> & {
  isSelected: boolean;
};

export const DotButton: React.FC<PropType> = (props) => {
  const { isSelected, ...restProps } = props;
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && progressRef.current) {
      progressRef.current.style.animation = "none";
      void progressRef.current.offsetWidth;
      progressRef.current.style.animation = "progress 5s linear";
    }
  }, [isSelected]);

  return (
    <button
      type="button"
      className={`relative h-3 mx-1 rounded-full transition-all duration-300 ease-out ${
        isSelected ? "w-28 bg-white/30" : "w-3 bg-white/50 hover:bg-white/75"
      }`}
      {...restProps}
    >
      {isSelected && (
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: "20%" }}
          role="progressbar"
          aria-valuenow={20}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      )}
    </button>
  );
};
