"use client";

import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import Noise from "@/components/animations/Noise";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiTsnode,
  SiSupabase,
  SiPostgresql,
  SiPython,
  SiDocker,
  SiVercel,
  SiGit,
} from "react-icons/si";

export default function AboutTechStack() {
  const stackItems = [
    { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
    { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "text-[#06B6D4]" },
    { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178C6]" },
    { name: "Node.js", Icon: SiTsnode, color: "text-[#339933]" },
    { name: "Supabase", Icon: SiSupabase, color: "text-[#3FCF8E]" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "text-[#4169E1]" },
    { name: "Python", Icon: SiPython, color: "text-[#3776AB]" },
    { name: "Docker", Icon: SiDocker, color: "text-[#2496ED]" },
    { name: "Vercel", Icon: SiVercel, color: "text-white" },
    { name: "Git", Icon: SiGit, color: "text-[#F05032]" },
  ];

  return (
    <div className="lg:col-span-5 h-full">
      <motion.div className="bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full h-[400px] lg:h-full rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all">
        <Noise />
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiZap className="text-lime-400" /> Tech Stack
          </h3>
          <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            SCROLL_Y
          </span>
        </div>

        {/* SCROLL AREA */}
        <div className="relative flex-1 w-full overflow-hidden">
          <div className="absolute inset-0">
            {/* Gradients */}
            <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-zinc-900 to-transparent z-10 pointer-events-none transition-colors" />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-zinc-900 to-transparent z-10 pointer-events-none transition-colors" />

            <motion.div
              className="flex flex-col gap-3 pb-6"
              initial={{ y: "0%" }}
              whileInView={{ y: ["0%", "-50%"] }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {/* List - Using only 2 sets for better performance */}
              {[...stackItems, ...stackItems].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-black/40 border border-zinc-200 dark:border-white/5 rounded-xl hover:border-lime-400/30 transition-all group shrink-0"
                >
                  <item.Icon
                    className={`text-lg transition-colors ${item.color}`}
                  />
                  <span className="font-mono text-zinc-400 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
