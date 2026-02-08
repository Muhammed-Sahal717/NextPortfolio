"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import LiquidNavbar from "@/components/LiquidNavbar";
import CircuitBoard from "@/components/CircuitBoard";
import TiltCard from "@/components/TiltCard";
import Magnetic from "@/components/Magnetic";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import {
  FiArrowRight,
  FiX,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiActivity,
  FiServer,
  FiGlobe,
  FiShield,
  FiWifi,
  FiSearch,
  FiClock,
  FiTag,
  FiCheckCircle,
  FiAlertTriangle,
  FiBriefcase,
  FiLink,
} from "react-icons/fi";
import { NOTES, NoteItemProps, NoteCategory } from "./data";

// --- NOTE CARD & MODAL ---

const NoteModal = ({
  isOpen,
  onClose,
  note,
}: {
  isOpen: boolean;
  onClose: () => void;
  note: NoteItemProps | null;
}) => {
  if (!note) return null;

  const relatedNotes = note.relatedIds
    ? NOTES.filter((n) => note.relatedIds?.includes(n.id))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-10 max-w-3xl w-full relative shadow-[0_0_50px_rgba(132,204,22,0.1)] overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Modal decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10 z-50"
            >
              <FiX size={20} />
            </button>

            <div className="mb-6 shrink-0 relative z-10">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {note.icon && (
                  <div className="inline-flex items-center justify-center p-2 rounded-lg bg-lime-500/10 text-lime-400">
                    <note.icon size={20} />
                  </div>
                )}
                <span className="text-xs font-mono uppercase tracking-widest text-lime-500/70 border border-lime-500/20 px-2 py-0.5 rounded-full">
                  {note.category}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 border border-white/10 px-2 py-0.5 rounded-full">
                  {note.difficulty}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 border border-white/10 px-2 py-0.5 rounded-full">
                  {note.readingTime}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {note.title}
              </h3>
              {note.subtitle && (
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
                  {note.subtitle}
                </p>
              )}
            </div>

            <div className="text-zinc-300 leading-relaxed text-base space-y-6 overflow-y-auto pr-2 custom-scrollbar relative z-10 pb-8">
              {note.content}

              {/* Applied Learning Section */}
              {note.learnings && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-lime-400 font-bold text-sm uppercase tracking-wider">
                      <FiCheckCircle /> Reality
                    </div>
                    <p className="text-sm text-zinc-400">
                      {note.learnings.reality}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                      <FiAlertTriangle /> Mistakes
                    </div>
                    <p className="text-sm text-zinc-400">
                      {note.learnings.mistakes}
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                      <FiBriefcase /> Industry
                    </div>
                    <p className="text-sm text-zinc-400">
                      {note.learnings.industry}
                    </p>
                  </div>
                </div>
              )}

              {/* Resources Section */}
              {note.resources && note.resources.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-lime-400 mb-4 flex items-center gap-2">
                    <FiSearch size={16} />
                    Study Materials & Deep Dives
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {note.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-lime-500/30 rounded-xl transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-200 group-hover:text-lime-300 transition-colors">
                            {res.title}
                          </span>
                          <FiArrowRight className="text-zinc-500 group-hover:text-lime-400 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        {res.description && (
                          <span className="text-sm text-zinc-500 mt-1">
                            {res.description}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Notes Section */}
              {relatedNotes.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-lime-400 mb-4 flex items-center gap-2">
                    <FiLink size={16} />
                    Related Concepts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedNotes.map((relNote) => (
                      // Note: To make this clickable to switch notes, we would need to pass a handler
                      // For now we just display them. Or better, we can make them generic links if we had routing.
                      // Since we are using state for modal, we can't easily switch without passing setSelectedNote down.
                      // For this iteration, let's just display them as cards
                      <div
                        key={relNote.id}
                        className="p-4 bg-white/5 border border-white/5 rounded-xl opacity-75"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {relNote.icon && (
                            <relNote.icon
                              className="text-lime-500/50"
                              size={14}
                            />
                          )}
                          <span className="text-xs font-mono text-zinc-400">
                            {relNote.category}
                          </span>
                        </div>
                        <h5 className="font-semibold text-zinc-300 text-sm">
                          {relNote.title}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NoteCard = ({
  note,
  onClick,
}: {
  note: NoteItemProps;
  onClick: () => void;
}) => {
  const isFundamental = note.category === "Fundamentals";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: note.index * 0.05 }}
      onClick={onClick}
      className={`cursor-pointer h-full ${isFundamental ? "md:col-span-1" : ""}`}
    >
      <TiltCard className="h-full">
        <SpotlightCard
          className={`p-6 h-full flex flex-col justify-between group border transition-all duration-300 bg-white/5 hover:bg-white/10 ${
            isFundamental
              ? "border-lime-500/20 hover:border-lime-500/50 shadow-[0_0_30px_rgba(132,204,22,0.05)]"
              : "border-white/5 hover:border-lime-500/30"
          }`}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                {note.icon && (
                  <div
                    className={`${isFundamental ? "text-lime-400" : "text-lime-500/70"} group-hover:text-lime-400 transition-colors`}
                  >
                    <note.icon size={isFundamental ? 28 : 24} />
                  </div>
                )}
              </div>

              <FiArrowRight className="text-lime-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>

            <div className="flex gap-2 mb-3">
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  isFundamental
                    ? "bg-lime-500/10 text-lime-400 border-lime-500/20"
                    : "bg-white/5 text-zinc-500 border-white/10"
                }`}
              >
                {note.difficulty}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border bg-white/5 text-zinc-500 border-white/10">
                {note.readingTime}
              </span>
            </div>

            <h3
              className={`font-bold text-zinc-100 group-hover:text-lime-300 transition-colors mb-2 ${isFundamental ? "text-xl" : "text-lg"}`}
            >
              {note.title}
            </h3>
            {note.subtitle && (
              <p className="text-xs font-mono text-zinc-500 mb-3">
                {note.subtitle}
              </p>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-lime-500/50 group-hover:text-lime-400 transition-colors">
              READ NOTE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500/50 group-hover:bg-lime-400 transition-colors"></div>
          </div>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  );
};

// --- DATA & CONTENT ---

// --- MAIN PAGE COMPONENT ---

export default function EngineeringNotesPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const [selectedNote, setSelectedNote] = useState<NoteItemProps | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<NoteCategory | "All">(
    "All",
  );

  const categories: (NoteCategory | "All")[] = [
    "All",
    "Fundamentals",
    "Architecture",
    "AI",
    "Industry",
    "Philosophy",
    "Workflow",
  ];

  // Filter Logic
  const filteredNotes = NOTES.filter((note) => {
    const matchesCategory =
      activeCategory === "All" || note.category === activeCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30">
      <LiquidNavbar />

      {/* Background Liquid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CircuitBoard
          lineColor="rgba(255, 255, 255, 0.05)"
          pulseColor="rgba(163, 230, 53, 0.4)"
        />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section className="mb-24 relative">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-lime-400 font-mono tracking-widest text-sm mb-4 uppercase">
              Engineering Series
            </p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
              Engineering
              <br />
              Notes.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl border-l-2 border-lime-500/50 pl-6">
              Practical concepts, industry terms, and modern development ideas
              explained through my learning and building experience.
            </p>

            <div className="mt-12 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/5 max-w-3xl">
              <p className="text-zinc-300 leading-relaxed">
                While building projects and experimenting with modern tools, I
                realized that many industry terms sound complex but are actually
                simple once understood through real work. These notes reflect
                how I currently understand development, engineering workflows,
                and modern AI-driven software building.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SEARCH & FILTER BAR */}
        <section className="sticky top-24 z-40 mb-12 -mx-2 px-2 py-4 backdrop-blur-xl bg-black/60 border-y border-white/5">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-lime-400 transition-colors" />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-lime-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Categories */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <div className="flex items-center gap-2">
                {categories.map((cat) => (
                  <Magnetic key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap border ${
                        activeCategory === cat
                          ? "bg-lime-500 text-black border-lime-500 font-bold"
                          : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NOTES GRID */}
        <section className="mb-32 min-h-[50vh]">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NoteCard
                      note={note}
                      onClick={() => setSelectedNote(note)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-zinc-500 text-lg">
                    No notes found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="mt-4 text-lime-400 hover:text-lime-300 underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* FOOTER MESSAGE */}
        <section className="py-24 border-t border-white/10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Current Direction
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              I continue to explore system design, AI evaluation methods, and
              building reliable AI-assisted applications. My goal is to combine
              fast iteration with strong engineering fundamentals.
            </p>
          </motion.div>
        </section>
      </div>

      <Footer />

      {/* GLOBAL MODAL */}
      <NoteModal
        isOpen={!!selectedNote}
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />
    </main>
  );
}
