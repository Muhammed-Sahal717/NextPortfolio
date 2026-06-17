"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiAlertTriangle,
} from "react-icons/fi";

type SmileState = "normal" | "exploded" | "laughing" | "angry";

export default function LiquidNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Easter Egg States
  const [smileState, setSmileState] = useState<SmileState>("normal");
  const [isShutterDown, setIsShutterDown] = useState(false);
  const [countdown, setCountdown] = useState(8);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Easter Egg Logic
  const handleMouseEnter = () => {
    if (smileState !== "normal" || isShutterDown) return;
    hoverTimerRef.current = setTimeout(() => {
      setSmileState("exploded");
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (!isShutterDown) {
      setSmileState("normal");
    }
  };

  const handleMouseDown = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (isShutterDown) return;

    // Laughing after 5s total
    clickTimerRef.current = setTimeout(() => {
      setSmileState("laughing");

      // Angry after 7s total (2s after laughing)
      clickTimerRef.current = setTimeout(() => {
        setSmileState("angry");

        // Crash after 9s total (2s after angry)
        clickTimerRef.current = setTimeout(() => {
          triggerCrash();
        }, 2000);
      }, 2000);
    }, 5000);
  };

  const handleMouseUp = () => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (!isShutterDown) {
      setSmileState("normal");
    }
  };

  const triggerCrash = () => {
    setIsShutterDown(true);
    setCountdown(8);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownTimerRef.current)
            clearInterval(countdownTimerRef.current);
          setIsShutterDown(false);
          setSmileState("normal");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

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
    <>
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
              <div
                draggable={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${smileState === "angry" ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" : "bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.4)]"} overflow-hidden hover:scale-110 transition-colors duration-300 group select-none`}
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-black p-1.5"
                >
                  <motion.g
                    animate={
                      smileState === "laughing"
                        ? { y: [-2, 2, -2], rotate: [-5, 5, -5] }
                        : smileState === "angry"
                          ? { x: [-1, 1, -1] }
                          : { y: [0, -3, 0] }
                    }
                    transition={{
                      duration:
                        smileState === "laughing"
                          ? 0.2
                          : smileState === "angry"
                            ? 0.1
                            : 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Left Eye */}
                    {smileState === "angry" && (
                      <path
                        d="M 22 25 L 38 32"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    )}
                    <motion.ellipse
                      cx="30"
                      cy="35"
                      rx="6"
                      ry="9"
                      fill={smileState === "angry" ? "#ffcccc" : "currentColor"}
                      animate={
                        smileState === "exploded"
                          ? { scale: 1.5 }
                          : smileState === "laughing"
                            ? { scaleY: 0.2 }
                            : { scaleY: [1, 0.1, 1, 1, 1] }
                      }
                      transition={{
                        duration:
                          smileState === "laughing" || smileState === "exploded"
                            ? 0
                            : 4,
                        repeat: Infinity,
                        times: [0, 0.05, 0.1, 0.5, 1],
                      }}
                      style={{ transformOrigin: "30px 35px" }}
                    />
                    {/* Right Eye */}
                    {smileState === "angry" && (
                      <path
                        d="M 78 25 L 62 32"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    )}
                    <motion.ellipse
                      cx="70"
                      cy="35"
                      rx="6"
                      ry="9"
                      fill={smileState === "angry" ? "#ffcccc" : "currentColor"}
                      animate={
                        smileState === "exploded"
                          ? { scale: 1.5 }
                          : smileState === "laughing"
                            ? { scaleY: 0.2 }
                            : { scaleY: [1, 0.1, 1, 1, 1] }
                      }
                      transition={{
                        duration:
                          smileState === "laughing" || smileState === "exploded"
                            ? 0
                            : 4,
                        repeat: Infinity,
                        times: [0, 0.05, 0.1, 0.5, 1],
                      }}
                      style={{ transformOrigin: "70px 35px" }}
                    />
                    {/* Mouth */}
                    {smileState === "exploded" ? (
                      <ellipse
                        cx="50"
                        cy="70"
                        rx="15"
                        ry="18"
                        fill="currentColor"
                      />
                    ) : smileState === "laughing" ? (
                      <path
                        d="M 20 60 Q 50 95 80 60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                    ) : smileState === "angry" ? (
                      <path
                        d="M 30 75 Q 50 65 70 75"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M 28 65 Q 50 88 72 65"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    )}
                  </motion.g>
                </motion.svg>
              </div>

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

      {/* Shutter Overlay */}
      <AnimatePresence>
        {isShutterDown && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="fixed inset-0 z-[9999] bg-[#111] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #1a1a1a, #1a1a1a 40px, #0a0a0a 40px, #0a0a0a 45px)",
            }}
          >
            <div className="bg-black/80 p-8 md:p-16 rounded-3xl backdrop-blur-md flex flex-col items-center gap-8 border border-red-500/30 shadow-[0_0_100px_rgba(220,38,38,0.2)] mx-4 text-center">
              {/* Giant Angry Face */}
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-600 shadow-[0_0_50px_rgba(220,38,38,0.8)] overflow-hidden flex items-center justify-center relative"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-black p-4"
                >
                  <path
                    d="M 15 30 L 40 40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <ellipse cx="30" cy="45" rx="8" ry="8" fill="#ffcccc" />

                  <path
                    d="M 85 30 L 60 40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <ellipse cx="70" cy="45" rx="8" ry="8" fill="#ffcccc" />

                  <path
                    d="M 30 85 Q 50 65 70 85"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                  <FiAlertTriangle size={32} className="hidden md:block" />
                  <h2 className="text-3xl md:text-5xl font-black tracking-widest uppercase">
                    SYSTEM OVERLOAD
                  </h2>
                  <FiAlertTriangle size={32} className="hidden md:block" />
                </div>
                <p className="text-zinc-400 text-lg md:text-2xl font-mono">
                  Stop clicking me! Rebooting in...
                </p>
                <div className="text-7xl md:text-9xl font-black text-white font-mono mt-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {countdown}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
