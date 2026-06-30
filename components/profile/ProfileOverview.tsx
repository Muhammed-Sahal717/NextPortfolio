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
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
    >
      {/* Left: Summary */}
      <div>
        <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">
          Core Summary
        </h3>
        <div
          className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-white font-medium">Full Stack Engineer</span>{" "}
          focused on building scalable web systems and integrating AI into
          real-world applications. Strong in performance, architecture, and
          maintainable system design.
        </div>
      </div>

      {/* Right: Education */}
      <div>
        <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">
          Education
        </h3>
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
          <div className="inline-block px-3 py-1 bg-lime-500/10 text-lime-400 font-mono text-xs rounded-full mb-4">
            2023 - 2026
          </div>
          <h4 className="text-2xl font-bold text-white mb-2">
            Bachelor of Computer Applications
          </h4>
          <p className="text-zinc-500 flex items-center gap-2">
            <FiMapPin className="text-lime-500/50" />
            MCAS Vengara, Malappuram, Kerala
          </p>
        </div>
      </div>
    </motion.div>
  );
}
