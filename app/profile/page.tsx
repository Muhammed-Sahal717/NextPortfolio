"use client";

import React, { useState } from "react";
import LiquidNavbar from "@/components/sections/LiquidNavbar";
import Footer from "@/components/sections/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiBriefcase, FiCpu, FiMessageSquare, FiFileText, FiServer, FiDatabase } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGooglegemini,
  SiGithub,
  SiLinkedin,
} from "react-icons/si";

type TabId = "overview" | "stack" | "connect";

const tabs = [
  { id: "overview", label: "Overview", icon: <FiBriefcase /> },
  { id: "stack", label: "Tech Stack", icon: <FiCpu /> },
  { id: "connect", label: "Connect", icon: <FiMessageSquare /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30 overflow-hidden">
      <LiquidNavbar />

      <div className="relative pt-32 pb-32 px-6 lg:px-16 w-full max-w-[100rem] mx-auto z-10 min-h-[90vh]">
        
        {/* Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600"
          >
            PROFILE
          </motion.h1>
        </header>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 md:gap-4 mb-12 relative z-10 border-b border-zinc-800/50 pb-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-lime-500/10 text-lime-400 border border-lime-500/20" 
                  : "bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content Area */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
              >
                {/* Left: Summary */}
                <div>
                  <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">Core Summary</h3>
                  <div className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    <span className="text-white font-medium">Full Stack Engineer</span> focused on building scalable web systems and integrating AI into real-world applications. Strong in performance, architecture, and maintainable system design.
                  </div>
                </div>

                {/* Right: Education */}
                <div>
                  <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">Education</h3>
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
                    <div className="inline-block px-3 py-1 bg-lime-500/10 text-lime-400 font-mono text-xs rounded-full mb-4">
                      2023 - 2026
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Applications</h4>
                    <p className="text-zinc-500 flex items-center gap-2">
                      <FiMapPin className="text-lime-500/50" />
                      MCAS Vengara, Malappuram, Kerala
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TECH STACK TAB */}
            {activeTab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* Frontend */}
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
                  <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400"><SiReact /></span>
                    Frontend
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiReact className="text-zinc-500" /> React</span><span className="text-lime-400 text-xs font-mono">Advanced</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiNextdotjs className="text-zinc-500" /> Next.js</span><span className="text-lime-400 text-xs font-mono">Advanced</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiTypescript className="text-zinc-500" /> TypeScript</span><span className="text-lime-400 text-xs font-mono">Proficient</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiTailwindcss className="text-zinc-500" /> Tailwind CSS</span><span className="text-lime-400 text-xs font-mono">Advanced</span></li>
                  </ul>
                </div>

                {/* Backend */}
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
                  <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400"><SiNodedotjs /></span>
                    Backend
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiNodedotjs className="text-zinc-500" /> Node.js</span><span className="text-lime-400 text-xs font-mono">Proficient</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><FiServer className="text-zinc-500" /> Express</span><span className="text-lime-400 text-xs font-mono">Proficient</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiPostgresql className="text-zinc-500" /> PostgreSQL</span><span className="text-lime-400 text-xs font-mono">Intermediate</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><FiDatabase className="text-zinc-500" /> REST APIs</span><span className="text-lime-400 text-xs font-mono">Advanced</span></li>
                  </ul>
                </div>

                {/* DevOps & AI */}
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-lime-500/20 transition-colors">
                  <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400"><SiDocker /></span>
                    DevOps & AI
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiDocker className="text-zinc-500" /> Docker</span><span className="text-lime-400 text-xs font-mono">Intermediate</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><SiGooglegemini className="text-zinc-500" /> Gemini API</span><span className="text-lime-400 text-xs font-mono">Proficient</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><FiMessageSquare className="text-zinc-500" /> Prompt Eng.</span><span className="text-lime-400 text-xs font-mono">Advanced</span></li>
                    <li className="flex items-center justify-between text-zinc-400"><span className="flex items-center gap-2"><FiDatabase className="text-zinc-500" /> RAG Configs</span><span className="text-lime-400 text-xs font-mono">Intermediate</span></li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* CONNECT TAB */}
            {activeTab === "connect" && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <a 
                  href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"} 
                  target="_blank" rel="noopener noreferrer"
                  className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
                >
                  <SiGithub className="text-4xl text-zinc-400 group-hover:text-white transition-colors" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-1">GitHub</div>
                    <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Code</div>
                  </div>
                </a>

                <a 
                  href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"} 
                  target="_blank" rel="noopener noreferrer"
                  className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
                >
                  <SiLinkedin className="text-4xl text-zinc-400 group-hover:text-[#0A66C2] transition-colors" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-1">LinkedIn</div>
                    <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">Network</div>
                  </div>
                </a>

                <a 
                  href="https://orbdarymycthwezfodwb.supabase.co/storage/v1/object/public/resume/resume_muhammedsahal_v1_0_0-3.pdf" 
                  target="_blank" rel="noopener noreferrer"
                  className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-lime-500/30 hover:bg-zinc-900/80 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300"
                >
                  <FiFileText className="text-4xl text-zinc-400 group-hover:text-lime-400 transition-colors" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-white mb-1">Resume</div>
                    <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">PDF</div>
                  </div>
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
