"use client";
import React from "react";

export default function SadRobot() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 animate-sad-float z-10">
      {/* Optional: Fizzling sparks behind him indicating failure */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute top-[20%] left-[10%] w-1 h-1 bg-lime-500 rounded-full animate-fizzle [animation-delay:0.2s]"></span>
        <span className="absolute top-[50%] right-[10%] w-1.5 h-1.5 bg-lime-500 rounded-full animate-fizzle [animation-delay:0.5s]"></span>
        <span className="absolute bottom-[20%] left-[30%] w-1 h-1 bg-lime-500 rounded-full animate-fizzle [animation-delay:1s]"></span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        {/* HEAD CASE: Dark metal with a lime border */}
        <rect
          x="40"
          y="50"
          width="120"
          height="100"
          rx="20"
          className="fill-zinc-900 stroke-lime-500/50 stroke-2"
        />
        {/* Inner Screen Area */}
        <rect
          x="55"
          y="65"
          width="90"
          height="70"
          rx="10"
          className="fill-black"
        />

        {/* SAD EYES CONTAINER (Droops slightly) */}
        <g className="translate-y-2">
          {/* Left Eye (Dim Lime, Blinking) */}
          <rect
            x="70"
            y="85"
            width="20"
            height="12"
            rx="2"
            className="fill-lime-500/60 animate-sad-blink [animation-delay:0.2s]"
          />
          {/* Right Eye (Dim Lime, Blinking) */}
          <rect
            x="110"
            y="85"
            width="20"
            height="12"
            rx="2"
            className="fill-lime-500/60 animate-sad-blink"
          />

          {/* BROW RIDGE (Slanted down for sadness) */}
          <path
            d="M 65 80 L 90 85 M 135 80 L 110 85"
            stroke="#3f3f46"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* MOUTH (A simple frown line) */}
        <path
          d="M 80 120 Q 100 110 120 120"
          className="stroke-lime-500/40 stroke-2 fill-none"
          strokeLinecap="round"
        />

        {/* ANTENNA (Broken/Bent over) */}
        <path
          d="M 100 50 L 100 30 L 80 20"
          className="stroke-zinc-700 stroke-4 fill-none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dim light at end of antenna */}
        <circle cx="80" cy="20" r="4" className="fill-red-500/50" />
      </svg>
    </div>
  );
}
