"use client";

import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import AnimatedCounter from "./AnimatedCounter";
import Noise from "@/components/animations/Noise";

export default function AboutSummary() {
  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Summary Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 rounded-3xl flex flex-col justify-center relative overflow-hidden group transition-all flex-1"
      >
        <Noise />
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <FiCode size={120} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            Professional Summary
          </div>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-300">
            <span className="text-white font-bold">BCA graduate</span> and <span className="text-white font-bold">Software Developer</span> experienced in building full-stack web applications using React, Next.js, TypeScript, Node.js, and PostgreSQL.
            <br /><br />
            Skilled in developing AI-powered tools, secure authentication systems, and cloud-deployed architectures. Passionate about crafting scalable software for modern engineering teams.
          </p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:h-[140px]">
        {/* Experience */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden"
        >
          <Noise />
          <span className="block text-4xl xl:text-5xl font-black text-lime-400 relative z-10">
            <AnimatedCounter to={2} suffix="+" />
          </span>
          <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center relative z-10">
            Years Experience
          </span>
        </motion.div>

        {/* Projects */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden"
        >
          <Noise />
          <span className="block text-4xl xl:text-5xl font-black text-lime-400 relative z-10">
            <AnimatedCounter to={15} suffix="+" />
          </span>
          <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center relative z-10">
            Projects Completed
          </span>
        </motion.div>

        {/* Hours */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden"
        >
          <Noise />
          <span className="block text-4xl xl:text-5xl font-black text-lime-400 relative z-10">
            <AnimatedCounter to={1000} suffix="+" />
          </span>
          <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center relative z-10">
            Hours of Coding
          </span>
        </motion.div>
      </div>
    </div>
  );
}
