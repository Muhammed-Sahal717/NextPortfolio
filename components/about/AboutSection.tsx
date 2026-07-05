"use client";

import React from "react";
import AboutHeader from "./AboutHeader";
import AboutSummary from "./AboutSummary";
import AboutTechStack from "./AboutTechStack";
import AboutStats from "./AboutStats";

export default function AboutSection() {
  return (
    <section
      className="w-full bg-black text-white py-16 lg:py-24 transition-colors border-t border-dashed border-zinc-200 dark:border-zinc-800"
      id="about"
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16">
        {/* 1. HEADER */}
        <AboutHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          {/* Top Row: Summary (2 cols) + Tech Stack (1 col) */}
          <div className="md:col-span-2 bg-background">
            <AboutSummary />
          </div>
          
          <div className="md:col-span-2 lg:col-span-1 bg-background">
            <AboutTechStack />
          </div>

          {/* Bottom Row: Stats (3 items, taking 1 col each on lg, spreading on md) */}
          {/* On md:grid-cols-2, we need 3 items to fit nicely, so we can wrap them in a fragment and let the grid place them. */}
          <AboutStats />
          
          {/* Padding dummy cell for md screens since 2 + 1 + 3 = 6 items which fits perfectly in 2 cols (3 rows) and 3 cols (2 rows)! */}
          {/* Wait: Top row is (2 col) + (1 col if lg, or 2 col if md). 
              If md (2 cols):
              Summary takes 2 cols (row 1).
              Tech Stack takes 2 cols (row 2).
              Stats takes 3 cells. 3 cells in a 2 col grid leaves 1 empty cell. We need a padding cell. */}
          <div className="relative hidden md:block lg:hidden bg-background">
            <div className="absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-zinc-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
