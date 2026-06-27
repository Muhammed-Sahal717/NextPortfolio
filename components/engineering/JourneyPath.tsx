"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

// --- SVG CURVED PATH GENERATOR ---
const generatePath = (count: number) => {
  let d = "M 50 0 ";
  const step = 100 / count;
  for (let i = 0; i < count; i++) {
    const isLeftCard = i % 2 === 0;
    const startY = i * step;
    const endY = (i + 1) * step;

    // Control points to create the "S" curve
    const cpY1 = startY + step * 0.4;
    const cpY2 = endY - step * 0.4;

    // If card is on the left, curve towards the left (15%) so it passes behind the card.
    // If card is on the right, curve towards the right (85%).
    const cpX = isLeftCard ? 15 : 85;

    d += `C ${cpX} ${cpY1}, ${cpX} ${cpY2}, 50 ${endY} `;
  }
  return d;
};

export default function JourneyPath({ count }: { count: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const path = generatePath(count);

  return (
    <div
      ref={ref}
      className="absolute inset-0 hidden md:block pointer-events-none z-0"
    >
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Subtle Background Track */}
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated Glowing Track mapped to scroll */}
        <motion.path
          d={path}
          fill="none"
          stroke="var(--theme-lime-400)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  );
}
