"use client";
import React from "react";

export default function SadRobot() {
  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 z-10 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping [animation-duration:3s] [animation-delay:0.2s] opacity-60"></span>
        <span className="absolute top-[40%] right-[10%] w-1 h-1 bg-sky-300 rounded-full animate-ping [animation-duration:2s] [animation-delay:1.5s] opacity-40"></span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
      >
        <style>
          {`
            @keyframes drip {
              0% { transform: translateY(0) scale(0); opacity: 0; }
              15% { transform: translateY(5px) scale(1); opacity: 1; }
              70% { transform: translateY(30px) scale(0.8); opacity: 1; }
              100% { transform: translateY(40px) scale(0.2); opacity: 0; }
            }
            .drip-anim { 
              animation: drip 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1); 
              transform-origin: 75px 105px; 
            }
            @keyframes soft-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(8px); }
            }
            .float-anim { animation: soft-float 4s ease-in-out infinite; }
            @keyframes slow-blink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.05); }
            }
            .blink-anim { 
              animation: slow-blink 6s infinite; 
            }
          `}
        </style>

        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="float-anim">
          {/* ANTENNA (Droopy and cute) */}
          <path
            d="M 100 50 Q 100 20 70 25"
            fill="none"
            stroke="#71717a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="70"
            cy="25"
            r="7"
            fill="url(#glow)"
            className="animate-pulse"
          />
          <circle cx="70" cy="25" r="4" fill="#38bdf8" />

          {/* HEAD CASE: Round, chubby, cute */}
          <rect
            x="20"
            y="45"
            width="160"
            height="130"
            rx="65"
            fill="url(#bodyGrad)"
            stroke="#52525b"
            strokeWidth="3"
          />

          {/* INNER SCREEN (Glossy curved glass) */}
          <rect
            x="35"
            y="60"
            width="130"
            height="100"
            rx="50"
            fill="url(#screenGrad)"
            stroke="#27272a"
            strokeWidth="2"
          />

          {/* SCREEN REFLECTION */}
          <path
            d="M 45 70 C 80 60, 120 60, 155 70 C 150 85, 120 90, 100 90 C 80 90, 50 85, 45 70 Z"
            fill="#ffffff"
            opacity="0.05"
          />

          <g className="translate-y-2">
            {/* CHEEKS (Soft blushing glow) */}
            <ellipse
              cx="65"
              cy="110"
              rx="12"
              ry="6"
              fill="#38bdf8"
              opacity="0.25"
            />
            <ellipse
              cx="135"
              cy="110"
              rx="12"
              ry="6"
              fill="#38bdf8"
              opacity="0.25"
            />

            {/* SAD EYES CONTAINER (Blinking) */}
            <g className="blink-anim" style={{ transformOrigin: "100px 95px" }}>
              {/* Left Eye */}
              <g transform="translate(65, 90) rotate(15)">
                <ellipse cx="0" cy="0" rx="14" ry="22" fill="#38bdf8" />
                <circle cx="-3" cy="-6" r="5" fill="#ffffff" />
                <circle cx="4" cy="6" r="2.5" fill="#ffffff" />
              </g>

              {/* Right Eye */}
              <g transform="translate(135, 90) rotate(-15)">
                <ellipse cx="0" cy="0" rx="14" ry="22" fill="#38bdf8" />
                <circle cx="3" cy="-6" r="5" fill="#ffffff" />
                <circle cx="-4" cy="6" r="2.5" fill="#ffffff" />
              </g>
            </g>

            {/* MOUTH (Tiny cute wobble/frown) */}
            <path
              d="M 92 120 Q 100 114 108 120"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* TEAR DROP (Animated falling tear from left eye) */}
            <path
              d="M 75 105 C 75 105, 71 113, 71 117 A 4 4 0 0 0 79 117 C 79 113, 75 105, 75 105 Z"
              fill="#bae6fd"
              className="drip-anim"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
