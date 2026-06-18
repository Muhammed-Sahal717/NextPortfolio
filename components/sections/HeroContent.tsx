"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroContent() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setResumeUrl(data.url);
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.4,
          },
        },
      }}
      className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto z-20"
    >
      {/* Status Badge */}
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
  );
}
