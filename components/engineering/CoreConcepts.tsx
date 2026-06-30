"use client";

import { motion } from "framer-motion";
import { FiServer, FiDatabase, FiCode } from "react-icons/fi";

const concepts = [
  {
    title: "Client-Server",
    icon: FiServer,
    desc: "Stateless communication and architecture.",
  },
  {
    title: "REST APIs",
    icon: FiDatabase,
    desc: "Predictable, scalable endpoint design.",
  },
  {
    title: "Auth Flows",
    icon: FiCode,
    desc: "JWT, Session, and OAuth security.",
  },
];

export default function CoreConcepts() {
  return (
    <div className="mt-32 border-t border-zinc-800/50 pt-24 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Core Concepts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {concepts.map((concept, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-[var(--theme-lime-400)]/20 transition-colors group"
          >
            <concept.icon className="text-2xl text-zinc-500 mb-6 group-hover:text-[var(--theme-lime-400)] transition-colors" />
            <h3 className="text-lg font-bold text-white mb-2">
              {concept.title}
            </h3>
            <p className="text-zinc-500 text-sm font-light">{concept.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
