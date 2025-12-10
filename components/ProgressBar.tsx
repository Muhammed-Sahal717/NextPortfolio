"use client";
import { motion, useScroll } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-lime-500 origin-left z-100"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
