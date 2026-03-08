"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LiquidEther from "@/components/LiquidEther";
import LiquidNavbar from "@/components/LiquidNavbar";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const { theme } = useTheme();

  const isLight = theme === "light";
  const liquidColors = isLight
    ? ["#C9ACEB", "#9A5CF2"]
    : ["#D0F0C0", "#ADFF2F"];

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setResumeUrl(data.url);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* NAVBAR */}
      <LiquidNavbar />

      {/* BACKGROUND ANIMATION — Optimized & Smooth */}
      <div className="absolute inset-0 z-0 opacity-60">
        <LiquidEther
          colors={liquidColors}
          // --- PERFORMANCE OPTIMIZATION (Butter Smooth) ---
          isViscous={true}
          viscous={12} // Lower viscosity = smoother + faster
          iterationsViscous={8} // Was 40 → now 5x faster
          mouseForce={12}
          cursorSize={70}
          dt={0.016} // Perfect 60fps timestep
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.0}
          resolution={0.25} // Was 0.6 → huge performance boost
          isBounce={true}
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2, // Slightly slower stagger
                delayChildren: 0.4, // Let hydration finish
              },
            },
          }}
          className="max-w-4xl space-y-8 pointer-events-auto"
        >
          {/* Status Badge - Premium "Cyber-Chip" Design */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, z: 0 },
              visible: {
                opacity: 1,
                y: 0,
                z: 0,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              },
            }}
            style={{ willChange: "transform, opacity" }}
            className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-6 group"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--theme-zinc-900)_0%,var(--theme-lime-400)_50%,var(--theme-zinc-900)_100%)]" />
            <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-[var(--theme-black)]/90 px-4 py-2 text-sm font-medium text-[var(--theme-white)] backdrop-blur-3xl border border-[var(--theme-white)]/10 group-hover:bg-[var(--theme-black)]/80 transition-all duration-300">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-lime-400)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-lime-500)]"></span>
              </span>
              <span className="text-[var(--theme-white)] font-semibold">
                Available for Work & Collaborations
              </span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, z: 0 },
              visible: {
                opacity: 1,
                y: 0,
                z: 0,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              },
            }}
            style={{ willChange: "transform, opacity" }}
            className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]"
          >
            Crafting the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 via-lime-300 to-green-400 drop-shadow-[0_0_35px_var(--theme-lime-500)]">
              Next-Gen Web.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30, z: 0 },
              visible: {
                opacity: 1,
                y: 0,
                z: 0,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              },
            }}
            style={{ willChange: "transform, opacity" }}
            className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mix-blend-screen"
          >
            I am Sahal. A Web Developer merging modern web stacks with AI
            agents.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, z: 0 },
              visible: {
                opacity: 1,
                y: 0,
                z: 0,
                transition: { type: "spring", stiffness: 100, damping: 15 },
              },
            }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <Link href="#projects">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-lg bg-[var(--theme-white)] text-[var(--theme-black)] border border-[var(--theme-white)] font-bold hover:scale-105 hover:shadow-[0_0_40px_var(--theme-white)] hover:bg-[var(--theme-black)] hover:text-[var(--theme-white)] transition-all duration-300"
              >
                View Work <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            {/* Resume Button */}
            {resumeUrl && (
              <a href={resumeUrl} download>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 border-[var(--theme-lime-400)]/30 bg-[var(--theme-lime-400)]/5 backdrop-blur-md text-[var(--theme-lime-400)] hover:bg-[var(--theme-lime-400)] hover:text-[var(--theme-black)] font-semibold transition-all duration-300"
                >
                  <FiDownload className="mr-2 w-5 h-5" />
                  Download Resume
                </Button>
              </a>
            )}

            <Link
              href={process.env.NEXT_PUBLIC_CONTACT_GITHUB!}
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 w-14 p-0 border-[var(--theme-white)]/20 bg-[var(--theme-black)]/20 backdrop-blur-md text-[var(--theme-white)] hover:bg-[var(--theme-white)] hover:text-[var(--theme-black)] transition-all duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </Button>
            </Link>

            <Link
              href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN!}
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 w-14 p-0 border-[var(--theme-white)]/20 bg-[var(--theme-black)]/20 backdrop-blur-md text-[var(--theme-white)] hover:bg-[var(--theme-white)] hover:text-[var(--theme-black)] transition-all duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 4. INFINITE TECH MARQUEE (Responsive & Functional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ willChange: "opacity" }}
          className="absolute bottom-8 w-full overflow-hidden z-20 pointer-events-auto"
        >
          {/* We duplicate the content to create a seamless loop */}
          <div className="flex w-max">
            <motion.div
              className="flex gap-8 md:gap-16 whitespace-nowrap px-4"
              animate={{ x: ["0%", "-50%"] }}
              style={{ willChange: "transform" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 md:gap-16">
                  {[
                    "Next.js 15",
                    "Supabase",
                    "Gemini AI",
                    "WebGL",
                    "TypeScript",
                    "Tailwind",
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-8 md:gap-16 group cursor-default"
                    >
                      <span className="text-white/40 font-mono text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-[var(--theme-lime-400)] transition-colors duration-300">
                        {tech}
                      </span>
                      <span className="text-white/10 text-[10px]">•</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
