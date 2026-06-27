"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

interface EasterEggOverlayProps {
  isShutterDown: boolean;
  countdown: number;
}

export default function EasterEggOverlay({
  isShutterDown,
  countdown,
}: EasterEggOverlayProps) {
  return (
    <AnimatePresence>
      {isShutterDown && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="fixed inset-0 z-[9999] bg-[#111] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #1a1a1a, #1a1a1a 40px, #0a0a0a 40px, #0a0a0a 45px)",
          }}
        >
          <div className="bg-black/80 p-8 md:p-16 rounded-3xl backdrop-blur-md flex flex-col items-center gap-8 border border-red-500/30 shadow-[0_0_100px_rgba(220,38,38,0.2)] mx-4 text-center">
            {/* Giant Angry Face */}
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.8)] overflow-hidden flex items-center justify-center relative"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-black p-4">
                <path
                  d="M 15 30 L 40 40"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <ellipse cx="30" cy="45" rx="8" ry="8" fill="#ffcccc" />

                <path
                  d="M 85 30 L 60 40"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <ellipse cx="70" cy="45" rx="8" ry="8" fill="#ffcccc" />

                <path
                  d="M 30 85 Q 50 65 70 85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                <FiAlertTriangle size={32} className="hidden md:block" />
                <h2 className="text-3xl md:text-5xl font-black tracking-widest uppercase">
                  SYSTEM OVERLOAD
                </h2>
                <FiAlertTriangle size={32} className="hidden md:block" />
              </div>
              <p className="text-zinc-400 text-lg md:text-2xl font-mono">
                Stop clicking me! Rebooting in...
              </p>
              <div className="text-7xl md:text-9xl font-black text-white font-mono mt-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                {countdown}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
