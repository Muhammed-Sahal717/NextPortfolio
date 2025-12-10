"use client";

import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  text: string;
  className?: string;
}

export default function ScrollReveal({ text, className }: ScrollRevealProps) {
  const words = text.split(" ");

  // FIX: Explicitly type this as 'Variants' to satisfy TypeScript
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  // FIX: Explicitly type this as 'Variants'
  const child: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={child}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
