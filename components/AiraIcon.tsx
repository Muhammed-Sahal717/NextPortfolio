"use client";

import React from "react";

type AiraIconProps = {
  status: "idle" | "loading" | "error" | "sad";
  className?: string;
};

export default function AiraIcon({ status, className = "" }: AiraIconProps) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
      >
        <style>
          {`
            @keyframes soft-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-12px) rotate(4deg); }
              50% { transform: translateY(0px) rotate(0deg); }
              75% { transform: translateY(-8px) rotate(-3deg); }
            }
            .aira-idle { animation: soft-float 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: 100px 120px; }
            
            @keyframes shadow-scale {
              0%, 50%, 100% { transform: scale(1); opacity: 0.3; }
              25% { transform: scale(0.6); opacity: 0.1; }
              75% { transform: scale(0.8); opacity: 0.15; }
            }
            .shadow-anim { animation: shadow-scale 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; transform-origin: 100px 185px; }
            
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
            
            @keyframes quick-blink {
              0%, 95%, 100% { transform: scaleY(1); }
              97.5% { transform: scaleY(0.1); }
            }
            .blink-anim { animation: quick-blink 4s infinite; transform-origin: 100px 80px; }

            @keyframes spin-eyes {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .loading-spin-left { animation: spin-eyes 1.5s linear infinite; transform-origin: 70px 80px; }
            .loading-spin-right { animation: spin-eyes 1.5s linear infinite; transform-origin: 130px 80px; }

            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-3px) rotate(-1deg); }
              75% { transform: translateX(3px) rotate(1deg); }
            }
            .error-shake { animation: shake 0.4s ease-in-out infinite; transform-origin: 100px 100px; }
          `}
        </style>
        
        {/* Glow behind bot depending on status */}
        <defs>
          <radialGradient id="idleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" /> 
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="errorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sadGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="loadingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Glow Layer */}
        {status === "idle" && <circle cx="100" cy="100" r="90" fill="url(#idleGlow)" />}
        {status === "error" && <circle cx="100" cy="100" r="95" fill="url(#errorGlow)" className="error-shake" />}
        {status === "sad" && <circle cx="100" cy="100" r="90" fill="url(#sadGlow)" />}
        {status === "loading" && <circle cx="100" cy="100" r="90" fill="url(#loadingGlow)" className="animate-pulse" />}

        {/* Floor Shadow */}
        {status === "idle" && <ellipse cx="100" cy="192" rx="45" ry="8" fill="#000000" className="shadow-anim" />}
        {status === "error" && <ellipse cx="100" cy="192" rx="45" ry="8" fill="#000000" opacity="0.3" className="error-shake" />}
        {(status === "sad" || status === "loading") && <ellipse cx="100" cy="192" rx="45" ry="8" fill="#000000" opacity="0.3" />}

        {/* Main Character Body container */}
        <g className={status === "error" ? "error-shake" : (status === "idle" || status === "sad") ? "aira-idle" : ""}>
          
          {/* ANTENNA (with status light) */}
          <path
            d="M 100 50 L 100 20"
            fill="none"
            stroke="#71717a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle 
            cx="100" 
            cy="20" 
            r="6" 
            fill={status === "error" ? "#ef4444" : status === "loading" ? "#eab308" : status === "sad" ? "#38bdf8" : "#84cc16"} 
            className={status === "error" ? "animate-ping [animation-duration:0.5s]" : status === "loading" ? "animate-pulse" : ""}
          />
          <circle cx="100" cy="20" r="3" fill="#ffffff" />
          
          {/* EAR MUFFS / SIDES */}
          <rect x="15" y="80" width="170" height="40" rx="10" fill="#71717a" />
          <rect x="10" y="85" width="180" height="30" rx="8" fill="#52525b" />

          {/* HEAD CASE */}
          <rect
            x="20"
            y="45"
            width="160"
            height="130"
            rx="45"
            fill="url(#bodyGrad)"
            stroke="#52525b"
            strokeWidth="3"
          />

          {/* INNER SCREEN */}
          <rect
            x="35"
            y="60"
            width="130"
            height="100"
            rx="30"
            fill="url(#screenGrad)"
            stroke="#27272a"
            strokeWidth="4"
          />

          {/* SCREEN REFLECTION */}
          <path
            d="M 45 70 C 80 60, 120 60, 155 70 C 150 85, 120 90, 100 90 C 80 90, 50 85, 45 70 Z"
            fill="#ffffff"
            opacity="0.06"
          />

          <g className={status === "idle" ? "blink-anim" : ""}>
             {/* EYES */}
             {status === "error" ? (
                /* ERROR EYES (> < shapes) */
                <g stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {/* Left > */}
                  <path d="M 60 70 L 80 80 L 60 90" />
                  {/* Right < */}
                  <path d="M 140 70 L 120 80 L 140 90" />
                </g>
             ) : status === "sad" ? (
                /* SAD EYES */
                <g fill="#38bdf8" className="blink-anim">
                   <g transform="translate(70, 80) rotate(15)">
                     <ellipse cx="0" cy="0" rx="10" ry="16" />
                     <circle cx="-3" cy="-6" r="4" fill="#ffffff" />
                     <circle cx="3" cy="4" r="2" fill="#ffffff" opacity="0.8" />
                   </g>
                   <g transform="translate(130, 80) rotate(-15)">
                     <ellipse cx="0" cy="0" rx="10" ry="16" />
                     <circle cx="3" cy="-6" r="4" fill="#ffffff" />
                     <circle cx="-3" cy="4" r="2" fill="#ffffff" opacity="0.8" />
                   </g>
                </g>
             ) : status === "loading" ? (
                /* LOADING EYES (Spinning half circles) */
                <g stroke="#eab308" strokeWidth="8" strokeLinecap="round" fill="none">
                  <path d="M 60 80 A 10 10 0 0 1 80 80" className="loading-spin-left" />
                  <path d="M 120 80 A 10 10 0 0 1 140 80" className="loading-spin-right" />
                </g>
             ) : (
                /* IDLE EYES (Cute oval) */
                <g fill="#a3e635">
                   {/* Left Eye */}
                   <ellipse cx="70" cy="80" rx="10" ry="16" />
                   <circle cx="67" cy="74" r="4" fill="#ffffff" />
                   <circle cx="73" cy="84" r="2" fill="#ffffff" opacity="0.8" />
                   
                   {/* Right Eye */}
                   <ellipse cx="130" cy="80" rx="10" ry="16" />
                   <circle cx="127" cy="74" r="4" fill="#ffffff" />
                   <circle cx="133" cy="84" r="2" fill="#ffffff" opacity="0.8" />
                </g>
             )}
          </g>

          {/* MOUTH & CHEEKS */}
          {status === "error" ? (
            /* Zigzag mouth */
            <path d="M 80 120 L 90 112 L 100 120 L 110 112 L 120 120" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          ) : status === "sad" ? (
            /* Sad Mouth and Tear */
            <g>
              <ellipse cx="55" cy="100" rx="8" ry="4" fill="#38bdf8" opacity="0.4" />
              <ellipse cx="145" cy="100" rx="8" ry="4" fill="#38bdf8" opacity="0.4" />
              <path d="M 85 118 Q 100 105 115 118" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <path
                d="M 75 95 C 75 95, 71 103, 71 107 A 4 4 0 0 0 79 107 C 79 103, 75 95, 75 95 Z"
                fill="#bae6fd"
                className="drip-anim"
              />
            </g>
          ) : status === "loading" ? (
            /* 'O' mouth (Processing) */
            <circle cx="100" cy="115" r="8" fill="none" stroke="#eab308" strokeWidth="4" />
          ) : (
            /* Smile mouth with rosy cheeks */
            <g>
              {/* Cheeks */}
              <ellipse cx="50" cy="98" rx="8" ry="4" fill="#a3e635" opacity="0.5" />
              <ellipse cx="150" cy="98" rx="8" ry="4" fill="#a3e635" opacity="0.5" />
              
              {/* Cute W / Big smile */}
              <path d="M 75 105 Q 100 135 125 105" fill="none" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
