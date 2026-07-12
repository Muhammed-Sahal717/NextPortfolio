"use client";

import { motion } from "framer-motion";
import { FiServer, FiDatabase, FiMessageSquare, FiLayout, FiTerminal, FiCpu, FiCode } from "react-icons/fi";
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
  SiJavascript,
  SiPython,
} from "react-icons/si";

export default function SkillsBento() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Frontend Development - col-span-2 */}
      <motion.div variants={itemVariants} className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-2 lg:col-span-2 group">
        <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <FiLayout />
          </span>
          Frontend Development
        </h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Building responsive, interactive, and highly polished user interfaces.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400"><SiReact className="text-zinc-500" /> React</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiNextdotjs className="text-zinc-500" /> Next.js</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiTailwindcss className="text-zinc-500" /> Tailwind CSS</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiShadcnui className="text-zinc-500" /> Shadcn UI</li>
        </ul>
      </motion.div>

      {/* Backend - col-span-1 */}
      <motion.div variants={itemVariants} className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-1 lg:col-span-1 group">
        <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <FiTerminal />
          </span>
          Backend
        </h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Designing scalable APIs and secure database architectures.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400"><SiNodedotjs className="text-zinc-500" /> Node.js</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiFastapi className="text-zinc-500" /> FastAPI</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiPostgresql className="text-zinc-500" /> PostgreSQL</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiSupabase className="text-zinc-500" /> Supabase</li>
        </ul>
      </motion.div>

      {/* DevOps - col-span-1 */}
      <motion.div variants={itemVariants} className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-1 lg:col-span-1 group">
        <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <FiServer />
          </span>
          DevOps
        </h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Streamlining deployment pipelines and containerizing applications.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400"><SiDocker className="text-zinc-500" /> Docker</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiVercel className="text-zinc-500" /> Vercel</li>
          <li className="flex items-center gap-3 text-zinc-400"><FiServer className="text-zinc-500" /> Linux</li>
        </ul>
      </motion.div>

      {/* Languages - col-span-2 */}
      <motion.div variants={itemVariants} className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-2 lg:col-span-2 group">
        <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <FiCode />
          </span>
          Languages
        </h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Core programming languages for building scalable and maintainable software.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-400"><SiJavascript className="text-zinc-500" /> JavaScript</li>
            <li className="flex items-center gap-3 text-zinc-400"><SiTypescript className="text-zinc-500" /> TypeScript</li>
          </ul>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-400"><SiPython className="text-zinc-500" /> Python</li>
          </ul>
        </div>
      </motion.div>

      {/* AI Workflow - col-span-2 */}
      <motion.div variants={itemVariants} className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-2 lg:col-span-2 group">
        <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <FiCpu />
          </span>
          AI Workflow
        </h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Leveraging LLMs and automation tools to rapidly accelerate development.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400"><SiClaude className="text-zinc-500" /> Claude Code</li>
          <li className="flex items-center gap-3 text-zinc-400"><SiGooglegemini className="text-zinc-500" /> Gemini API</li>
          <li className="flex items-center gap-3 text-zinc-400"><FiMessageSquare className="text-zinc-500" /> Prompt Engineering</li>
        </ul>
      </motion.div>

    </motion.div>
  );
}
