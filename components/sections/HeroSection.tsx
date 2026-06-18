"use client";

import dynamic from "next/dynamic";
import LiquidNavbar from "@/components/sections/LiquidNavbar";
import HeroContent from "@/components/sections/HeroContent";
import HeroAvatar from "@/components/sections/HeroAvatar";
import HeroMarquee from "@/components/sections/HeroMarquee";

// Heavy WebGL component — only load when needed
const LiquidEther = dynamic(() => import("@/components/visuals/LiquidEther"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

export default function HeroSection() {
  const liquidColors = ["#ccff00", "#39ff14"];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* NAVBAR */}
      <LiquidNavbar />

      {/* BACKGROUND ANIMATION — Optimized & Smooth */}
      <div className="absolute inset-0 z-0 opacity-60">
        <LiquidEther
          colors={liquidColors}
          isViscous={true}
          viscous={12}
          iterationsViscous={8}
          mouseForce={12}
          cursorSize={70}
          dt={0.016}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.0}
          resolution={0.25}
          isBounce={true}
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full max-w-[100rem] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center px-6 lg:px-16 pointer-events-none gap-8 pt-24 lg:pt-0 pb-16 lg:pb-0">
        <HeroContent />
        <HeroAvatar />
      </div>

      {/* INFINITE TECH MARQUEE */}
      <HeroMarquee />
    </section>
  );
}
