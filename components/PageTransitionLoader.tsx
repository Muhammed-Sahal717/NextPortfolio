"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Whenever the pathname or search parameters change, trigger the loader
    // Due to the nature of Next.js 13+ App router, we don't have built-in
    // router events like 'routeChangeStart'. So we simulate a quick loading
    // state when the dependencies change, offering visual feedback.
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Quick enough to not be annoying, slow enough to register

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="top-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
          className="fixed top-0 left-0 right-0 z-[100000] pointer-events-none"
        >
          {/* Subtle blurred backdrop for the line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-lime-500/10 backdrop-blur-sm" />

          {/* The actual progress line */}
          <motion.div
            initial={{ width: "0%", left: "0%" }}
            animate={{
              width: ["0%", "50%", "100%"],
              left: ["0%", "25%", "100%"],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
            className="h-[3px] bg-gradient-to-r from-lime-400 via-green-400 to-lime-300 shadow-[0_0_10px_rgba(163,230,53,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
