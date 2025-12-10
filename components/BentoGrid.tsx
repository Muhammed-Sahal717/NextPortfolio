"use client";

import { motion } from "framer-motion";
import {
  FiMapPin,
  FiZap,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiArrowUpRight,
} from "react-icons/fi";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSupabase,
  SiPostgresql,
  SiPython,
  SiDocker,
  SiVercel,
  SiGit,
} from "react-icons/si";
import Link from "next/link";

export default function BentoGrid() {
  const stackItems = [
    { Icon: SiNextdotjs, color: "hover:text-white" },
    { Icon: SiReact, color: "hover:text-[#61DAFB]" },
    { Icon: SiTypescript, color: "hover:text-[#3178C6]" },
    { Icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    { Icon: SiFramer, color: "hover:text-[#0055FF]" },
    { Icon: SiSupabase, color: "hover:text-[#3FCF8E]" },
    { Icon: SiPostgresql, color: "hover:text-[#4169E1]" },
    { Icon: SiPython, color: "hover:text-[#3776AB]" },
    { Icon: SiDocker, color: "hover:text-[#2496ED]" },
    { Icon: SiVercel, color: "hover:text-white" },
    { Icon: SiGit, color: "hover:text-[#F05032]" },
  ];

  return (
    <section
      className="py-24 px-6 max-w-[1400px] mx-auto bg-black text-white"
      id="about"
    >
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 border-b border-zinc-800 pb-8">
        <div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            FULL STACK <br />
            <span className="text-zinc-700">DEVELOPER.</span>
          </h2>
        </div>
        <div className="max-w-md text-zinc-400 text-lg leading-relaxed">
          <p>
            I build high-performance wbsites. Merging{" "}
            <span className="text-lime-400 font-bold">clean code</span> with
            kinetic design. No bloat, just impact.
          </p>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD LAYOUT */}
      {/* Mobile: Simple Stack (flex-col). Desktop: Grid (grid-cols-12). */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:items-stretch">
        {/* --- LEFT COLUMN GROUP --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Bio Card */}
          <motion.div
            whileHover={{ y: -5 }}
            // Mobile: Auto height. Desktop: Fixed height to force alignment.
            className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-3xl flex flex-col justify-between h-auto lg:h-80 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <FiCode size={120} />
            </div>
            <div className="relative z-10 mb-8 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                Full Stack Engineer
              </div>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Developing scalable solutions for the modern web.
              </h3>
            </div>
            <div className="flex gap-8 items-end border-t border-white/5 pt-6 lg:border-none lg:pt-0">
              <div>
                <span className="block text-4xl font-bold text-white">2+</span>
                <span className="text-zinc-500 text-xs uppercase tracking-wider">
                  Years Exp
                </span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-white">15+</span>
                <span className="text-zinc-500 text-xs uppercase tracking-wider">
                  Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Location & Socials Row */}
          {/* Mobile: Vertical Stack. Tablet/Desktop: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:h-[180px]">
            {/* Location */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6 h-full min-h-[140px]"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shrink-0">
                <FiMapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Malappuram</h4>
                <p className="text-zinc-500 text-sm">Kerala, India</p>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-lime-400 text-black p-8 rounded-3xl flex flex-col justify-center gap-4 relative overflow-hidden group cursor-pointer h-full min-h-[140px]"
            >
              <div className="absolute top-4 right-4 bg-black/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiArrowUpRight size={20} />
              </div>
              <h4 className="font-bold text-xl uppercase tracking-tight">
                Connect
              </h4>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/Muhammed-Sahal717"
                  className="p-2 bg-black text-white rounded-full hover:scale-110 transition-transform"
                >
                  <FiGithub size={20} />
                </Link>
                <Link
                  href="https://linkedin.com/in/mhdsahal717"
                  className="p-2 bg-black text-white rounded-full hover:scale-110 transition-transform"
                >
                  <FiLinkedin size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (THE SCROLLER) --- */}
        <div className="lg:col-span-5 h-full">
          <motion.div
            // Mobile: Fixed height (400px) so it has presence. Desktop: Full height (h-full) to match neighbors.
            className="bg-zinc-900 border border-zinc-800 w-full h-[400px] lg:h-full rounded-3xl p-6 flex flex-col relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FiZap className="text-lime-400" /> The Arsenal
              </h3>
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                SCROLL_Y
              </span>
            </div>

            {/* SCROLL AREA */}
            <div className="relative flex-1 w-full overflow-hidden">
              <div className="absolute inset-0">
                {/* Gradients */}
                <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-zinc-900 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex flex-col gap-3 pb-6"
                  animate={{ y: ["0%", "-50%"] }}
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
                      className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl hover:border-lime-400/30 transition-colors group shrink-0"
                    >
                      <item.Icon
                        className={`text-lg text-zinc-500 transition-colors ${item.color}`}
                      />
                      <span className="font-mono text-zinc-400 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                        {item.Icon.name.replace("Si", "")}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
