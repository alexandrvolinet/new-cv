'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/utils/gsap';
import { ScrollTrigger } from '@/utils/gsap';

type StickyPinProps = {
  children: React.ReactNode;
}

export default function StickyPin({ children } : StickyPinProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".pinned", {
        scrollTrigger: {
          trigger: ".pinned",
          start: "top top",
          end: "+=4000",
          pin: true,
          pinSpacing: false,
          markers: true
        }
      });

      ScrollTrigger.refresh();
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} ref={ref}>
      <div className="pinned">
        {children}
      </div>
    </div>
  );
}