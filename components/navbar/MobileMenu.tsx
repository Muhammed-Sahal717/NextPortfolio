"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mainLinks: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, setIsOpen, mainLinks }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          className="md:hidden px-4 pb-4 overflow-hidden"
        >
          <div className="pt-2 flex flex-col gap-1">
            {mainLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all block py-4 px-4 rounded-2xl flex items-center justify-between group"
                >
                  {link.name}
                  <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all text-[var(--theme-lime-400)] -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 px-2"
          >
            <div className="flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-[var(--theme-lime-400)] transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10"
              >
                <FiGithub size={20} />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-[var(--theme-lime-400)] transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10"
              >
                <FiLinkedin size={20} />
              </a>
            </div>

            <a
              href="#email-form"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center bg-white text-black px-6 py-3.5 rounded-full text-sm font-bold transition-transform active:scale-[0.95]"
            >
              Let's connect
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
