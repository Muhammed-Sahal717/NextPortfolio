"use client";

import React from "react";

type AIIconProps = {
  status: "idle" | "loading" | "error" | "sad";
  className?: string;
};

export default function AIIcon({ status, className = "" }: AIIconProps) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-2xl overflow-visible text-foreground"
        fill="currentColor"
      >
        {/* Animated Container */}
        <g 
          className={`transition-all duration-700 origin-center ${
            status === 'loading' ? 'animate-pulse scale-110' :
            status === 'error' ? 'animate-[pulse_0.5s_infinite] scale-95 opacity-80' :
            status === 'sad' ? 'opacity-50 scale-95' :
            'animate-[float_6s_ease-in-out_infinite]'
          }`}
          style={{
            animationName: status === 'idle' ? 'float' : 'none'
          }}
        >
          {/* Main Unified Body + Tail */}
          <path 
            d="M 35 20 
               h 30 
               a 25 25 0 0 1 25 25 
               a 25 25 0 0 1 -25 25 
               h -15 
               l 0 24 
               l -15 -24 
               a 25 25 0 0 1 -25 -25 
               a 25 25 0 0 1 25 -25 
               z" 
          />
          
          {/* Ears */}
          <circle cx="10" cy="45" r="7" />
          <circle cx="90" cy="45" r="7" />
          
          {/* Visor (Inner Cutout) */}
          <rect x="22" y="30" width="56" height="30" rx="15" className="text-background" fill="currentColor" />
          
          {/* Eyes */}
          <circle cx="36" cy="45" r="5.5" className="text-foreground" fill="currentColor" />
          <circle cx="64" cy="45" r="5.5" className="text-foreground" fill="currentColor" />
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
