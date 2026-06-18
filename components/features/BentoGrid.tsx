"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
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
  SiTsnode,
  SiSupabase,
  SiPostgresql,
  SiPython,
  SiDocker,
  SiVercel,
  SiGit,
} from "react-icons/si";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

function AnimatedCounter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [inView, count, to]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export default function BentoGrid() {
  // FIX: Added explicit 'name' key.
  // Relying on 'Icon.name' breaks in production because Vercel minifies function names.
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
    <section
      className="w-full bg-black text-white py-24 transition-colors"
      id="about"
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16">
        {/* 1. HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 border-b border-zinc-800 pb-8">
        <div className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
          <ScrollReveal
            text="FULL STACK"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-2 transition-all"
          />
          <ScrollReveal
            text="DEVELOPER."
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-800 leading-[0.85]"
          />
        </div>
        <div className="max-w-md text-zinc-400 text-lg leading-relaxed">
          <p style={{ fontFamily: "var(--font-space-grotesk)" }}>
            I build high-performance websites. Merging{" "}
            <span className="text-lime-400 font-bold">clean code</span> with
            kinetic design. No bloat, just impact.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:items-stretch">
        {/* --- LEFT COLUMN GROUP --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Summary Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 rounded-3xl flex flex-col justify-center relative overflow-hidden group transition-all flex-1"
          >
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
              className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all"
            >
              <span className="block text-4xl xl:text-5xl font-black text-lime-400">
                <AnimatedCounter to={2} suffix="+" />
              </span>
              <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center">
                Years Experience
              </span>
            </motion.div>

            {/* Projects */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all"
            >
              <span className="block text-4xl xl:text-5xl font-black text-lime-400">
                <AnimatedCounter to={15} suffix="+" />
              </span>
              <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center">
                Projects Completed
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 xl:p-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all"
            >
              <span className="block text-4xl xl:text-5xl font-black text-lime-400">
                <AnimatedCounter to={1000} suffix="+" />
              </span>
              <span className="text-zinc-500 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center">
                Hours of Coding
              </span>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (THE SCROLLER) --- */}
        <div className="lg:col-span-5 h-full">
          <motion.div className="bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full h-[400px] lg:h-full rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all">
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
                        {/* Use the explicit name here */}
                        {item.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
