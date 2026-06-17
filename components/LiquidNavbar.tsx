"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
} from "react-icons/fi";

export default function LiquidNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { name: "Profile", href: "/profile" },
    { name: "Work", href: "/#projects" },
    { name: "Journey", href: "/engineering" },
    { name: "About", href: "/#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-500 ${
        isScrolled || isOpen
          ? "bg-[#050606]/90 border-b border-white/5 shadow-2xl backdrop-blur-md"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16">
        <motion.div
          layout
          className="relative text-white transition-all duration-500"
        >
          {/* --- HEADER ROW (ALWAYS VISIBLE) --- */}
          <div className="flex items-center justify-between py-4 sm:py-5 relative z-20">
          {/* Left: Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-lime-400 overflow-hidden hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(163,230,53,0.4)] group"
          >
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full text-black p-1.5"
            >
              <motion.g
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Left Eye */}
                <motion.ellipse 
                  cx="30" cy="35" rx="6" ry="9" fill="currentColor"
                  animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
                  style={{ transformOrigin: "30px 35px" }}
                />
                {/* Right Eye */}
                <motion.ellipse 
                  cx="70" cy="35" rx="6" ry="9" fill="currentColor" 
                  animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
                  style={{ transformOrigin: "70px 35px" }}
                />
                {/* Smile */}
                <path 
                  d="M 28 65 Q 50 88 72 65" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                />
              </motion.g>
            </motion.svg>
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: CTA & Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop CTA */}
            <a
              href="#email-form"
              className="hidden md:flex items-center justify-center bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95"
            >
              Let's connect
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-3 text-zinc-300 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 active:scale-95"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* --- MOBILE EXPANDING CONTENT --- */}
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
      </motion.div>
      </div>
    </nav>
  );
}
