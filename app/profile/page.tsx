"use client";

import React from "react";
import LiquidNavbar from "@/components/navbar/LiquidNavbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";
import { FiBriefcase, FiCpu, FiMessageSquare } from "react-icons/fi";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileStack from "@/components/profile/ProfileStack";
import ProfileConnect from "@/components/profile/ProfileConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { id: "overview", label: "Overview", icon: <FiBriefcase /> },
  { id: "stack", label: "Tech Stack", icon: <FiCpu /> },
  { id: "connect", label: "Connect", icon: <FiMessageSquare /> },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800 overflow-hidden">
      <LiquidNavbar />

      <div className="relative pt-32 pb-32 px-6 lg:px-16 w-full max-w-[100rem] mx-auto z-10 min-h-[90vh]">
        {/* Header */}
        <header className="mb-16 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-foreground"
          >
            PROFILE
          </motion.h1>
        </header>

        {/* Tab Navigation & Content */}
        <Tabs defaultValue="overview" className="w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-16"
          >
            <TabsList className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 h-auto p-1.5 rounded-2xl shadow-xl">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-sm text-zinc-400 font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Content Area */}
          <div className="relative z-10">
            <TabsContent value="overview" className="mt-0 outline-none">
              <ProfileOverview />
            </TabsContent>
            <TabsContent value="stack" className="mt-0 outline-none">
              <ProfileStack />
            </TabsContent>
            <TabsContent value="connect" className="mt-0 outline-none">
              <ProfileConnect />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Footer />
    </main>
  );
}
