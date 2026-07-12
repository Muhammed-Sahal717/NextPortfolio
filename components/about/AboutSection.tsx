"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutHeader from "./AboutHeader";
import AboutSummary from "./AboutSummary";
// import AboutTechStack from "./AboutTechStack";
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

        {/* 2. MAIN CONTENT AREA */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          
          {/* Left Column: Image (Takes up 5 columns on lg) */}
          <motion.div 
            className="lg:col-span-5 relative w-full h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[550px] rounded-3xl overflow-hidden border border-border/50 bg-zinc-900/50 flex-shrink-0 group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            <Image
              src="/about-sahal.png"
              alt="Sahal - Software Developer"
              fill
              className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </motion.div>

          {/* Right Column: Text & Stats (Takes up 7 columns on lg) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6 lg:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                } 
              }
            }}
          >
            
            {/* Professional Summary Box */}
            <motion.div 
              className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm flex-1"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <AboutSummary />
            </motion.div>
            
            {/* Tech Stack (Temporarily Commented Out) */}
            {/* 
            <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
              <AboutTechStack />
            </div>
            */}

            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border rounded-3xl overflow-hidden shadow-sm shrink-0"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6, 
                    ease: "easeOut",
                    staggerChildren: 0.15,
                    delayChildren: 0.3
                  } 
                }
              }}
            >
              <AboutStats />
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
