"use client";

import { motion } from "framer-motion";

export default function HeroMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-0 w-full overflow-hidden z-20 pointer-events-auto bg-[var(--theme-lime-400)] py-3 md:py-4"
    >
      <style>{`
        @keyframes smoothMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: smoothMarquee 25s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="marquee-container">
        <div className="flex gap-8 md:gap-16 whitespace-nowrap px-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              {[
                { name: "Next.js 15", solid: true },
                { name: "Supabase", solid: false },
                { name: "Gemini AI", solid: true },
                { name: "WebGL", solid: false },
                { name: "TypeScript", solid: true },
                { name: "Tailwind", solid: false },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-8 md:gap-16 group cursor-none"
                >
                  <span
                    className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${tech.solid ? "font-bold text-black/80" : "font-light text-black/50"}`}
                  >
                    {tech.name}
                  </span>
                  <span className="text-black/20 text-xs">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
