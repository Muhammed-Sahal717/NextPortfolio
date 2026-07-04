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
      className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-dashed border-border rounded-xl overflow-hidden"
    >
      <a
        href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-background p-12 flex flex-col items-center justify-center gap-6 hover:bg-zinc-900/50 transition-all duration-300"
      >
        <SiGithub className="text-5xl text-zinc-500 group-hover:text-white transition-colors" />
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">GitHub</div>
          <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            Code
          </div>
        </div>
      </a>

      <a
        href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-background p-12 flex flex-col items-center justify-center gap-6 hover:bg-zinc-900/50 transition-all duration-300"
      >
        <SiLinkedin className="text-5xl text-zinc-500 group-hover:text-white transition-colors" />
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">LinkedIn</div>
          <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            Network
          </div>
        </div>
      </a>

      <a
        href="https://orbdarymycthwezfodwb.supabase.co/storage/v1/object/public/resume/resume_muhammedsahal_v1_0_0-3.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-background p-12 flex flex-col items-center justify-center gap-6 hover:bg-zinc-900/50 transition-all duration-300"
      >
        <FiFileText className="text-5xl text-zinc-500 group-hover:text-white transition-colors" />
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">Resume</div>
          <div className="text-muted-foreground text-xs font-mono uppercase tracking-widest">
            PDF
          </div>
        </div>
      </a>
    </motion.div>
  );
}
