"use client";

import React from "react";
import AboutHeader from "./AboutHeader";
import AboutSummary from "./AboutSummary";
import AboutTechStack from "./AboutTechStack";

export default function AboutSection() {
  return (
    <section
      className="w-full bg-black text-white py-24 transition-colors"
      id="about"
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16">
        {/* 1. HEADER */}
        <AboutHeader />

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:items-stretch">
          {/* --- LEFT COLUMN GROUP --- */}
          <AboutSummary />

          {/* --- RIGHT COLUMN (THE SCROLLER) --- */}
          <AboutTechStack />
        </div>
      </div>
    </section>
  );
}
