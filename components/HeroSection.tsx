"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LiquidEther from "@/components/LiquidEther";
import LiquidNavbar from "@/components/LiquidNavbar";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* NAVBAR */}
      <LiquidNavbar />

      {/* BACKGROUND ANIMATION — Optimized & Smooth */}
      <div className="absolute inset-0 z-0 opacity-60">
        <LiquidEther
          colors={["#D0F0C0", "#ADFF2F"]}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl space-y-8 pointer-events-auto"
        >
          {/* Status Badge - Premium "Cyber-Chip" Design */}
          <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-6 group">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#a3e635_50%,#171717_100%)]" />
            <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-black/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl border border-white/10 group-hover:bg-black/80 transition-all duration-300">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              <span className="bg-gradient-to-r from-zinc-300 to-white bg-clip-text text-transparent font-semibold">
                Available for Work & Collaborations
              </span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]">
            Crafting the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 via-lime-300 to-[#aaf280] drop-shadow-[0_0_35px_rgba(163,230,53,0.55)]">
              Next-Gen Web.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mix-blend-screen">
            I am Sahal. A Web Developer merging modern web stacks with AI
            agents.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href="#projects">
              <Button
                size="lg"
                // FIXED: Added 'border border-white' and 'hover:bg-black' to create high-contrast invert effect
                className="rounded-full h-14 px-10 text-lg bg-white text-black border border-white font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-black hover:text-white transition-all duration-300"
              >
                View Work <FiArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link
              href={process.env.NEXT_PUBLIC_CONTACT_GITHUB!}
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 w-14 p-0 border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300"
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
                className="rounded-full h-14 w-14 p-0 border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* 4. INFINITE TECH MARQUEE (Responsive & Functional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 w-full overflow-hidden z-20 pointer-events-auto"
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
                      <span className="text-white/40 font-mono text-xs md:text-sm uppercase tracking-[0.2em] group-hover:text-lime-400 transition-colors duration-300">
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
