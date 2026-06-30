"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function FooterHeader() {
  return (
    <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-12 md:pt-20">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12">
        {/* Left: Heading */}
        <div className="flex flex-col drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] z-20 w-full lg:w-auto text-center lg:text-left">
          <ScrollReveal
            text="LET'S BUILD"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.85] transition-all justify-center lg:justify-start !flex-nowrap"
          />
          <ScrollReveal
            text="THE FUTURE."
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-zinc-800 leading-[0.85] justify-center lg:justify-start !flex-nowrap"
          />
        </div>

        {/* Right: Free-floating Image */}
        <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] aspect-square z-10 lg:-mb-10 pointer-events-none mx-auto lg:mx-0">
          {/* Very subtle glow behind image to detach it from the deep black */}
          <div className="absolute inset-0 bg-lime-400/5 blur-[80px] rounded-full" />
          <Image
            src="/sahal.png"
            alt="Sahal"
            fill
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
