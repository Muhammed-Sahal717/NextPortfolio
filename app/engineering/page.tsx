"use client";

import React from "react";
import { motion } from "framer-motion";
import LiquidNavbar from "@/components/navbar/LiquidNavbar";
import Footer from "@/components/footer/Footer";
import JourneyTimeline from "@/components/engineering/JourneyTimeline";
import CoreConcepts from "@/components/engineering/CoreConcepts";

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[var(--theme-lime-400)]/30 overflow-hidden relative">
      <LiquidNavbar />

      {/* Profile-style Static Glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, var(--theme-lime-400) 0%, transparent 60%)",
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-16 pt-32 pb-32">
        {/* Header */}
        <header className="mb-24 relative z-10 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600"
          >
            JOURNEY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The evolution of my technical thinking, from writing basic
            algorithms to architecting AI-driven platforms.
          </motion.p>
        </header>

        <JourneyTimeline />
        <CoreConcepts />
      </div>

      <Footer />
    </main>
  );
}
