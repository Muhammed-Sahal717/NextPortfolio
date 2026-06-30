"use client";

import { motion } from "framer-motion";

export type SmileState = "normal" | "exploded" | "laughing" | "angry";

interface LogoProps {
  smileState: SmileState;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export default function Logo({
  smileState,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}: LogoProps) {
  return (
    <div
      draggable={false}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${
        smileState === "angry"
          ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]"
          : "bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.4)]"
      } overflow-hidden hover:scale-110 transition-colors duration-300 group select-none`}
    >
      <motion.svg viewBox="0 0 100 100" className="w-full h-full text-black p-1.5">
        <motion.g
          animate={
            smileState === "laughing"
              ? { y: [-2, 2, -2], rotate: [-5, 5, -5] }
              : smileState === "angry"
                ? { x: [-1, 1, -1] }
                : { y: [0, -3, 0] }
          }
          transition={{
            duration:
              smileState === "laughing"
                ? 0.2
                : smileState === "angry"
                  ? 0.1
                  : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Left Eye */}
          {smileState === "angry" && (
            <path
              d="M 22 25 L 38 32"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}
          <motion.ellipse
            cx="30"
            cy="35"
            rx="6"
            ry="9"
            fill={smileState === "angry" ? "#ffcccc" : "currentColor"}
            animate={
              smileState === "exploded"
                ? { scale: 1.5 }
                : smileState === "laughing"
                  ? { scaleY: 0.2 }
                  : { scaleY: [1, 0.1, 1, 1, 1] }
            }
            transition={{
              duration:
                smileState === "laughing" || smileState === "exploded" ? 0 : 4,
              repeat: Infinity,
              times: [0, 0.05, 0.1, 0.5, 1],
            }}
            style={{ transformOrigin: "30px 35px" }}
          />
          {/* Right Eye */}
          {smileState === "angry" && (
            <path
              d="M 78 25 L 62 32"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}
          <motion.ellipse
            cx="70"
            cy="35"
            rx="6"
            ry="9"
            fill={smileState === "angry" ? "#ffcccc" : "currentColor"}
            animate={
              smileState === "exploded"
                ? { scale: 1.5 }
                : smileState === "laughing"
                  ? { scaleY: 0.2 }
                  : { scaleY: [1, 0.1, 1, 1, 1] }
            }
            transition={{
              duration:
                smileState === "laughing" || smileState === "exploded" ? 0 : 4,
              repeat: Infinity,
              times: [0, 0.05, 0.1, 0.5, 1],
            }}
            style={{ transformOrigin: "70px 35px" }}
          />
          {/* Mouth */}
          {smileState === "exploded" ? (
            <ellipse cx="50" cy="70" rx="15" ry="18" fill="currentColor" />
          ) : smileState === "laughing" ? (
            <path
              d="M 20 60 Q 50 95 80 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          ) : smileState === "angry" ? (
            <path
              d="M 30 75 Q 50 65 70 75"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M 28 65 Q 50 88 72 65"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          )}
        </motion.g>
      </motion.svg>
    </div>
  );
}
