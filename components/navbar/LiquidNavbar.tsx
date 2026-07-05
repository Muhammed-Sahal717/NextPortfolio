"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const mainLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Work", href: "/#projects" },
  { name: "Profile", href: "/profile" },
  { name: "Journey", href: "/engineering" },
];

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-500 ${
        isScrolled || isOpen
          ? "bg-background border-b border-dashed border-border shadow-md"
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

            {/* Center: Desktop Links (Shadcn NavigationMenu) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
              <NavigationMenu>
                <NavigationMenuList>
                  {mainLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={link.href}>{link.name}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right: CTA & Hamburger */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              
              {/* Desktop CTA */}
              <Button
                asChild
                className="hidden md:flex rounded-full px-6 font-bold"
              >
                <a href="#contact">Let's connect</a>
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
