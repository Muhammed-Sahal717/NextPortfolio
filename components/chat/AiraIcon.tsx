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
        className="w-full h-full drop-shadow-xl"
      >
        <style>
          {`
            @keyframes float-idle {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-12px) rotate(3deg); }
              50% { transform: translateY(-4px) rotate(-1deg); }
              75% { transform: translateY(-10px) rotate(-3deg); }
            }
            .aira-idle { animation: float-idle 4s ease-in-out infinite; transform-origin: 100px 120px; }
            
            @keyframes float-sad {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(8px) rotate(-2deg); }
            }
            .aira-sad { animation: float-sad 3s ease-in-out infinite; transform-origin: 100px 120px; }

            @keyframes bounce-loading {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
            .aira-loading { animation: bounce-loading 1.5s ease-in-out infinite; transform-origin: 100px 120px; }
            
            @keyframes shadow-scale {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              25% { transform: scale(0.7); opacity: 0.15; }
              50% { transform: scale(0.9); opacity: 0.25; }
              75% { transform: scale(0.75); opacity: 0.15; }
            }
            .shadow-anim { animation: shadow-scale 4s ease-in-out infinite; transform-origin: 100px 185px; }

            @keyframes shadow-loading {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(0.6); opacity: 0.1; }
            }
            .shadow-loading-anim { animation: shadow-loading 1.5s ease-in-out infinite; transform-origin: 100px 185px; }
            
            @keyframes drip {
              0% { transform: translateY(0) scale(0); opacity: 0; }
              15% { transform: translateY(5px) scale(1); opacity: 1; }
              70% { transform: translateY(30px) scale(0.8); opacity: 1; }
              100% { transform: translateY(40px) scale(0.2); opacity: 0; }
            }
            .drip-anim { animation: drip 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1); transform-origin: 75px 105px; }
            
            @keyframes quick-blink {
              0%, 92%, 96%, 100% { transform: scaleY(1); }
              94%, 98% { transform: scaleY(0.1); }
            }
            .blink-anim { animation: quick-blink 5s infinite; transform-origin: 100px 100px; }

            @keyframes spin-eyes {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .loading-spin-left { animation: spin-eyes 1.5s linear infinite; transform-origin: 75px 100px; }
            .loading-spin-right { animation: spin-eyes 1.5s linear infinite; transform-origin: 125px 100px; }

            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-4px) rotate(-2deg); }
              75% { transform: translateX(4px) rotate(2deg); }
            }
            .error-shake { animation: shake 0.4s ease-in-out infinite; transform-origin: 100px 100px; }
            
            @keyframes ear-pulse {
              0%, 100% { fill: #22d3ee; opacity: 1; }
              50% { fill: #0891b2; opacity: 0.5; }
            }
            .ear-pulse-anim { animation: ear-pulse 2s infinite; }
          `}
        </style>
        
        <defs>
          <radialGradient id="idleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="errorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sadGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="loadingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" /> 
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d4d4d8" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>

        {/* Glow Layer */}
        {status === "idle" && <circle cx="100" cy="100" r="95" fill="url(#idleGlow)" />}
        {status === "error" && <circle cx="100" cy="100" r="100" fill="url(#errorGlow)" className="error-shake" />}
        {status === "sad" && <circle cx="100" cy="100" r="95" fill="url(#sadGlow)" />}
        {status === "loading" && <circle cx="100" cy="100" r="95" fill="url(#loadingGlow)" className="animate-pulse" />}

        {/* Floor Shadow */}
        {status === "idle" && <ellipse cx="100" cy="192" rx="45" ry="8" className="fill-black dark:fill-white shadow-anim" />}
        {status === "error" && <ellipse cx="100" cy="192" rx="45" ry="8" className="fill-black dark:fill-white opacity-30 error-shake" />}
        {status === "sad" && <ellipse cx="100" cy="192" rx="45" ry="8" className="fill-black dark:fill-white opacity-30" />}
        {status === "loading" && <ellipse cx="100" cy="192" rx="45" ry="8" className="fill-black dark:fill-white shadow-loading-anim" />}

        {/* Main Character Body container */}
        <g className={status === "error" ? "error-shake" : status === "idle" ? "aira-idle" : status === "sad" ? "aira-sad" : "aira-loading"}>
          
          {/* ANTENNA */}
          <path
            d="M 100 55 L 100 20"
            fill="none"
            stroke="#a1a1aa"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle 
            cx="100" 
            cy="20" 
            r="8" 
            fill={status === "error" ? "#f43f5e" : status === "loading" ? "#a855f7" : status === "sad" ? "#60a5fa" : "#22d3ee"} 
            className={status === "error" ? "animate-ping [animation-duration:0.5s]" : status === "loading" ? "animate-pulse" : ""}
          />
          <circle cx="100" cy="18" r="3" fill="#ffffff" opacity="0.8" />
          
          {/* EAR MUFFS */}
          <rect x="8" y="85" width="184" height="40" rx="15" fill="#71717a" />
          <rect x="4" y="92" width="192" height="26" rx="10" fill="#3f3f46" />
          {status === "idle" && (
            <>
              <circle cx="12" cy="105" r="3" fill="#22d3ee" className="ear-pulse-anim" />
              <circle cx="188" cy="105" r="3" fill="#22d3ee" className="ear-pulse-anim" />
            </>
          )}

          {/* HEAD CASE */}
          <rect
            x="20"
            y="55"
            width="160"
            height="110"
            rx="50"
            fill="url(#bodyGrad)"
            stroke="#a1a1aa"
            strokeWidth="2"
          />

          {/* INNER SCREEN */}
          <rect
            x="30"
            y="65"
            width="140"
            height="90"
            rx="40"
            fill="url(#screenGrad)"
            stroke="#27272a"
            strokeWidth="4"
          />

          {/* SCREEN REFLECTION */}
          <path
            d="M 40 75 C 80 65, 120 65, 160 75 C 150 95, 120 100, 100 100 C 80 100, 50 95, 40 75 Z"
            fill="#ffffff"
            opacity="0.08"
          />

          <g className={status === "idle" ? "blink-anim" : ""}>
             {/* EYES */}
             {status === "error" ? (
                /* ERROR EYES (X shapes) */
                <g stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M 65 90 L 85 110 M 85 90 L 65 110" />
                  <path d="M 115 90 L 135 110 M 135 90 L 115 110" />
                </g>
             ) : status === "sad" ? (
                /* SAD EYES */
                <g fill="#60a5fa" className="blink-anim">
                   <g transform="translate(75, 100) rotate(15)">
                     <ellipse cx="0" cy="0" rx="12" ry="16" />
                     <circle cx="-4" cy="-6" r="4" fill="#ffffff" />
                     <circle cx="3" cy="5" r="2" fill="#ffffff" opacity="0.8" />
                   </g>
                   <g transform="translate(125, 100) rotate(-15)">
                     <ellipse cx="0" cy="0" rx="12" ry="16" />
                     <circle cx="4" cy="-6" r="4" fill="#ffffff" />
                     <circle cx="-3" cy="5" r="2" fill="#ffffff" opacity="0.8" />
                   </g>
                </g>
             ) : status === "loading" ? (
                /* LOADING EYES (Spinning magical circles) */
                <g stroke="#a855f7" strokeWidth="6" strokeLinecap="round" fill="none">
                  <path d="M 63 100 A 12 12 0 0 1 87 100" className="loading-spin-left" />
                  <path d="M 113 100 A 12 12 0 0 1 137 100" className="loading-spin-right" />
                  {/* Little floating stars/dots */}
                  <circle cx="75" cy="100" r="3" fill="#d8b4fe" stroke="none" className="animate-pulse" />
                  <circle cx="125" cy="100" r="3" fill="#d8b4fe" stroke="none" className="animate-pulse" />
                </g>
             ) : (
                /* IDLE EYES (Cute big circles) */
                <g fill="#22d3ee">
                   {/* Left Eye */}
                   <circle cx="75" cy="98" r="14" />
                   <circle cx="70" cy="92" r="5" fill="#ffffff" />
                   <circle cx="82" cy="104" r="2" fill="#ffffff" opacity="0.9" />
                   
                   {/* Right Eye */}
                   <circle cx="125" cy="98" r="14" />
                   <circle cx="120" cy="92" r="5" fill="#ffffff" />
                   <circle cx="132" cy="104" r="2" fill="#ffffff" opacity="0.9" />
                </g>
             )}
          </g>

          {/* MOUTH & CHEEKS */}
          {status === "error" ? (
            /* Zigzag mouth */
            <path d="M 80 130 L 88 122 L 100 130 L 112 122 L 120 130" fill="none" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          ) : status === "sad" ? (
            /* Sad Mouth and Tear */
            <g>
              <ellipse cx="60" cy="115" rx="8" ry="4" fill="#60a5fa" opacity="0.3" />
              <ellipse cx="140" cy="115" rx="8" ry="4" fill="#60a5fa" opacity="0.3" />
              <path d="M 85 125 Q 100 115 115 125" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
              <path
                d="M 80 105 C 80 105, 76 113, 76 117 A 4 4 0 0 0 84 117 C 84 113, 80 105, 80 105 Z"
                fill="#bae6fd"
                className="drip-anim"
              />
            </g>
          ) : status === "loading" ? (
            /* Little 'O' mouth (Processing) */
            <circle cx="100" cy="125" r="5" fill="none" stroke="#a855f7" strokeWidth="4" />
          ) : (
            /* Cute Smile with rosy cheeks */
            <g>
              {/* Cheeks */}
              <ellipse cx="55" cy="112" rx="10" ry="5" fill="#f472b6" opacity="0.7" />
              <ellipse cx="145" cy="112" rx="10" ry="5" fill="#f472b6" opacity="0.7" />
              
              {/* Cute little mouth */}
              <path d="M 90 118 Q 100 128 110 118" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
