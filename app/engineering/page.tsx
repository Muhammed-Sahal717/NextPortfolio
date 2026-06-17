"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiquidNavbar from "@/components/LiquidNavbar";
import Footer from "@/components/Footer";
import { FiCode, FiCpu, FiLayers, FiServer, FiDatabase } from "react-icons/fi";

// --- SVG CURVED PATH GENERATOR ---
const generatePath = (count: number) => {
  let d = "M 50 0 ";
  const step = 100 / count;
  for (let i = 0; i < count; i++) {
    const isLeftCard = i % 2 === 0;
    const startY = i * step;
    const endY = (i + 1) * step;

    // Control points to create the "S" curve
    const cpY1 = startY + step * 0.4;
    const cpY2 = endY - step * 0.4;

    // If card is on the left, curve towards the left (15%) so it passes behind the card.
    // If card is on the right, curve towards the right (85%).
    const cpX = isLeftCard ? 15 : 85;

    d += `C ${cpX} ${cpY1}, ${cpX} ${cpY2}, 50 ${endY} `;
  }
  return d;
};

const JourneyPath = ({ count }: { count: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const path = generatePath(count);

  return (
    <div
      ref={ref}
      className="absolute inset-0 hidden md:block pointer-events-none z-0"
    >
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Subtle Background Track */}
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated Glowing Track mapped to scroll */}
        <motion.path
          d={path}
          fill="none"
          stroke="var(--theme-lime-400)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
          className="drop-shadow-[0_0_12px_var(--theme-lime-400)]"
        />
      </svg>
    </div>
  );
};

// --- DATA ---
const journeyItems = [
  {
    phase: "Phase 01",
    title: "Building the Base",
    desc: "Mastering C, Java, and core algorithms. Establishing a strong foundation in memory management and object-oriented patterns.",
    icon: FiCode,
  },
  {
    phase: "Phase 02",
    title: "Web Architecture",
    desc: "Diving deep into the PERN stack. Building scalable REST APIs, secure authentication flows, and stateless client-server architectures.",
    icon: FiServer,
  },
  {
    phase: "Phase 03",
    title: "Intelligence Layers",
    desc: "Integrating LLMs (OpenAI, Gemini) into web apps. Exploring Retrieval-Augmented Generation (RAG) and prompt engineering.",
    icon: FiCpu,
  },
  {
    phase: "Phase 04",
    title: "System Maturity",
    desc: "Focusing on agentic workflows, performance optimization, Docker containerization, and building highly resilient platforms.",
    icon: FiLayers,
  },
];

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[var(--theme-lime-400)]/30 overflow-hidden relative">
      <LiquidNavbar />

      {/* Profile-style Static Glow (No Heavy Animations) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-[var(--theme-lime-400)]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[100rem] mx-auto px-6 lg:px-16 pt-32 pb-32">
        {/* Header (Matches Profile Page) */}
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

        {/* Curved Timeline Section */}
        <div className="relative max-w-5xl mx-auto mt-24 py-12 md:py-24">
          <JourneyPath count={journeyItems.length} />

          {/* Mobile Vertical Line Fallback */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-zinc-800 md:hidden z-0" />

          <div className="relative z-10 flex flex-col gap-16 md:gap-32">
            {journeyItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex w-full relative ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                >
                  {/* Mobile dot indicator */}
                  <div className="absolute left-[19px] top-10 w-4 h-4 rounded-full bg-black border-2 border-[var(--theme-lime-400)] shadow-[0_0_10px_var(--theme-lime-400)] md:hidden z-10" />

                  <div className="w-full pl-16 md:pl-0 md:w-[45%]">
                    {/* Profile-style frosted glass card */}
                    <div className="bg-zinc-900/30 border border-zinc-800/50 hover:border-[var(--theme-lime-400)]/30 hover:bg-zinc-900/60 transition-all duration-500 rounded-[2rem] p-8 md:p-10 group backdrop-blur-md">
                      <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[var(--theme-lime-400)]/10 text-[var(--theme-lime-400)] mb-6 group-hover:scale-110 transition-transform duration-300">
                        <item.icon size={24} />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                        {item.phase}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--theme-lime-400)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Concepts Grid (Unified Profile Style) */}
        <div className="mt-32 border-t border-zinc-800/50 pt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Client-Server",
                icon: FiServer,
                desc: "Stateless communication and architecture.",
              },
              {
                title: "REST APIs",
                icon: FiDatabase,
                desc: "Predictable, scalable endpoint design.",
              },
              {
                title: "Auth Flows",
                icon: FiCode,
                desc: "JWT, Session, and OAuth security.",
              },
            ].map((concept, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-[var(--theme-lime-400)]/20 transition-colors group"
              >
                <concept.icon className="text-2xl text-zinc-500 mb-6 group-hover:text-[var(--theme-lime-400)] transition-colors" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {concept.title}
                </h3>
                <p className="text-zinc-500 text-sm font-light">
                  {concept.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
