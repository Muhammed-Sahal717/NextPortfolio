"use client";

import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
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
  SiFastapi,
} from "react-icons/si";

export default function AboutTechStack() {
  const stackItems = [
    { name: "Next.js", Icon: SiNextdotjs, hoverColor: "group-hover:text-white" },
    { name: "React", Icon: SiReact, hoverColor: "group-hover:text-[#61DAFB]" },
    { name: "Tailwind", Icon: SiTailwindcss, hoverColor: "group-hover:text-[#06B6D4]" },
    { name: "TypeScript", Icon: SiTypescript, hoverColor: "group-hover:text-[#3178C6]" },
    { name: "Node.js", Icon: SiTsnode, hoverColor: "group-hover:text-[#339933]" },
    { name: "Supabase", Icon: SiSupabase, hoverColor: "group-hover:text-[#3FCF8E]" },
    { name: "PostgreSQL", Icon: SiPostgresql, hoverColor: "group-hover:text-[#4169E1]" },
    { name: "Python", Icon: SiPython, hoverColor: "group-hover:text-[#3776AB]" },
    { name: "FastAPI", Icon: SiFastapi, hoverColor: "group-hover:text-[#009688]" },
    { name: "Docker", Icon: SiDocker, hoverColor: "group-hover:text-[#2496ED]" },
    { name: "Vercel", Icon: SiVercel, hoverColor: "group-hover:text-white" },
    { name: "Git", Icon: SiGit, hoverColor: "group-hover:text-[#F05032]" },
  ];

  // Split items into two rows for the dual marquee
  const row1 = stackItems.slice(0, 6);
  const row2 = stackItems.slice(6);

  return (
    <div className="flex flex-col h-[400px] lg:h-full bg-background overflow-hidden relative p-8 lg:p-12">
      <div className="flex items-center gap-2 text-xl font-semibold mb-8 shrink-0">
        <FiZap className="text-muted-foreground" /> Tech Stack
      </div>

      {/* Marquee Container */}
      <div className="flex-1 flex flex-col justify-center gap-6 relative w-full overflow-hidden">
        {/* Left and Right Gradients for smooth fading */}
        <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scrolling Left */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-4 shrink-0 px-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
              <div
                key={`r1-${i}`}
                className="group flex items-center gap-3 px-5 py-3 bg-muted/50 border border-border rounded-xl shrink-0 transition-all hover:bg-green-500/10 hover:border-green-500/30 cursor-default"
              >
                <item.Icon className={`text-xl text-muted-foreground transition-colors ${item.hoverColor}`} />
                <span className="font-mono text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-4 shrink-0 px-2"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
              <div
                key={`r2-${i}`}
                className="group flex items-center gap-3 px-5 py-3 bg-muted/50 border border-border rounded-xl shrink-0 transition-all hover:bg-green-500/10 hover:border-green-500/30 cursor-default"
              >
                <item.Icon className={`text-xl text-muted-foreground transition-colors ${item.hoverColor}`} />
                <span className="font-mono text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
