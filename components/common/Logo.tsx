import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`w-full h-full text-foreground ${className}`}
      fill="none"
    >
      <path 
        d="M 384 128 H 200 A 64 64 0 0 0 200 256 H 312 A 64 64 0 0 1 312 384 H 128" 
        stroke="currentColor" 
        strokeWidth="72" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
