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
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        <defs>
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />    {/* Purple */}
            <stop offset="50%" stopColor="#ec4899" />   {/* Pink */}
            <stop offset="100%" stopColor="#facc15" />  {/* Yellow */}
          </linearGradient>
        </defs>

        {/* Animated Container */}
        <g 
          className={`transition-all duration-700 origin-center ${
            status === 'loading' ? 'animate-pulse scale-110' :
            status === 'error' ? 'animate-[pulse_0.5s_infinite] scale-95 opacity-80 grayscale' :
            status === 'sad' ? 'opacity-50 scale-95 grayscale' :
            'animate-[float_6s_ease-in-out_infinite]'
          }`}
          style={{
            animationName: status === 'idle' ? 'float' : 'none'
          }}
        >
          {/* Chat Bubble Outline */}
          <path
            d="M 25 15 
               h 50 
               a 15 15 0 0 1 15 15 
               v 30 
               a 15 15 0 0 1 -15 15 
               h -35 
               l -10 12 
               v -12 
               h -5 
               a 15 15 0 0 1 -15 -15 
               v -30 
               a 15 15 0 0 1 15 -15 
               z"
            fill="none"
            stroke="url(#ai-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Primary Sparkle */}
          <path
            d="M 45 35 C 45 46.25, 41.25 50, 30 50 C 41.25 50, 45 53.75, 45 65 C 45 53.75, 48.75 50, 60 50 C 48.75 50, 45 46.25, 45 35 Z"
            fill="url(#ai-gradient)"
            className={status === 'loading' ? 'animate-spin origin-[45px_50px]' : ''}
          />

          {/* Secondary Tiny Sparkle */}
          <path
            d="M 65 27 C 65 33, 63 35, 57 35 C 63 35, 65 37, 65 43 C 65 37, 67 35, 73 35 C 67 35, 65 33, 65 27 Z"
            fill="url(#ai-gradient)"
            className="animate-pulse origin-[65px_35px]"
          />
        </g>
        
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
          `}
        </style>
      </svg>
    </div>
  );
}
