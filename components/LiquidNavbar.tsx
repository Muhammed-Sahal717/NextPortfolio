"use client";

import React, { useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    { name: "Profile", href: "/profile" },
    { name: "Work", href: "/#projects" },
    { name: "Journey", href: "/engineering" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-[700px] perspective-[2000px]">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative group rounded-full"
      >
        {/* --- MAIN GLASS BAR --- */}
        <div className="relative z-50 rounded-full">
          {/* Base Layer: Heavy blur and saturation for liquid feel */}
          <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-[40px] backdrop-saturate-[200%] rounded-full transition-colors duration-500 group-hover:bg-white/10" />
          
          {/* Mid Layer: Subtle grain/noise texture to diffuse light internally */}
          <div 
            className="absolute inset-0 rounded-full opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
          />

          {/* Top/Bottom Edge Lighting: Simulates light source from top, shadow on bottom */}
          <div className="absolute inset-0 rounded-full border border-white/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 [mask-image:linear-gradient(to_top,white,transparent)] pointer-events-none" />
          
          {/* Inner Depth Shadows: Creates the capsule thickness feel */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
          
          {/* Multi-layer External Elevation: Floating look, lifts slightly on hover */}
          <div className="absolute inset-0 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1),0_16px_48px_rgba(0,0,0,0.05)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.2),0_24px_64px_rgba(0,0,0,0.1)] transition-shadow duration-500 pointer-events-none -z-10" />

          {/* Smooth light streak reflection on hover */}
          <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative flex items-center justify-between px-6 py-3 text-white">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-lg tracking-widest flex items-center gap-2 cursor-pointer hover:text-white transition-colors z-50 mr-4 md:mr-6 group/logo drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] duration-500"
            >
              SAHAL.
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-300 dark:text-zinc-400">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-white transition-all duration-300 hover:scale-[1.05] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] inline-block"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 z-50 text-zinc-300 dark:text-zinc-400">
              <ThemeToggle />
              <Link
                href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                target="_blank"
                className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hidden sm:block"
              >
                <FiGithub size={18} />
              </Link>

              <a
                href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                className="hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hidden sm:block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin size={18} />
              </a>

              {/* Mobile Trigger with Bento Icon */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden hover:text-white transition-all duration-300 hover:scale-110 flex items-center justify-center p-1 rounded-full active:scale-95"
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
              initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 12, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-full left-0 w-full rounded-[2rem] overflow-hidden md:hidden shadow-[0_16px_48px_rgba(0,0,0,0.1),0_24px_64px_rgba(0,0,0,0.05)] origin-top group/mobile"
            >
              {/* Liquid dropdown background (Base Layer) */}
              <div className="absolute inset-0 rounded-[2rem] bg-white/85 dark:bg-black/85 backdrop-blur-[60px] backdrop-saturate-[250%] transition-colors duration-500" />
              
              {/* Mid Layer: Noise Texture */}
              <div 
                className="absolute inset-0 rounded-[2rem] opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
              />

              {/* Top/Bottom Edge Lighting */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              <div className="absolute inset-0 rounded-[2rem] border border-black/10 dark:border-white/10 [mask-image:linear-gradient(to_top,white,transparent)] pointer-events-none" />
              
              {/* Inner Depth Shadows */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />

              {/* Light reflection streak */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <div className="relative flex flex-col p-5 gap-2 text-center z-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-sm font-mono uppercase tracking-widest text-black dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 rounded-xl transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex justify-center items-center gap-6 mt-2 pt-4 border-t border-black/10 dark:border-white/10">
                  <ThemeToggle />
                  <Link
                    href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                    target="_blank"
                    className="text-black dark:text-white hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                  >
                    <FiGithub size={20} />
                  </Link>
                  <a
                    href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                    className="text-black dark:text-white hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                  >
                    <FiLinkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
