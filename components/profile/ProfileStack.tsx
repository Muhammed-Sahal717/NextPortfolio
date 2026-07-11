"use client";

import { motion } from "framer-motion";
import { FiServer, FiDatabase, FiMessageSquare, FiLayout, FiTerminal, FiCpu } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGooglegemini,
  SiFastapi,
  SiShadcnui,
  SiSupabase,
  SiVercel,
  SiClaude,
} from "react-icons/si";

export default function ProfileStack() {
  return (
    <motion.div
      key="stack"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden"
    >
      {/* Frontend */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <FiLayout />
          </span>
          Frontend
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiReact className="text-zinc-500" /> React
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiNextdotjs className="text-zinc-500" /> Next.js
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiTypescript className="text-zinc-500" /> TypeScript
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiTailwindcss className="text-zinc-500" /> Tailwind CSS
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiShadcnui className="text-zinc-500" /> Shadcn UI
            </span>
          </li>
        </ul>
      </div>

      {/* Backend */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <FiTerminal />
          </span>
          Backend
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiNodedotjs className="text-zinc-500" /> Node.js
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiFastapi className="text-zinc-500" /> FastAPI
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiServer className="text-zinc-500" /> Express
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiPostgresql className="text-zinc-500" /> PostgreSQL
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiDatabase className="text-zinc-500" /> REST APIs
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiSupabase className="text-zinc-500" /> Supabase
            </span>
          </li>
        </ul>
      </div>

      {/* DevOps & AI */}
      <div className="bg-background p-8 lg:p-12 hover:bg-zinc-900/20 transition-colors">
        <h3 className="text-foreground font-semibold text-lg mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <FiCpu />
          </span>
          DevOps & AI
        </h3>
        <ul className="space-y-5">
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiDocker className="text-zinc-500" /> Docker
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiVercel className="text-zinc-500" /> Vercel
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiClaude className="text-zinc-500" /> Claude Code
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <SiGooglegemini className="text-zinc-500" /> Gemini API
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiMessageSquare className="text-zinc-500" /> Prompt Eng.
            </span>
          </li>
          <li className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-3">
              <FiDatabase className="text-zinc-500" /> RAG Configs
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
