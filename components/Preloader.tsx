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
        <div className="fixed inset-0 z-[99999] flex items-start overflow-hidden pointer-events-none bg-[#111]">
          {/* Layer 1: Black backdrop */}
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
                className="flex-1 bg-[#EBEBEB] relative border-r border-[#111]/5 last:border-r-0 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                {/* Flowing gradient lines for more background design */}
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "-100%", opacity: 0.15 }}
                  transition={{
                    duration: 3 + i * 0.5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="absolute left-0 right-0 h-1/2 bg-gradient-to-t from-transparent via-[#111] to-transparent blur-md"
                />
              </motion.div>
            ))}

            {/* Global floating shapes & patterns for enriched background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mix-blend-overlay"
            >
              {/* Dynamic topographics / grid */}
              <motion.div
                initial={{ backgroundPosition: "0px 0px" }}
                animate={{ backgroundPosition: "100px 100px" }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </motion.div>
          </div>

          {/* Main Content Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* The primary focal point */}
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              {/* Complex Geometry Behind Text */}
              <motion.div
                initial={{ scale: 0, rotate: -45, borderRadius: "50%" }}
                animate={{ scale: 1, rotate: 180, borderRadius: "20%" }}
                transition={{ duration: 3, ease: [0.76, 0, 0.24, 1] }}
                className="absolute w-[20rem] h-[20rem] md:w-[32rem] md:h-[32rem] border-[1px] border-[#111] opacity-[0.05]"
              />
              <motion.div
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1.1, rotate: -90, opacity: 0.05 }}
                transition={{
                  delay: 0.3,
                  duration: 2.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute w-[22rem] h-[22rem] md:w-[34rem] md:h-[34rem] border-[2px] border-[#111] border-dashed rounded-full pointer-events-none"
              />
              {/* Added a third geometric layer */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 0.03 }}
                transition={{
                  delay: 0.5,
                  duration: 3,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] border-[1px] border-[#111] rotate-45 pointer-events-none"
              />

              {/* Advanced Text Writing Animation */}
              <div className="relative overflow-visible z-20 flex justify-center items-center w-full max-w-4xl px-4">
                <svg
                  viewBox="0 0 800 300"
                  className="w-full h-auto drop-shadow-2xl"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`${pacifico.className} text-[6rem] md:text-[10rem] font-bold`}
                    initial={{
                      strokeDasharray: 2000,
                      strokeDashoffset: 2000,
                      fill: "rgba(17,17,17,0)",
                    }}
                    animate={{
                      strokeDashoffset: 0,
                      fill: "rgba(17,17,17,1)",
                    }}
                    transition={{
                      strokeDashoffset: {
                        duration: 2.5,
                        ease: "easeInOut",
                        delay: 0.2,
                      },
                      fill: { duration: 1.5, ease: "easeIn", delay: 1.5 },
                    }}
                    stroke="#111"
                    strokeWidth="3"
                    style={{
                      paintOrder: "stroke fill",
                    }}
                  >
                    Sahal
                  </motion.text>
                </svg>

                {/* Secondary highlight swipe */}
                <motion.div
                  initial={{ width: 0, left: "50%", x: "-50%" }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1, ease: "circOut", delay: 2.5 }}
                  className="absolute bottom-[35%] h-[4px] bg-lime-500 z-0 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
