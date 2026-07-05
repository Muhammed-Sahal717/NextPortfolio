"use client";

import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";

export default function ProfileOverview() {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden"
    >
      {/* Left: Summary */}
      <div className="bg-background p-8 lg:p-12">
        <h3 className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] mb-8">
          Core Summary
        </h3>
        <div
          className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed"
        >
          <span className="text-white font-medium">Full Stack Engineer</span>{" "}
          focused on building scalable web systems and integrating AI into
          real-world applications. Strong in performance, architecture, and
          maintainable system design.
        </div>
      </div>

      {/* Right: Education */}
      <div className="bg-background p-8 lg:p-12">
        <h3 className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] mb-8">
          Education
        </h3>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:bg-zinc-900 transition-colors">
          <div className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 font-mono text-xs rounded-full mb-4">
            2023 - 2026
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-2">
            Bachelor of Computer Applications
          </h4>
          <p className="text-muted-foreground flex items-center gap-2 mt-4">
            <FiMapPin className="text-zinc-500" />
            MCAS Vengara, Malappuram, Kerala
          </p>
        </div>
      </div>
    </motion.div>
  );
}
