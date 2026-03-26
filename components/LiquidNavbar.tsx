"use client";

import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 120, 1);
      setScrollProgress(progress);
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Profile", href: "/profile" },
    { name: "Work", href: "/#projects" },
    { name: "Journey", href: "/engineering" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav 
      className={`fixed left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-[700px] perspective-[2000px] transition-all duration-500 ease-in-out ${isScrolled ? "top-4" : "top-6"}`}
    >
      <motion.div 
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative group rounded-full"
      >
        {/* --- MAIN GLASS BAR --- */}
        <div className="relative z-50 rounded-full">
          {/* Base Blur Layer (interpolated continuously) */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none transition-all duration-75"
            style={{ 
              backdropFilter: `blur(${6 + scrollProgress * 18}px) saturate(${100 + scrollProgress * 50}%)`,
              WebkitBackdropFilter: `blur(${6 + scrollProgress * 18}px) saturate(${100 + scrollProgress * 50}%)`,
            }} 
          />
          
          {/* Base Background Opacity Layer */}
          <div 
            className="absolute inset-0 rounded-full bg-white dark:bg-zinc-900 transition-colors duration-500 pointer-events-none"
            style={{ opacity: 0.05 + scrollProgress * 0.55 }}
          />
          
          {/* Mid Layer: Subtle grain/noise texture to diffuse light internally */}
          <div 
            className="absolute inset-0 rounded-full mix-blend-overlay pointer-events-none opacity-[0.015]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
          />

          {/* Single Border Highlight (interpolated opacity) */}
          <div 
            className="absolute inset-0 rounded-full border border-white/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none transition-opacity duration-300" 
            style={{ opacity: scrollProgress }} 
          />
          
          {/* Inner Depth Shadows: Creates the capsule thickness feel */}
          <div 
            className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none transition-opacity duration-300" 
            style={{ opacity: scrollProgress }} 
          />
          
          {/* Multi-layer External Elevation: Floating look, lifts slightly on hover */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none -z-10 transition-opacity duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]" 
            style={{ opacity: scrollProgress }} 
          />

          <div className={`relative flex items-center justify-between px-7 py-3 transition-colors duration-500 ${isScrolled ? "text-black dark:text-white" : "text-white/80 dark:text-white/70"}`}>
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-lg tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-500 z-50 mr-6 group/logo drop-shadow-[0_0_8px_rgba(0,0,0,0)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              SAHAL.
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-widest font-semibold">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative transition-all duration-300 inline-block after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 hover:after:w-full after:bg-current after:transition-all ease-out"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-7 z-50">
              <ThemeToggle />
              <Link
                href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                target="_blank"
                className="transition-all duration-300 hover:scale-[1.05] hidden sm:block"
              >
                <FiGithub size={18} />
              </Link>

              <a
                href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                className="transition-all duration-300 hover:scale-[1.05] hidden sm:block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin size={18} />
              </a>

              {/* Mobile Trigger with Bento Icon */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden transition-all duration-300 hover:scale-[1.05] flex items-center justify-center p-1 rounded-full active:scale-95"
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
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.02 }}
              className="absolute top-full left-0 w-full rounded-[2rem] overflow-hidden md:hidden shadow-[0_16px_48px_rgba(0,0,0,0.1),0_24px_64px_rgba(0,0,0,0.05)] origin-top group/mobile"
            >
              {/* Liquid dropdown background (Base Layer) */}
              <div className="absolute inset-0 rounded-[2rem] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-[24px] backdrop-saturate-[150%] transition-colors duration-500" />
              
              {/* Mid Layer: Noise Texture */}
              <div 
                className="absolute inset-0 rounded-[2rem] opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
              />

              {/* Single Border Highlight */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/20 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              
              {/* Inner Depth Shadows */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none" />

              <div className="relative flex flex-col p-5 gap-2 text-center z-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-sm font-mono uppercase tracking-widest text-black dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 rounded-xl transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="flex justify-center items-center gap-7 mt-2 pt-4 border-t border-black/10 dark:border-white/10">
                  <ThemeToggle />
                  <Link
                    href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                    target="_blank"
                    className="text-black dark:text-white hover:scale-110 transition-all duration-300"
                  >
                    <FiGithub size={20} />
                  </Link>
                  <a
                    href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                    className="text-black dark:text-white hover:scale-110 transition-all duration-300"
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
