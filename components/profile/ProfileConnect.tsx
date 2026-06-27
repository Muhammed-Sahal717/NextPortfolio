"use client";

import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function ProfileConnect() {
  return (
    <motion.div
      key="connect"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <a
        href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
      >
        <SiGithub className="text-4xl text-zinc-400 group-hover:text-white transition-colors" />
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-1">GitHub</div>
          <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            Code
          </div>
        </div>
      </a>

      <a
        href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
      >
        <SiLinkedin className="text-4xl text-zinc-400 group-hover:text-[#0A66C2] transition-colors" />
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-1">LinkedIn</div>
          <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            Network
          </div>
        </div>
      </a>

      <a
        href="https://orbdarymycthwezfodwb.supabase.co/storage/v1/object/public/resume/resume_muhammedsahal_v1_0_0-3.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
      >
        <FiFileText className="text-4xl text-zinc-400 group-hover:text-lime-400 transition-colors" />
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-1">Resume</div>
          <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            PDF
          </div>
        </div>
      </a>
    </motion.div>
  );
}
