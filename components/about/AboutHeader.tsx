"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 border-b border-zinc-800 pb-8">
      <div className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
        <ScrollReveal
          text="FULL STACK"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-2 transition-all"
        />
        <ScrollReveal
          text="DEVELOPER."
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-800 leading-[0.85]"
        />
      </div>
      <div className="max-w-md text-zinc-400 text-lg leading-relaxed">
        <p style={{ fontFamily: "var(--font-space-grotesk)" }}>
          I build high-performance websites. Merging{" "}
          <span className="text-lime-400 font-bold">clean code</span> with
          kinetic design. No bloat, just impact.
        </p>
      </div>
    </div>
  );
}
