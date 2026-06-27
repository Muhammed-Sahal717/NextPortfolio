"use client";

import { motion } from "framer-motion";
import { FiCode, FiCpu, FiLayers, FiServer } from "react-icons/fi";
import JourneyPath from "./JourneyPath";

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

export default function JourneyTimeline() {
  return (
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
              className={`flex w-full relative ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
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
  );
}
