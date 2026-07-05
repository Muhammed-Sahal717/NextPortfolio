"use client";

import { motion } from "framer-motion";
import { FiServer, FiDatabase, FiCode } from "react-icons/fi";

const concepts = [
  {
    title: "Client-Server Architecture",
    icon: FiServer,
    desc: "Designing clean separation between frontend interfaces and backend services.",
  },
  {
    title: "API Development",
    icon: FiDatabase,
    desc: "Building reliable, well-documented REST endpoints for seamless data exchange.",
  },
  {
    title: "Authentication",
    icon: FiCode,
    desc: "Implementing secure user sessions and authorization using industry-standard protocols.",
  },
];

export default function CoreConcepts() {
  return (
    <div className="mt-24 md:mt-32 pt-12 md:pt-24 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-left border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-6">
        Core Concepts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden shadow-sm">
        {concepts.map((concept, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background p-8 hover:bg-zinc-900/50 transition-colors group"
          >
            <concept.icon className="text-3xl text-zinc-500 mb-8 group-hover:text-white transition-colors" />
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-white transition-colors">
              {concept.title}
            </h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">{concept.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
