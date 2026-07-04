"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiCode, FiCpu, FiLayers, FiServer } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

// --- DATA ---
const journeyItems = [
  {
    phase: "Phase 01",
    title: "Foundational Programming",
    desc: "Focused on systems programming, object-oriented design, and efficient data structures using C and Java to establish strong technical fundamentals.",
    icon: FiCode,
  },
  {
    phase: "Phase 02",
    title: "Full-Stack Development",
    desc: "Developed end-to-end web applications using React and Node.js. Built secure authentication systems, robust APIs, and optimized database schemas.",
    icon: FiServer,
  },
  {
    phase: "Phase 03",
    title: "AI Integration",
    desc: "Implemented practical machine learning features into web applications, utilizing language models and retrieval systems to enhance user experiences.",
    icon: FiCpu,
  },
  {
    phase: "Phase 04",
    title: "Production Engineering",
    desc: "Shifted focus towards system reliability, application performance monitoring, and deploying containerized environments using Docker.",
    icon: FiLayers,
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto mt-24 py-12 md:py-24">
      {/* The Background Track */}
      <div className="absolute left-[30px] md:left-[50px] top-12 bottom-12 w-[2px] bg-zinc-900 rounded-full" />

      {/* The Glowing Line */}
      <motion.div
        className="absolute left-[30px] md:left-[50px] top-12 w-[2px] rounded-full bg-linear-to-b from-transparent via-white to-white z-10"
        style={{ height, opacity: scrollYProgress }}
      />

      <div className="relative z-20 flex flex-col gap-12 md:gap-24">
        {journeyItems.map((item, i) => (
          <div key={i} className="flex w-full items-start gap-4 md:gap-16 group">
            {/* Dot Indicator */}
            <div className="shrink-0 relative w-[60px] md:w-[100px] flex justify-center mt-8 md:mt-12">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black border-2 border-zinc-800 relative z-20 group-hover:border-white transition-colors duration-500" />
            </div>

            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full pr-0 md:pr-6"
            >
              <Card className="bg-background border border-border shadow-sm hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-500 p-8 md:p-10">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                    {item.phase}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
