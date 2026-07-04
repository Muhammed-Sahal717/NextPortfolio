"use client";

import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    { name: "Next.js", Icon: SiNextdotjs, hoverColor: "group-hover:text-black dark:group-hover:text-white" },
    { name: "React", Icon: SiReact, hoverColor: "group-hover:text-[#61DAFB]" },
    { name: "Tailwind", Icon: SiTailwindcss, hoverColor: "group-hover:text-[#06B6D4]" },
    { name: "TypeScript", Icon: SiTypescript, hoverColor: "group-hover:text-[#3178C6]" },
    { name: "Node.js", Icon: SiTsnode, hoverColor: "group-hover:text-[#339933]" },
    { name: "Supabase", Icon: SiSupabase, hoverColor: "group-hover:text-[#3FCF8E]" },
    { name: "PostgreSQL", Icon: SiPostgresql, hoverColor: "group-hover:text-[#4169E1]" },
    { name: "Python", Icon: SiPython, hoverColor: "group-hover:text-[#3776AB]" },
    { name: "Docker", Icon: SiDocker, hoverColor: "group-hover:text-[#2496ED]" },
    { name: "Vercel", Icon: SiVercel, hoverColor: "group-hover:text-black dark:group-hover:text-white" },
    { name: "Git", Icon: SiGit, hoverColor: "group-hover:text-[#F05032]" },
  ];

  return (
    <div className="lg:col-span-5 h-full">
      <Card className="w-full h-[400px] lg:h-full flex flex-col relative overflow-hidden bg-muted/20 border-border">
        {/* Header */}
        <CardHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FiZap className="text-muted-foreground" /> Tech Stack
            </CardTitle>
            {/* <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
              SCROLL_Y
            </span> */}
          </div>
        </CardHeader>

        {/* SCROLL AREA */}
        <CardContent className="relative flex-1 w-full overflow-hidden p-0 px-6">
          <div className="absolute inset-0">
            {/* Gradients */}
            <div className="absolute top-0 left-0 w-full h-12 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex flex-col gap-3 pb-6 px-6"
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
                  className="group flex items-center gap-3 p-3 bg-background border border-border rounded-xl shadow-sm shrink-0 transition-colors hover:border-muted-foreground/30 cursor-default"
                >
                  <item.Icon className={`text-lg text-foreground transition-colors ${item.hoverColor}`} />
                  <span className="font-mono text-muted-foreground text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
