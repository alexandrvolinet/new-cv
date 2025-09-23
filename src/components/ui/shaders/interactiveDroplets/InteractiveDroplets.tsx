"use client";

import React, { useEffect, useRef } from "react";
import Droplets from "./modules/Droplets";

export default function InteractiveDroplets() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const app = new Droplets(wrapperRef.current);
    app.init();
    app.setup();
    app.render();
  }, []);

  return (
    <div
      id="webgl"
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
