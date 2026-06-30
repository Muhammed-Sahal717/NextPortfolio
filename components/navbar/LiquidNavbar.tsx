"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Logo, { SmileState } from "./Logo";
import EasterEggOverlay from "./EasterEggOverlay";
import MobileMenu from "./MobileMenu";

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
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Work", href: "/#projects" },
    { name: "Profile", href: "/profile" },
    { name: "Journey", href: "/engineering" },
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
              <Logo
                smileState={smileState}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              />

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
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} mainLinks={mainLinks} />

          </motion.div>
        </div>
      </nav>

      {/* Shutter Overlay */}
      <EasterEggOverlay isShutterDown={isShutterDown} countdown={countdown} />
    </>
  );
}
