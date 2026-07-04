"use client";

import { motion } from "framer-motion";
import { FiServer, FiDatabase, FiMessageSquare } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGooglegemini,
} from "react-icons/si";

export default function ProfileStack() {
  return (
    <motion.div
      key="stack"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-dashed border-border rounded-xl overflow-hidden"
    >
      {/* Frontend */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <SiReact />
          </span>
          Frontend
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiReact className="text-zinc-500" /> React
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiNextdotjs className="text-zinc-500" /> Next.js
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiTypescript className="text-zinc-500" /> TypeScript
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiTailwindcss className="text-zinc-500" /> Tailwind CSS
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Advanced</span>
          </li>
        </ul>
      </div>

      {/* Backend */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <SiNodedotjs />
          </span>
          Backend
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiNodedotjs className="text-zinc-500" /> Node.js
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiServer className="text-zinc-500" /> Express
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiPostgresql className="text-zinc-500" /> PostgreSQL
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Intermediate</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiDatabase className="text-zinc-500" /> REST APIs
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Advanced</span>
          </li>
        </ul>
      </div>

      {/* DevOps & AI */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <SiDocker />
          </span>
          DevOps & AI
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiDocker className="text-zinc-500" /> Docker
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Intermediate</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiGooglegemini className="text-zinc-500" /> Gemini API
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiMessageSquare className="text-zinc-500" /> Prompt Eng.
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiDatabase className="text-zinc-500" /> RAG Configs
            </span>
            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Intermediate</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
