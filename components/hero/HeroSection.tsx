"use client";

import LiquidNavbar from "@/components/navbar/LiquidNavbar";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroMarquee from "./HeroMarquee";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* NAVBAR */}
      <LiquidNavbar />

      {/* BACKGROUND ANIMATION & NOISE */}
      <HeroBackground />

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full max-w-[100rem] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center px-6 lg:px-16 pointer-events-none gap-8 pt-24 lg:pt-0 pb-16 lg:pb-0">
        {/* LEFT COLUMN: Text & Actions */}
        <HeroContent />

        {/* RIGHT COLUMN: Hero Image */}
        <HeroImage />
      </div>

      {/* INFINITE TECH MARQUEE */}
      <HeroMarquee />
    </section>
  );
}
