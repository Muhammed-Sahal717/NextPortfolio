"use client";

import { motion, AnimatePresence } from "framer-motion";
import AiraIcon from "@/components/chat/AiraIcon";

interface ChatTriggerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentStatus: "idle" | "loading" | "error";
}

export default function ChatTrigger({ isOpen, setIsOpen, currentStatus }: ChatTriggerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <div className="relative group">
            <motion.button
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              whileHover={{ scale: 1.05, translate: "-2px -2px" }}
              whileTap={{ scale: 0.95, translate: "2px 2px" }}
              onClick={() => setIsOpen(true)}
              className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center transition-all duration-300 ease-out"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 p-1 flex items-center justify-center">
                <AiraIcon
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
