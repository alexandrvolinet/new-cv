"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionContainer from "@/components/ui/SectionContainer";
import { lenis } from "@/lib/animations/LenisScroll";
import TechSkills from "./TechSkills";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(".tech-slide")
    );
    const last = slides.at(-1)!;

    let isSnapping = false;
    let isFirstSlideDelay = true;

    const delayTimeout = setTimeout(() => {
      isFirstSlideDelay = false;
    }, 1500);

    const getTops = () => slides.map((s) => s.offsetTop);
    const tops = getTops();

    const snapTo = (y: number) => {
      if (isSnapping) return;
      isSnapping = true;
      gsap.to(window, {
        scrollTo: y,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          isSnapping = false;
        },
      });
    };

    const handleScroll = (dir: number) => {
      if (isSnapping || isFirstSlideDelay) return;

      const scroll = Math.round(window.scrollY);
      const bottomLimit = last.offsetTop + last.offsetHeight - window.innerHeight;
      const topLimit = tops[0];

      if ((dir > 0 && scroll >= bottomLimit) || (dir < 0 && scroll <= topLimit)) {
        lenis?.start();
        cleanup();
        return;
      }

      const index = tops.findIndex((t) => scroll + (dir > 0 ? 1 : -1) < t);
      const targetIndex = Math.min(
        Math.max((index === -1 ? tops.length : index) + dir - (dir > 0 ? 1 : 0), 0),
        tops.length - 1
      );
      const target = tops[targetIndex];

      if (target !== scroll) snapTo(target);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => (touchStartY = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 20) {
        e.preventDefault();
        handleScroll(deltaY > 0 ? 1 : -1);
      }
    };

    const addEvents = () => {
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    };

    const cleanup = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => last.offsetTop + last.offsetHeight,
      onEnter: () => {
        lenis?.stop();
        addEvents();
      },
      onLeave: () => {
        lenis?.start();
        cleanup();
      },
      onEnterBack: () => {
        lenis?.stop();
        addEvents();
      },
      onLeaveBack: () => {
        lenis?.start();
        cleanup();
      },
    });

    slides.forEach((slide) => {
      const left = slide.querySelector(".left-content");
      const right = slide.querySelector(".right-content")?.children;
      const rightArray = right ? Array.from(right) : null;

      if (left) gsap.set(left, { opacity: 0, x: -50, y: 50 });
      if (rightArray) gsap.set(rightArray, { opacity: 0, x: 50, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: "top 70%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(left, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }).to(
        rightArray,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });

    return () => {
      cleanup();
      st.kill();
      clearTimeout(delayTimeout);
      ScrollTrigger.getAll().forEach((tr) => tr.kill());
    };
  }, []);

  return (
    <SectionContainer>
      <div ref={containerRef}>
        <div className="tech-slide w-full py-4 md:py-12 lg:py-32">
          <div className="grid grid-cols-2 gap-10">
            <div className="left-content opacity-0">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Specialization
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Front-End <br /> Development
              </h2>
            </div>
            <div className="right-content flex flex-col items-end mt-12 gap-4">
              <TechSkills>React</TechSkills>
              <TechSkills>Next.js</TechSkills>
              <TechSkills>TypeScript</TechSkills>
              <TechSkills>Tailwind</TechSkills>
              <TechSkills>SCSS</TechSkills>
            </div>
          </div>
        </div>

        <div className="tech-slide w-full py-4 md:py-12 lg:py-32">
          <div className="grid grid-cols-2 gap-10">
            <div className="left-content opacity-0">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Specialization
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Back-End <br /> Integration
              </h2>
            </div>
            <div className="right-content flex flex-col items-end mt-12 gap-4">
              <TechSkills>Node.js</TechSkills>
              <TechSkills>Nest.js</TechSkills>
              <TechSkills>PostgreSQL</TechSkills>
              <TechSkills>MongoDB</TechSkills>
            </div>
          </div>
        </div>

        <div className="tech-slide w-full py-4 md:py-12 lg:py-32">
          <div className="grid grid-cols-2 gap-10">
            <div className="left-content opacity-0">
              <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-gray-400 mb-6 block">
                Workflow
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Development <br /> Workflow
              </h2>
            </div>
            <div className="right-content flex flex-col items-end mt-12 gap-4">
              <TechSkills>Git</TechSkills>
              <TechSkills>Docker</TechSkills>
              <TechSkills>CI/CD</TechSkills>
              <TechSkills>Figma</TechSkills>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
