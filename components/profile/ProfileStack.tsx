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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {/* Frontend */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400">
            <SiReact />
          </span>
          Frontend
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiReact className="text-zinc-500" /> React
            </span>
            <span className="text-lime-400 text-xs font-mono">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiNextdotjs className="text-zinc-500" /> Next.js
            </span>
            <span className="text-lime-400 text-xs font-mono">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiTypescript className="text-zinc-500" /> TypeScript
            </span>
            <span className="text-lime-400 text-xs font-mono">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiTailwindcss className="text-zinc-500" /> Tailwind CSS
            </span>
            <span className="text-lime-400 text-xs font-mono">Advanced</span>
          </li>
        </ul>
      </div>

      {/* Backend */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400">
            <SiNodedotjs />
          </span>
          Backend
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiNodedotjs className="text-zinc-500" /> Node.js
            </span>
            <span className="text-lime-400 text-xs font-mono">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <FiServer className="text-zinc-500" /> Express
            </span>
            <span className="text-lime-400 text-xs font-mono">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiPostgresql className="text-zinc-500" /> PostgreSQL
            </span>
            <span className="text-lime-400 text-xs font-mono">Intermediate</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <FiDatabase className="text-zinc-500" /> REST APIs
            </span>
            <span className="text-lime-400 text-xs font-mono">Advanced</span>
          </li>
        </ul>
      </div>

      {/* DevOps & AI */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
        <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400">
            <SiDocker />
          </span>
          DevOps & AI
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiDocker className="text-zinc-500" /> Docker
            </span>
            <span className="text-lime-400 text-xs font-mono">Intermediate</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <SiGooglegemini className="text-zinc-500" /> Gemini API
            </span>
            <span className="text-lime-400 text-xs font-mono">Proficient</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <FiMessageSquare className="text-zinc-500" /> Prompt Eng.
            </span>
            <span className="text-lime-400 text-xs font-mono">Advanced</span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <FiDatabase className="text-zinc-500" /> RAG Configs
            </span>
            <span className="text-lime-400 text-xs font-mono">Intermediate</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
