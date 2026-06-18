"use client";

import { motion } from "framer-motion";

export default function HeroAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1, x: 200, y: -200 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{
        duration: 1.2,
        delay: 0.4,
        type: "spring",
        bounce: 0.5,
        damping: 15,
        stiffness: 100,
      }}
      className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative pointer-events-auto h-[40vh] md:h-[50vh] lg:h-[70vh] mt-4 lg:mt-0"
    >
      <div className="relative">
        {/* Annotation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="hidden md:block absolute md:top-24 md:-right-2 lg:top-36 lg:-right-6 z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <motion.span
              animate={{
                rotate: [-12, -20, -8, -12, -12],
                scale: [1, 1.1, 0.95, 1, 1],
                y: [0, -4, 2, 0, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "easeInOut",
              }}
              className="inline-block text-lime-400/80 text-base md:text-lg lg:text-md drop-shadow-md tracking-wide origin-center"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Yup, that's me!
            </motion.span>
            <svg
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-lime-400/80 -ml-4 mt-1 drop-shadow-md overflow-visible"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M 80 20 C 60 40, 60 70, 50 70 C 30 70, 30 40, 50 40 C 70 40, 40 70, 10 60 M 10 60 L 25 50 M 10 60 L 20 75"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{
                  pathLength: [0, 1, 1, 1],
                  opacity: [1, 1, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.6, 0.8, 1],
                  ease: "easeInOut",
                }}
              />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.circle
                  key={i}
                  r="2"
                  fill="currentColor"
                  stroke="none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 0, 1, 0],
                    opacity: [0, 0, 1, 0],
                    cx: [
                      10,
                      10,
                      10 + Math.cos(i * (Math.PI / 3)) * 12,
                      10 + Math.cos(i * (Math.PI / 3)) * 16,
                    ],
                    cy: [
                      60,
                      60,
                      60 + Math.sin(i * (Math.PI / 3)) * 12,
                      60 + Math.sin(i * (Math.PI / 3)) * 16,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.6, 0.7, 1],
                    ease: "easeOut",
                  }}
                />
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Double Line Circle Container */}
        <div className="relative flex justify-center items-center group">
          {/* Outer Ring */}
          <div
            className="absolute inset-[-8px] md:inset-[-12px] rounded-full pointer-events-none z-0"
            style={{
              padding: "1px",
              background:
                "linear-gradient(to top right, transparent, rgba(163,230,53,0.05), rgba(163,230,53,0.3))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Inner Ring (Main Container) */}
          <div className="relative flex justify-center items-end w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] xl:w-[520px] xl:h-[520px] rounded-full shadow-[0_0_60px_rgba(163,230,53,0.1)] transition-all duration-700 z-10 overflow-hidden bg-transparent">
            {/* Inner Ring Gradient Border */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none z-20"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(to bottom left, transparent, rgba(163,230,53,0.05), rgba(163,230,53,0.3))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Tint overlay */}
            <div className="absolute inset-0 bg-lime-500/5 pointer-events-none z-0"></div>

            {/* Image */}
            <img
              src="/sahal-hero.png"
              alt="Sahal"
              className="object-cover md:object-contain scale-[1.05] md:scale-125 lg:scale-[0.85] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10 transition-transform duration-700 object-bottom translate-y-6 md:translate-y-6 lg:translate-y-16"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
