"use client";

import { motion, Variants } from "framer-motion";
import { FiServer, FiMessageSquare, FiLayout, FiTerminal, FiCpu, FiCode } from "react-icons/fi";
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-px bg-border border border-border rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Frontend Development - col-span-4 */}
      <div className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-3 lg:col-span-4 group flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <FiLayout />
            </span>
            Frontend Development
          </h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Building responsive, interactive, and highly polished user interfaces.
          </p>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiReact className="text-zinc-500 group-hover:text-[#61DAFB] transition-colors" /> React</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiNextdotjs className="text-zinc-500 group-hover:text-white transition-colors" /> Next.js</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiTailwindcss className="text-zinc-500 group-hover:text-[#06B6D4] transition-colors" /> Tailwind CSS</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiShadcnui className="text-zinc-500 group-hover:text-white transition-colors" /> Shadcn UI</li>
        </ul>
      </div>

      {/* Backend - col-span-4 */}
      <div className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-3 lg:col-span-4 group flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <FiTerminal />
            </span>
            Backend
          </h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Designing scalable APIs and secure database architectures.
          </p>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiNodedotjs className="text-zinc-500 group-hover:text-[#339933] transition-colors" /> Node.js</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiFastapi className="text-zinc-500 group-hover:text-[#009688] transition-colors" /> FastAPI</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiPostgresql className="text-zinc-500 group-hover:text-[#4169E1] transition-colors" /> PostgreSQL</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiSupabase className="text-zinc-500 group-hover:text-[#3ECF8E] transition-colors" /> Supabase</li>
        </ul>
      </div>

      {/* DevOps - col-span-4 */}
      <div className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-6 lg:col-span-4 group flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <FiServer />
            </span>
            DevOps
          </h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Streamlining deployment pipelines and containerizing applications.
          </p>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiDocker className="text-zinc-500 group-hover:text-[#2496ED] transition-colors" /> Docker</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiVercel className="text-zinc-500 group-hover:text-white transition-colors" /> Vercel</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><FiServer className="text-zinc-500 group-hover:text-[#FCC624] transition-colors" /> Linux</li>
        </ul>
      </div>

      {/* Languages - col-span-6 */}
      <div className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-3 lg:col-span-6 group flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <FiCode />
            </span>
            Languages
          </h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Core programming languages for building scalable and maintainable software.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiJavascript className="text-zinc-500 group-hover:text-[#F7DF1E] transition-colors" /> JavaScript</li>
            <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiTypescript className="text-zinc-500 group-hover:text-[#3178C6] transition-colors" /> TypeScript</li>
          </ul>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiPython className="text-zinc-500 group-hover:text-[#FFD43B] transition-colors" /> Python</li>
          </ul>
        </div>
      </div>

      {/* AI Workflow - col-span-6 */}
      <div className="bg-background p-8 lg:p-10 hover:bg-zinc-900/20 transition-colors md:col-span-3 lg:col-span-6 group flex flex-col justify-between">
        <div>
          <h3 className="text-foreground font-semibold text-xl mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <FiCpu />
            </span>
            AI Workflow
          </h3>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Leveraging LLMs and automation tools to rapidly accelerate development.
          </p>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiClaude className="text-zinc-500 group-hover:text-[#D97757] transition-colors" /> Claude Code</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><SiGooglegemini className="text-zinc-500 group-hover:text-[#8E75B2] transition-colors" /> Gemini API</li>
          <li className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default"><FiMessageSquare className="text-zinc-500 group-hover:text-white transition-colors" /> Prompt Engineering</li>
        </ul>
      </div>

    </motion.div>
  );
}
