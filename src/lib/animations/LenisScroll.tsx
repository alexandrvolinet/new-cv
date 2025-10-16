"use client";
import { FC, useEffect, useRef } from "react";
import Lenis from "lenis";

export let lenis: Lenis | null = null;
type LenisScrollProps = {
  children: React.ReactNode;
};

const LenisScroll: FC<LenisScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
    });

    lenis = lenisRef.current;

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisScroll;
