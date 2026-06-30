"use client";

import React, { useState } from "react";
import LiquidNavbar from "@/components/navbar/LiquidNavbar";
import Footer from "@/components/footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiCpu, FiMessageSquare } from "react-icons/fi";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileStack from "@/components/profile/ProfileStack";
import ProfileConnect from "@/components/profile/ProfileConnect";

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
            {activeTab === "overview" && <ProfileOverview />}
            {activeTab === "stack" && <ProfileStack />}
            {activeTab === "connect" && <ProfileConnect />}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
