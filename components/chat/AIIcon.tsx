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
        className="w-full h-full drop-shadow-lg overflow-visible"
      >
        <defs>
          {/* Head Body Gradient */}
          <linearGradient id="robotHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Metallic Border Gradient */}
          <linearGradient id="robotBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          {/* Visor Glass Gradient */}
          <linearGradient id="visorGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          {/* Visor Reflection Sheen */}
          <linearGradient id="visorReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Eye Glow Gradient */}
          <radialGradient id="eyeGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="50%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>

          {/* Error Eye Glow Gradient */}
          <radialGradient id="errorEyeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="60%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </radialGradient>

          {/* Antenna Orb Glow */}
          <radialGradient id="antennaOrbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>
        </defs>

        <g
          className={`transition-transform duration-500 origin-center ${
            isLoading
              ? "animate-pulse scale-105"
              : isError
                ? "animate-[bounce_0.6s_infinite] scale-95"
                : isSad
                  ? "scale-95 opacity-80"
                  : status === "static"
                    ? ""
                    : "animate-[prettyRobotFloat_5s_ease-in-out_infinite]"
          }`}
        >
          {/* Antenna Stem */}
          <rect x="47.5" y="10" width="5" height="12" rx="2.5" fill="url(#robotHeadGrad)" />

          {/* Antenna Tip Orb */}
          <circle
            cx="50"
            cy="9"
            r="6"
            fill={isError ? "#ef4444" : "url(#antennaOrbGlow)"}
            className={isLoading ? "animate-ping origin-center" : "animate-[pulse_2s_infinite]"}
          />
          <circle cx="50" cy="9" r="6" fill={isError ? "#ef4444" : "url(#antennaOrbGlow)"} />

          {/* Side Ears / Headphone Capsules */}
          {/* Left Ear */}
          <g>
            <rect x="10" y="40" width="8" height="20" rx="4" fill="url(#robotHeadGrad)" />
            <circle cx="14" cy="50" r="2.5" fill={isError ? "#f87171" : "#4ade80"} className="animate-pulse" />
          </g>
          {/* Right Ear */}
          <g>
            <rect x="82" y="40" width="8" height="20" rx="4" fill="url(#robotHeadGrad)" />
            <circle cx="86" cy="50" r="2.5" fill={isError ? "#f87171" : "#4ade80"} className="animate-pulse" />
          </g>

          {/* Main Robot Head */}
          <rect
            x="16"
            y="20"
            width="68"
            height="60"
            rx="22"
            fill="url(#robotHeadGrad)"
            stroke="url(#robotBorderGrad)"
            strokeWidth="2"
          />

          {/* Visor Screen Outer Rim */}
          <rect x="22" y="28" width="56" height="44" rx="16" fill="#09090b" />

          {/* Visor Screen Glass */}
          <rect x="23.5" y="29.5" width="53" height="41" rx="14.5" fill="url(#visorGlassGrad)" />

          {/* Visor Reflection Sheen */}
          <rect x="23.5" y="29.5" width="53" height="41" rx="14.5" fill="url(#visorReflect)" />

          {/* Cheek Blushes */}
          {!isError && !isSad && (
            <>
              <ellipse cx="32" cy="58" rx="4" ry="2" fill="#4ade80" opacity="0.3" />
              <ellipse cx="68" cy="58" rx="4" ry="2" fill="#4ade80" opacity="0.3" />
            </>
          )}

          {/* Eyes & Expressions */}
          {isSad ? (
            /* Sad Drooping Arc Eyes */
            <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M 33 48 Q 39 42 45 48" />
              <path d="M 55 48 Q 61 42 67 48" />
            </g>
          ) : isError ? (
            /* Error Warning X Eyes */
            <g stroke="#f87171" strokeWidth="3" strokeLinecap="round">
              <line x1="33" y1="41" x2="43" y2="51" />
              <line x1="43" y1="41" x2="33" y2="51" />
              <line x1="57" y1="41" x2="67" y2="51" />
              <line x1="67" y1="41" x2="57" y2="51" />
            </g>
          ) : (
            /* Happy Cute Glowing Eyes */
            <g>
              {/* Left Eye */}
              <circle cx="38" cy="46" r="7.5" fill="url(#eyeGlowGrad)" />
              <circle cx="35.5" cy="43.5" r="2.5" fill="#ffffff" />
              <circle cx="40.5" cy="48.5" r="1.2" fill="#ffffff" opacity="0.8" />

              {/* Right Eye */}
              <circle cx="62" cy="46" r="7.5" fill="url(#eyeGlowGrad)" />
              <circle cx="59.5" cy="43.5" r="2.5" fill="#ffffff" />
              <circle cx="64.5" cy="48.5" r="1.2" fill="#ffffff" opacity="0.8" />
            </g>
          )}

          {/* Mouth / Smile */}
          {!isError && !isSad && (
            <path
              d="M 44 57 Q 50 62 56 57"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {isSad && (
            <path
              d="M 45 61 Q 50 56 55 61"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Chin Base Notch */}
          <rect x="42" y="78" width="16" height="4" rx="2" fill="#166534" opacity="0.8" />
        </g>

        <style>
          {`
            @keyframes prettyRobotFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(1.5deg); }
            }
          `}
        </style>
      </svg>
    </div>
  );
}

