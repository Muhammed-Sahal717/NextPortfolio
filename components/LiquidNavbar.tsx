"use client";

import React, { useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// The Bento Grid Menu Icon (3x3 Dots)
const BentoMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    {/* State 1: The 3x3 Grid (Visible when CLOSED) */}
    <motion.div
      initial={false}
      animate={{
        opacity: isOpen ? 0 : 1,
        rotate: isOpen ? 90 : 0,
        scale: isOpen ? 0.5 : 1,
      }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 grid grid-cols-3 gap-0.5 p-0.5"
    >
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-white rounded-full w-full h-full" />
      ))}
    </motion.div>

    {/* State 2: The X Icon (Visible when OPEN) */}
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute text-white"
      initial={false}
      animate={{
        opacity: isOpen ? 1 : 0,
        rotate: isOpen ? 0 : -90,
        scale: isOpen ? 1 : 0.5,
      }}
      transition={{ duration: 0.2 }}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </motion.svg>
  </div>
);

export default function LiquidNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-10000 w-[90%] max-w-[500px]">
      <div className="relative group rounded-full">
        {/* --- MAIN GLASS BAR --- */}
        <div className="relative z-50 overflow-hidden rounded-full">
          <div
            className="
            absolute inset-0 
            bg-white/5 
            backdrop-blur-2xl 
            backdrop-saturate-150
            border border-white/10
            shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
            transition-all duration-500
          "
          />

          <div className="relative flex items-center justify-between px-6 py-3 text-white">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-lg tracking-widest flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors z-50"
            >
              SAHAL.
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-white transition-colors hover:scale-105"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 z-50">
              <Link
                href="https://github.com/Muhammed-Sahal717"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors hidden sm:block"
              >
                <FiGithub size={18} />
              </Link>

              <a
                href="https://linkedin.com/in/muhammedsahal717/"
                className="text-zinc-400 hover:text-white transition-colors hidden sm:block"
                target="_blank"
                rel="noopener noreferrer" // this for security reasons
              >
                <FiLinkedin size={18} />
              </a>

              {/* Mobile Trigger with Bento Icon */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                <BentoMenuIcon isOpen={isOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE DROPDOWN --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 12, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full rounded-2xl overflow-hidden md:hidden"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl border border-white/10" />

              <div className="relative flex flex-col p-4 gap-2 text-center">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex justify-center gap-6 mt-2 pt-4 border-t border-white/10">
                  <Link
                    href="https://github.com/Muhammed-Sahal717"
                    target="_blank"
                    className="text-zinc-400 hover:text-white"
                  >
                    <FiGithub size={20} />
                  </Link>
                  <a
                    href="https://linkedin.com/in/muhammedsahal717/"
                    className="text-zinc-400 hover:text-white"
                  >
                    <FiLinkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
