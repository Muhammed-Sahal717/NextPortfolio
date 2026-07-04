"use client";

import { FiCode } from "react-icons/fi";
import AnimatedCounter from "./AnimatedCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Noise from "@/components/animations/Noise"; // Kept for reference
// import { motion } from "framer-motion"; // Kept for reference

export default function AboutSummary() {
  return (
    <div className="flex flex-col justify-center h-full p-8 lg:p-12 relative overflow-hidden bg-background">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest w-max mb-6">
        Professional Summary
      </div>
      <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/80 max-w-3xl">
        <span className="text-foreground font-bold">BCA graduate</span> and <span className="text-foreground font-bold">Software Developer</span> experienced in building full-stack web applications using React, Next.js, TypeScript, Node.js, and PostgreSQL.
        <br /><br />
        Skilled in developing AI-powered tools, secure authentication systems, and cloud-deployed architectures. Passionate about crafting scalable software for modern engineering teams.
      </p>
    </div>
  );
}

