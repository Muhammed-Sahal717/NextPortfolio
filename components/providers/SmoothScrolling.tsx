"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function SmoothScrolling({ children }: { children?: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.035, // Lowered from 0.05 for a more floaty, buttery feel
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: true, // Unifies touch and wheel momentum
      }}
    >
      {children}
    </ReactLenis>
  );
}
