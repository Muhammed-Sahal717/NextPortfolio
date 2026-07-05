"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import AIIcon from "@/components/chat/AIIcon";

interface ChatTriggerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentStatus: "idle" | "loading" | "error";
}

export default function ChatTrigger({
  isOpen,
  setIsOpen,
  currentStatus,
}: ChatTriggerProps) {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    // Show after a slight delay to feel more natural
    const showTimer = setTimeout(() => {
      setShowWelcomeMessage(true);
    }, 1500);

    // Hide after ~7 seconds (1.5s delay + 7s duration = 8.5s)
    const hideTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 8500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <div className="relative group">
            {/* Welcome Bubble */}
            <AnimatePresence>
              {showWelcomeMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute bottom-full right-0 mb-4 w-max pr-6 bg-popover/95 backdrop-blur-md text-popover-foreground px-5 py-3 rounded-2xl rounded-br-sm border border-border shadow-2xl z-10 pointer-events-none"
                  style={{ transformOrigin: "bottom right", willChange: "transform, opacity" }}
                >
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    AI Assistant
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <linearGradient
                          id="sparkleGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop stopColor="#22d3ee" offset="0%" />
                          <stop stopColor="#f472b6" offset="100%" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Sparkles
                      className="w-4 h-4"
                      style={{ stroke: "url(#sparkleGradient)" }}
                    />
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Need any help?</p>

                  {/* Triangle Pointer */}
                  <div className="absolute right-8 -bottom-[7px] w-3.5 h-3.5 bg-popover border-r border-b border-border rotate-45 rounded-sm"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Trigger Button */}
            <motion.button
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              whileHover={{ scale: 1.05, x: -2, y: -2 }}
              whileTap={{ scale: 0.95, x: 2, y: 2 }}
              style={{ willChange: "transform" }}
              onClick={() => {
                setIsOpen(true);
                setShowWelcomeMessage(false); // Hide message if they click it early
              }}
              className="h-16 w-16 md:h-24 md:w-24 flex items-center justify-center transition-all duration-300 ease-out"
            >
              <div className="relative w-16 h-16 md:w-24 md:h-24 p-1 flex items-center justify-center">
                <AIIcon
                  status={currentStatus}
                  className="hover:scale-110 transition-transform duration-200 origin-bottom"
                />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
