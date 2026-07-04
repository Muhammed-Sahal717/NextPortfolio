"use client";

import LiquidNavbar from "@/components/navbar/LiquidNavbar";
// import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
// import HeroMarquee from "./HeroMarquee";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-background text-foreground font-sans">
      {/* NAVBAR */}
      <LiquidNavbar />

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full max-w-5xl mx-auto flex flex-col justify-center items-center px-6 lg:px-16 pt-32 pb-16 min-h-screen gap-10">
        {/* TOP: Hero Image (Avatar) */}
        <HeroImage />

        {/* BOTTOM: Text & Actions */}
        <HeroContent />
      </div>
    </section>
  );
}
