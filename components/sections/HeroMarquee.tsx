"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "Next.js 15", solid: true },
  { name: "Supabase", solid: false },
  { name: "Gemini AI", solid: true },
  { name: "WebGL", solid: false },
  { name: "TypeScript", solid: true },
  { name: "Tailwind", solid: false },
];

export default function HeroMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-0 w-full overflow-hidden z-20 pointer-events-auto bg-[var(--theme-lime-400)] py-3 md:py-4"
    >
      <div className="flex w-max">
        <motion.div
          className="flex gap-8 md:gap-16 whitespace-nowrap px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-8 md:gap-16 group cursor-none"
                >
                  <span
                    className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                      tech.solid ? "font-bold text-black/80" : "font-light text-black/50"
                    }`}
                  >
                    {tech.name}
                  </span>
                  <span className="text-black/20 text-xs">✦</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
