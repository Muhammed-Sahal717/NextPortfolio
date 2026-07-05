"use client";

import React from "react";

type AIIconProps = {
  status?: "idle" | "loading" | "error" | "sad" | "static";
  className?: string;
};

export default function AIIcon({ status = "idle", className = "" }: AIIconProps) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-full h-full drop-shadow-sm overflow-visible text-foreground"
        fill="none"
      >
        <g 
          className={`transition-all duration-700 origin-center ${
            status === 'loading' ? 'animate-pulse scale-110' :
            status === 'error' ? 'animate-[pulse_0.5s_infinite] scale-95 text-red-500' :
            status === 'sad' ? 'opacity-50 scale-95' :
            status === 'static' ? '' :
            'animate-[float_6s_ease-in-out_infinite]'
          }`}
          style={{
            animationName: status === 'idle' ? 'float' : 'none'
          }}
        >
          <path 
            d="M 384 128 H 200 A 64 64 0 0 0 200 256 H 312 A 64 64 0 0 1 312 384 H 128" 
            stroke="currentColor" 
            strokeWidth="72" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
        
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3%); }
            }
          `}
        </style>
      </svg>
    </div>
  );
}
