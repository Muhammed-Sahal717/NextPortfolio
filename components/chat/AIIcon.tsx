"use client";

import React from "react";

type AIIconProps = {
  status?: "idle" | "loading" | "error" | "sad" | "static";
  className?: string;
};

export default function AIIcon({
  status = "idle",
  className = "",
}: AIIconProps) {
  const isError = status === "error";
  const isSad = status === "sad";
  const isLoading = status === "loading";

  return (
    <div
      className={`relative flex items-center justify-center w-full h-full ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Main Metallic Body Gradient */}
          <linearGradient id="minBotBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Visor Glass Gradient */}
          <linearGradient id="minVisorBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          {/* Visor Glass Reflection */}
          <linearGradient id="minVisorGloss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Glowing Green Eye Gradient */}
          <radialGradient id="minEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="60%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>
        </defs>

        <g
          className={`transition-all duration-500 origin-center ${
            isLoading
              ? "animate-pulse scale-105"
              : isError
                ? "animate-[bounce_0.6s_infinite] scale-95"
                : isSad
                  ? "scale-95 opacity-75"
                  : status === "static"
                    ? ""
                    : "animate-[minimalBotFloat_4s_ease-in-out_infinite]"
          }`}
        >
          {/* Minimal Antenna */}
          <line x1="50" y1="18" x2="50" y2="10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <circle
            cx="50"
            cy="8"
            r="4"
            fill={isError ? "#ef4444" : "#bef264"}
            className={isLoading ? "animate-ping origin-center" : "animate-pulse"}
          />
          <circle cx="50" cy="8" r="4" fill={isError ? "#ef4444" : "#bef264"} />

          {/* Minimal Head Body */}
          <rect
            x="20"
            y="18"
            width="60"
            height="58"
            rx="24"
            fill="url(#minBotBody)"
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Minimal Side Ear Notches */}
          <rect x="15" y="38" width="5" height="18" rx="2.5" fill="#15803d" />
          <rect x="80" y="38" width="5" height="18" rx="2.5" fill="#15803d" />

          {/* Visor Screen */}
          <rect x="26" y="27" width="48" height="40" rx="16" fill="url(#minVisorBg)" />

          {/* Visor Glass Sheen */}
          <rect x="26" y="27" width="48" height="40" rx="16" fill="url(#minVisorGloss)" />

          {/* Visor Face / Eyes */}
          {isSad ? (
            /* Minimal Sad Eyes */
            <g stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 36 46 Q 41 42 46 46" />
              <path d="M 54 46 Q 59 42 64 46" />
            </g>
          ) : isError ? (
            /* Minimal Error Eyes */
            <g stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
              <line x1="36" y1="41" x2="44" y2="49" />
              <line x1="44" y1="41" x2="36" y2="49" />
              <line x1="56" y1="41" x2="64" y2="49" />
              <line x1="64" y1="41" x2="56" y2="49" />
            </g>
          ) : (
            /* Minimal Glowing Pill / Dual Eyes */
            <g>
              {/* Left Eye */}
              <circle cx="39" cy="45" r="6" fill="url(#minEyeGlow)" />
              <circle cx="37.5" cy="43.5" r="2" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="61" cy="45" r="6" fill="url(#minEyeGlow)" />
              <circle cx="59.5" cy="43.5" r="2" fill="#ffffff" />

              {/* Minimal Smile Arc */}
              <path
                d="M 44 55 Q 50 59 56 55"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
            </g>
          )}

          {/* Bottom Neck Ring */}
          <rect x="43" y="76" width="14" height="4" rx="2" fill="#15803d" opacity="0.8" />
        </g>

        <style>
          {`
            @keyframes minimalBotFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
          `}
        </style>
      </svg>
    </div>
  );
}


