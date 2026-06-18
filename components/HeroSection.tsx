"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import LiquidNavbar from "@/components/LiquidNavbar";
import { useTheme } from "next-themes";
import ScrollReveal from "@/components/ScrollReveal";

// Heavy WebGL component — only load when needed
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

export default function HeroSection() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const { theme } = useTheme();

  const isLight = theme === "light";
  const liquidColors = isLight
    ? ["#C9ACEB", "#9A5CF2"]
    : ["#B8FF5A", "#4ADE80"];

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
      <div className="relative z-10 h-full max-w-[100rem] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center px-6 lg:px-16 pointer-events-none gap-8 pt-24 lg:pt-0 pb-16 lg:pb-0">
        {/* LEFT COLUMN: Text & Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
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
          className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto z-20"
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
            className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-6 lg:mb-8 group"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--theme-zinc-900)_0%,var(--theme-lime-400)_50%,var(--theme-zinc-900)_100%)]" />
            <span className="inline-flex h-full w-full cursor-none items-center justify-center rounded-full bg-[var(--theme-black)]/90 px-4 py-2 text-sm font-medium text-[var(--theme-white)] backdrop-blur-3xl border border-[var(--theme-white)]/10 group-hover:bg-[var(--theme-black)]/80 transition-all duration-300">
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.1] mb-6 lg:mb-8"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Crafting the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 via-lime-300 to-green-400">
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
            className="text-xl md:text-2xl text-zinc-300 font-medium max-w-xl mix-blend-screen leading-relaxed tracking-wide mb-10 lg:mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            I am Sahal. A Web Developer crafting web solutions and integrating
            AI-driven functionality.
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
            className="flex flex-wrap justify-center lg:justify-start gap-4"
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
                  size="lg"
                  className="rounded-full h-14 px-8 border border-[var(--theme-lime-400)]/30 bg-[var(--theme-lime-400)]/5 backdrop-blur-md text-[var(--theme-lime-400)] hover:bg-[var(--theme-lime-400)] hover:text-[var(--theme-black)] font-semibold transition-all duration-300"
                >
                  <FiDownload className="mr-2 w-5 h-5" />
                  View My Resume
                </Button>
              </a>
            )}

            <Link
              href={process.env.NEXT_PUBLIC_CONTACT_GITHUB!}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="rounded-full h-14 w-14 p-0 border border-[var(--theme-white)]/20 bg-[var(--theme-black)]/20 backdrop-blur-md text-[var(--theme-white)] hover:bg-[var(--theme-white)] hover:text-[var(--theme-black)] transition-all duration-300"
              >
                <FaGithub className="w-6 h-6" />
              </Button>
            </Link>

            <Link
              href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN!}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="rounded-full h-14 w-14 p-0 border border-[var(--theme-white)]/20 bg-[var(--theme-black)]/20 backdrop-blur-md text-[var(--theme-white)] hover:bg-[var(--theme-white)] hover:text-[var(--theme-black)] transition-all duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1, x: 200, y: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            type: "spring",
            bounce: 0.5,
            damping: 15,
            stiffness: 100,
          }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative pointer-events-auto h-[40vh] md:h-[50vh] lg:h-[70vh] mt-4 lg:mt-0"
        >
          {/* Wrapper to position the annotation relative to the circle */}
          <div className="relative">
            {/* "That's me!" Annotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="hidden md:block absolute md:top-24 md:-right-2 lg:top-36 lg:-right-6 z-30 pointer-events-none"
            >
              <div className="flex flex-col items-center">
                <motion.span
                  animate={{
                    rotate: [-12, -20, -8, -12, -12],
                    scale: [1, 1.1, 0.95, 1, 1],
                    y: [0, -4, 2, 0, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    times: [0, 0.2, 0.4, 0.6, 1],
                    ease: "easeInOut",
                  }}
                  className="inline-block text-lime-400/80 text-base md:text-lg lg:text-md drop-shadow-md tracking-wide origin-center"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  Yup, that's me!
                </motion.span>
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-lime-400/80 -ml-4 mt-1 drop-shadow-md overflow-visible"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M 80 20 C 60 40, 60 70, 50 70 C 30 70, 30 40, 50 40 C 70 40, 40 70, 10 60 M 10 60 L 25 50 M 10 60 L 20 75"
                    initial={{ pathLength: 0, opacity: 1 }}
                    animate={{
                      pathLength: [0, 1, 1, 1],
                      opacity: [1, 1, 0, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      times: [0, 0.6, 0.8, 1],
                      ease: "easeInOut",
                    }}
                  />
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.circle
                      key={i}
                      r="2"
                      fill="currentColor"
                      stroke="none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 0, 1, 0],
                        opacity: [0, 0, 1, 0],
                        cx: [
                          10,
                          10,
                          10 + Math.cos(i * (Math.PI / 3)) * 12,
                          10 + Math.cos(i * (Math.PI / 3)) * 16,
                        ],
                        cy: [
                          60,
                          60,
                          60 + Math.sin(i * (Math.PI / 3)) * 12,
                          60 + Math.sin(i * (Math.PI / 3)) * 16,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        times: [0, 0.6, 0.7, 1],
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>

            {/* Double Line Circle Container */}
            <div className="relative flex justify-center items-center group">
              {/* Outer Ring */}
              <div
                className="absolute inset-[-8px] md:inset-[-12px] rounded-full pointer-events-none z-0"
                style={{
                  padding: "1px",
                  background:
                    "linear-gradient(to top right, transparent, rgba(163,230,53,0.05), rgba(163,230,53,0.3))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Inner Ring (Main Container) */}
              <div className="relative flex justify-center items-end w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] xl:w-[520px] xl:h-[520px] rounded-full shadow-[0_0_60px_rgba(163,230,53,0.1)] transition-all duration-700 z-10 overflow-hidden bg-transparent">
                {/* Inner Ring Gradient Border */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none z-20"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(to bottom left, transparent, rgba(163,230,53,0.05), rgba(163,230,53,0.3))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Tint overlay */}
                <div className="absolute inset-0 bg-lime-500/5 pointer-events-none z-0"></div>

                {/* Image */}
                <img
                  src="/sahal-hero.png"
                  alt="Sahal"
                  className="object-cover md:object-contain scale-[1.05] md:scale-125 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10 transition-transform duration-700 object-bottom translate-y-6 md:translate-y-6 lg:translate-y-8"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. INFINITE TECH MARQUEE (Responsive & Functional) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 w-full overflow-hidden z-20 pointer-events-auto bg-[var(--theme-lime-400)] py-3 md:py-4"
      >
        {/* We duplicate the content to create a seamless loop */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-8 md:gap-16 whitespace-nowrap px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                {[
                  { name: "Next.js 15", solid: true },
                  { name: "Supabase", solid: false },
                  { name: "Gemini AI", solid: true },
                  { name: "WebGL", solid: false },
                  { name: "TypeScript", solid: true },
                  { name: "Tailwind", solid: false },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-8 md:gap-16 group cursor-none"
                  >
                    <span
                      className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${tech.solid ? "font-bold text-black/80" : "font-light text-black/50"}`}
                    >
                      {tech.name}
                    </span>
                    <span className="text-black/20 text-xs">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
