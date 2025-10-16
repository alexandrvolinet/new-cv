'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "@/utils/gsap";

interface ShaderBlurContainerProps {
    children: React.ReactNode
    className?: string
}

function ShaderBlurContainer({ children }: ShaderBlurContainerProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(heroRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 0%",
                    end: "top -20%",
                    scrub: true,
                },
            });
        });

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={heroRef} className="relative h-[500vh] w-full overflow-hidden supports-[backdrop-filter]:backdrop-blur-lg backdrop-brightness-75 opacity-0">
            {children}
        </div>
    )
}

export default ShaderBlurContainer