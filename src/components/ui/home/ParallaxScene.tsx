"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import back from "@/assets/images/home/main/homeBack.png";
import mid from "@/assets/images/home/main/homeMid.png";
import front from "@/assets/images/home/main/homeFront.png";
import background from "@/assets/images/home/main/parallax.png";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      tl.to(".front-layer", {
        yPercent: -40,
        ease: "none",
      })
        .to(
          ".mid-layer",
          {
            yPercent: -25,
            ease: "none",
          },
          0
        )
        .to(
          ".back-layer",
          {
            yPercent: -10,
            ease: "none",
            scale: 0.9,
          },
          0
        )
        .to(
          ".bg-image",
          {
            ease: "none",
          },
          0
        )
        .to(
          ".text",
          {
            yPercent: -20,
            opacity: 0.5,
            ease: "none",
          },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 z-0 bg-image">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 z-10 back-layer">
        <Image src={back} alt="back" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 z-20 mid-layer">
        <Image src={mid} alt="mid" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 z-30 front-layer">
        <Image src={front} alt="front" fill className="object-cover" />
      </div>

      <div className="relative z-40 flex h-screen items-center justify-center">
        <h1 className="text text-6xl font-bold text-center px-4">
          Try to make something new
        </h1>
      </div>
    </section>
  );
}