"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant, slightly longer total presentation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    // Completely hide scrollbar during preloader
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Complex multi-layered wipe exit
  const panelVariants = {
    initial: { height: "100vh", bottom: 0 },
    exit: (custom: number) => ({
      height: 0,
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.08 * custom,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[99999] flex items-start overflow-hidden pointer-events-none">
          {/* MULTI-LAYERED PANEL WIPE 
              Layer 1: Black backdrop */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`black-${i}`}
              custom={i}
              variants={panelVariants}
              initial={{ height: "100vh" }}
              exit="exit"
              className="absolute inset-0 z-0 flex w-full"
            >
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="flex-1 bg-[#111] border-r border-[#222] last:border-r-0"
                />
              ))}
            </motion.div>
          ))}

          {/* Layer 2: Main texture backdrop that slides up first */}
          <div className="absolute inset-0 z-10 flex w-full h-full pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`texture-${i}`}
                custom={i}
                variants={{
                  initial: { height: "100vh" },
                  exit: (custom: number) => ({
                    height: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1] as const,
                      delay: 0.05 * custom, // slightly faster/earlier than the black ones beneath
                    },
                  }),
                }}
                initial="initial"
                exit="exit"
                className="flex-1 bg-[#EBEBEB] relative border-r border-[#111]/5 last:border-r-0"
              >
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              </motion.div>
            ))}
          </div>

          {/* Main Content Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* The primary focal point */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Complex Geometry Behind Text */}
              <motion.div
                initial={{ scale: 0, rotate: -45, borderRadius: "50%" }}
                animate={{ scale: 1, rotate: 45, borderRadius: "10%" }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 w-64 h-64 -ml-[calc(8rem-100%)] -mt-10 border-[1px] border-[#111] opacity-[0.05]"
              />
              <motion.div
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, rotate: -15, opacity: 0.05 }}
                transition={{
                  delay: 0.3,
                  duration: 1.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute inset-0 w-72 h-72 -ml-[calc(9rem-100%)] -mt-14 border-[2px] border-[#111] border-dashed rounded-full pointer-events-none"
              />

              {/* Advanced Text Reveal */}
              <div className="relative overflow-hidden pt-8 pb-10 px-6">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  className="absolute inset-0 z-20 bg-[#111]"
                />

                <h1
                  className={`${pacifico.className} text-7xl md:text-[8rem] text-[#111] drop-shadow-xl relative z-10 flex`}
                >
                  {"Sahal".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: "150%", rotate: 20, opacity: 0 }}
                      animate={{ y: "0%", rotate: 0, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.6, 0.01, 0.05, 0.95] as const,
                        delay: 0.6 + index * 0.08,
                      }}
                      className="inline-block origin-bottom transform-gpu"
                      style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.05)" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>

                {/* Secondary highlight swipe */}
                <motion.div
                  initial={{ width: 0, left: 0 }}
                  animate={{ width: "100%", left: "100%" }}
                  transition={{ duration: 1, ease: "circIn", delay: 1.6 }}
                  className="absolute bottom-6 h-[4px] bg-lime-500 z-0 origin-left"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
