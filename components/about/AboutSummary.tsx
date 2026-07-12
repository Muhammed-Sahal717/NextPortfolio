"use client";


// import Noise from "@/components/animations/Noise"; // Kept for reference
// import { motion } from "framer-motion"; // Kept for reference

export default function AboutSummary() {
  return (
    <div className="flex flex-col justify-center h-full p-8 lg:p-12 relative overflow-hidden bg-background">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest w-max mb-6">
        Professional Summary
      </div>
      <p className="text-base md:text-xl font-medium leading-relaxed text-foreground/80 max-w-4xl text-justify md:text-left">
        I am a <span className="text-foreground font-bold">BCA graduate</span> and <span className="text-foreground font-bold">software development intern</span> focused on building clean, scalable web applications. I do not restrict myself to a specific tech stack; instead, I adapt quickly to whatever tools the project requires. My priority is writing highly performant code while delivering a smooth, polished user experience.
        <br /><br />
        To maximize my efficiency, I actively use AI tools in my workflow. I leverage them to generate boilerplate code, handle repetitive tasks, and break down complex ideas, which allows me to focus purely on problem-solving and logic. I am dedicated to honest, high-quality work and continuous growth.
      </p>
    </div>
  );
}

