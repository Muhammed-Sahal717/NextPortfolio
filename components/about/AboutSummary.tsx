"use client";

import { FiCode } from "react-icons/fi";
import AnimatedCounter from "./AnimatedCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Noise from "@/components/animations/Noise"; // Kept for reference
// import { motion } from "framer-motion"; // Kept for reference

export default function AboutSummary() {
  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Summary Card */}
      <Card className="flex-1 flex flex-col justify-center relative overflow-hidden bg-muted/20 border-border">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <FiCode size={120} />
        </div>
        <CardHeader>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest w-max mb-2">
            Professional Summary
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80">
            <span className="text-foreground font-bold">BCA graduate</span> and <span className="text-foreground font-bold">Software Developer</span> experienced in building full-stack web applications using React, Next.js, TypeScript, Node.js, and PostgreSQL.
            <br /><br />
            Skilled in developing AI-powered tools, secure authentication systems, and cloud-deployed architectures. Passionate about crafting scalable software for modern engineering teams.
          </p>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:h-[140px]">
        {/* Experience */}
        <Card className="flex flex-col items-center justify-center p-6 bg-muted/20 border-border">
          <span className="block text-4xl xl:text-5xl font-black text-foreground relative z-10">
            <AnimatedCounter to={2} suffix="+" />
          </span>
          <span className="text-muted-foreground text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center mt-2 relative z-10">
            Years Experience
          </span>
        </Card>

        {/* Projects */}
        <Card className="flex flex-col items-center justify-center p-6 bg-muted/20 border-border">
          <span className="block text-4xl xl:text-5xl font-black text-foreground relative z-10">
            <AnimatedCounter to={15} suffix="+" />
          </span>
          <span className="text-muted-foreground text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center mt-2 relative z-10">
            Projects Completed
          </span>
        </Card>

        {/* Hours */}
        <Card className="flex flex-col items-center justify-center p-6 bg-muted/20 border-border">
          <span className="block text-4xl xl:text-5xl font-black text-foreground relative z-10">
            <AnimatedCounter to={1000} suffix="+" />
          </span>
          <span className="text-muted-foreground text-[10px] xl:text-xs font-bold uppercase tracking-wider text-center mt-2 relative z-10">
            Hours of Coding
          </span>
        </Card>
      </div>
    </div>
  );
}

