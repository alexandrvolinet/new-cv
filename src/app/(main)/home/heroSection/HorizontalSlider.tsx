'use client'

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Scrollbar, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { ReactNode, useEffect, useRef } from "react";
import "@/styles/globals.css"
import { StaticImageData } from "next/image"

type SlideBackground = string | StaticImageData | ReactNode;

export type Slide = {
  id: number | string;
  background?: StaticImageData | ReactNode;
  content?: ReactNode;
  label?: string;
  className?: string;
};

type HorizontalSliderProps = {
  slides: Slide[];
  scrollDelay?: number;
  onInit?: (swiper: SwiperClass) => void;
  onSlideChange?: (currentSlide: number, nextSlide: number) => void;
};

export const HorizontalSlider = ({
  slides,
  scrollDelay = 1000,
  onInit,
}: HorizontalSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    const container = swiper.el;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      isScrollingRef.current = true;

      if (e.deltaY > 0 && swiper.isEnd === false) {
        scrollTimeoutRef.current = setTimeout(() => {
          swiper.slideNext();
          isScrollingRef.current = false;
        }, scrollDelay);
      } else if (e.deltaY < 0 && swiper.isBeginning === false) {
        scrollTimeoutRef.current = setTimeout(() => {
          swiper.slidePrev();
          isScrollingRef.current = false;
        }, scrollDelay);
      } else {
        isScrollingRef.current = false;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [scrollDelay]);

  const renderBackground = (background: SlideBackground): ReactNode => {
    if (!background) return null;

    if (typeof background === "object" && "src" in background) {
      return (
        <div>
          <div
            className={`absolute w-full h-[100vh]`}
            style={{
              backgroundImage: `url(${background.src})`,
            }}
          />
        </div>
      );
    }
    return background;
  };

  return (
    <div>
      <Swiper
        modules={[Scrollbar, Navigation]}
        direction="horizontal"
        slidesPerView={1}
        allowTouchMove={false}
        // resistanceRatio={0}
        scrollbar={{ hide: false }}
        navigation={true}
        speed={1500}
        className="h-screen"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          onInit?.(swiper);
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`h-screen relative ${slide.className || ""}`}
            >
              {slide.background && renderBackground(slide.background)}
              {slide.content || (
                <div className="relative text-white text-4xl ">{slide.label}</div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
