"use client";
import React, { useRef, useEffect } from "react";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import SectionContainer from "@/components/ui/SectionContainer";

import { gsap } from "@/utils/gsap";
import { SplitText } from "gsap-trial/SplitText";

gsap.registerPlugin(SplitText);

function Hero() {
  const devTextRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const split = new SplitText(descriptionRef.current, {
        type: "lines",
        linesClass: "lineChild",
      });
      new SplitText(descriptionRef.current, { type: "lines", linesClass: "lineParent" });

      gsap.fromTo(buttonRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: devTextRef.current,
            start: "bottom 80%",
            toggleActions: "play none none reverse",
          }
        }
      )

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          devTextRef.current,
          { rotationY: 100, transformOrigin: "left center", opacity: 0 },
          {
            rotationY: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: devTextRef.current,
              start: "bottom 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: devTextRef.current,
            start: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        });

      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          devTextRef.current,
          { rotationY: 100, transformOrigin: "left center", opacity: 0 },
          {
            rotationY: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: devTextRef.current,
              start: "bottom 39%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.from(split.lines, {
          yPercent: 80,
          opacity: 0,
          stagger: 0.12,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: devTextRef.current,
            start: "bottom 80%",
            toggleActions: "play none none reverse",
          },
        });

      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (

    <SectionContainer className="grid grid-cols-1 md:grid-cols-2 justify-end">
      <div className="flex flex-col justify-end text-left space-y-6">
        <span
          ref={subtitleRef}
          className="uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base text-gray-400"
        >
          frontend
        </span>
        <h1
          ref={devTextRef}
          className="text-[clamp(2.5rem,10vw,7rem)] leading-[0.97] font-extrabold bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-sm"
        >
          Web <br /> Developer
        </h1>
      </div>
      <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right space-y-8">
        <p
          ref={descriptionRef}
          className="text-gray-200 text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed w-full md:w-11/12"
        >
          I&apos;m a <strong className="text-white">Web Developer</strong>{" "}
          based in Moldova. I specialize in building modern, responsive
          interfaces using
          <span
            className="text-pink-200 font-medium"
          >
            {" "}
            Next.js (React)
          </span>
          ,{" "}
          <span
            className="text-blue-400 font-medium"
          >
            {" "}
            TypeScript
          </span>
          ,{" "}
          <span
            className="text-green-400 font-medium"
          >
            {" "}
            GSAP
          </span>,{" "}
          <span
            className="text-blue-300 font-medium"
          >
            {" "}
            Tailwind CSS
          </span>{" "}
          and cutting-edge technologies. Clean code, intuitive UX and
          pixel-perfect design are my core focus.
        </p>
        <PrimaryButton ref={buttonRef} href="#projects" className="text-lg px-6 py-3">
          View My Work →
        </PrimaryButton>
      </div>
    </SectionContainer>
  );
}

export default Hero;