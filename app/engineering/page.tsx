"use client";

import React from "react";
import { motion } from "framer-motion";
import LiquidNavbar from "@/components/navbar/LiquidNavbar";
import Footer from "@/components/footer/Footer";
import JourneyTimeline from "@/components/engineering/JourneyTimeline";
import CoreConcepts from "@/components/engineering/CoreConcepts";

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800 overflow-hidden relative">
      <LiquidNavbar />

      <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-16 pt-32 pb-32">
        <header className="mb-12 relative z-10 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight"
            >
              Journey
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              An overview of my engineering progression, from mastering core programming 
              fundamentals to building scalable, production-ready web applications.
            </p>
          </motion.div>
        </header>

        <JourneyTimeline />
        <CoreConcepts />
      </div>

      <Footer />
    </main>
  );
}
