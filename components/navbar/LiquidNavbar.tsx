"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

const mainLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Journey", href: "/engineering" },
];

export default function LiquidNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  // Track hovered state for the fluid background pill
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Position and width of the single background indicator pill
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const navItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const targetSection = hoveredSection || activeSection;

  // Update pill coordinates whenever active or hovered section changes or window resizes
  useEffect(() => {
    const updatePill = () => {
      if (!targetSection) return;
      const currentEl = navItemRefs.current[targetSection];
      if (currentEl) {
        setPillStyle({
          left: currentEl.offsetLeft,
          width: currentEl.offsetWidth,
        });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [targetSection]);

  // Set initial active section based on current route
  useEffect(() => {
    if (pathname === "/engineering") {
      setActiveSection("Journey");
    } else if (pathname === "/") {
      setActiveSection("Home");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Definitively set Home as active when at the very top of the homepage
      if (pathname === "/" && currentScrollY < 100) {
        setActiveSection("Home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let observer: IntersectionObserver | null = null;

    // Only track scroll spy sections if we are on the homepage
    if (pathname === "/") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              const link = mainLinks.find((l) => l.href.endsWith(`#${id}`));
              if (link) setActiveSection(link.name);
            }
          });
        },
        { rootMargin: "-50% 0px -49% 0px" },
      );

      setTimeout(() => {
        mainLinks.forEach((link) => {
          if (link.href.includes("#")) {
            const id = link.href.split("#")[1];
            const element = document.getElementById(id);
            if (element && observer) observer.observe(element);
          }
        });
      }, 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-500 ${
        isScrolled || isOpen
          ? "bg-background border-b border-dashed border-zinc-200 dark:border-zinc-800 shadow-md"
          : "bg-transparent border-b border-dashed border-transparent shadow-none"
      }`}
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16">
        <div className="relative text-foreground transition-all duration-500">
          {/* --- HEADER ROW (ALWAYS VISIBLE) --- */}
          <div className="flex items-center justify-between py-2 md:py-3 relative z-20">
            {/* Left: Logo */}
            <Link
              href="/#home"
              className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <div className="w-8 h-8 transition-transform group-hover:scale-110">
                <Logo />
              </div>
            </Link>

            {/* Center: Desktop Links (Fluid Pill Animation) */}
            <div
              className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-background backdrop-blur-md rounded-full px-2 py-1.5"
              onMouseLeave={() => setHoveredSection(null)}
            >
              <ul className="relative flex items-center gap-1">
                {/* Single Animated Background Pill */}
                {pillStyle && (
                  <motion.div
                    className="absolute top-0 bottom-0 bg-zinc-200/50 dark:bg-zinc-800 rounded-full -z-10 pointer-events-none"
                    initial={false}
                    animate={{
                      left: pillStyle.left,
                      width: pillStyle.width,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {mainLinks.map((link) => {
                  const isSelected = targetSection === link.name;

                  return (
                    <li
                      key={link.name}
                      ref={(el) => {
                        navItemRefs.current[link.name] = el;
                      }}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setActiveSection(link.name)}
                        onMouseEnter={() => setHoveredSection(link.name)}
                        onFocus={() => setHoveredSection(link.name)}
                        onBlur={() => setHoveredSection(null)}
                        className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="relative z-10">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: CTA & Hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {/* Desktop CTA */}
              <Button
                asChild
                className="hidden md:flex rounded-full px-6 font-bold hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500 dark:hover:text-green-400 transition-all border border-transparent"
              >
                <a href="#contact">Let&apos;s connect</a>
              </Button>

              {/* Mobile Hamburger Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 text-muted-foreground hover:text-foreground"
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
                      <FiX className="!w-6 !h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="!w-6 !h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* --- MOBILE EXPANDING CONTENT --- */}
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            mainLinks={mainLinks}
          />
        </div>
      </div>
    </nav>
  );
}
