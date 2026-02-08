"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import LiquidNavbar from "@/components/LiquidNavbar";
import LiquidEther from "@/components/LiquidEther";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import {
  FiArrowRight,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiServer,
  FiActivity,
  FiX,
} from "react-icons/fi";
import Link from "next/link";

// --- COMPONENTS ---

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight relative z-10">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
      {children}
    </span>
  </h2>
);

// --- SCRAMBLE TEXT EFFECT ---
const ScrambleText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      setDisplayedText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3;
    }, 30); // Speed of scramble

    return () => clearInterval(intervalRef.current!);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};

// --- SECTIONS ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-24 pb-12 relative px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tighter mb-6 relative">
            <ScrambleText text="ENGINEERING" />
            <br />
            <span className="text-zinc-500">JOURNEY.</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
            className="w-24 h-1 bg-lime-400 rounded-full mb-8 origin-left"
          ></motion.div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
            I learn by building systems, experimenting with ideas, and refining
            my understanding through real projects. This page reflects how my
            technical thinking evolved while building modern web and AI-driven
            applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  phase,
  title,
  items,
  index,
}: {
  phase: string;
  title: string;
  items: string[];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16 relative pl-12 last:mb-0"
    >
      {/* Dot on the timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-[-6px] top-0 w-3 h-3 bg-lime-400 rounded-full shadow-[0_0_15px_rgba(163,230,53,1)] z-10"
      ></motion.div>

      <SpotlightCard className="p-8 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors">
        <span className="text-xs font-mono text-lime-400 mb-2 block tracking-widest uppercase opacity-80">
          {phase}
        </span>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-lime-300 transition-colors">
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-zinc-400 flex items-start gap-3 text-sm md:text-base"
            >
              <span className="w-1.5 h-1.5 bg-lime-500/50 rounded-full mt-2 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </SpotlightCard>
    </motion.div>
  );
};

const LearningEvolution = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={ref} className="py-32 px-6 max-w-4xl mx-auto relative">
      <SectionHeading>Learning Evolution</SectionHeading>

      <div className="mt-16 relative">
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-800" />
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-lime-400 via-green-500 to-transparent z-0"
        />

        <div className="relative z-10">
          <TimelineItem
            index={0}
            phase="Fundamentals — BCA"
            title="Building the Base"
            items={[
              "C programming and memory management fundamentals",
              "Java and object-oriented programming patterns",
              "Logic building, algorithms, and problem solving",
            ]}
          />
          <TimelineItem
            index={1}
            phase="Full Stack Development"
            title="Web Architecture"
            items={[
              "MERN stack (MongoDB, Express, React, Node) applications",
              "REST API architecture best practices",
              "Authentication, authorization, and deployment workflows",
            ]}
          />
          <TimelineItem
            index={2}
            phase="AI Integration Phase"
            title="Intelligence Layers"
            items={[
              "LLM API integration (OpenAI, Anthropic, Gemini)",
              "AI-assisted development workflow & prompt engineering",
              "Understanding RAG (Retrieval-Augmented Generation) concepts",
            ]}
          />
          <TimelineItem
            index={3}
            phase="Current Focus"
            title="System Maturity"
            items={[
              "AI-driven system experimentation & agentic workflows",
              "Detection-oriented workflows and security",
              "Performance optimization and scalable architecture decisions",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const ConceptCard = ({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <SpotlightCard className="p-6 h-full flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500">
      <div>
        <div className="mb-6 inline-flex items-center justify-center p-3 rounded-xl bg-lime-500/10 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold mb-3 text-white group-hover:text-lime-300 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
          {desc}
        </p>
      </div>
    </SpotlightCard>
  </motion.div>
);

const ConceptsGrid = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto">
    <div className="max-w-7xl mx-auto">
      <SectionHeading>Technical Concepts</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptCard
          index={0}
          icon={FiServer}
          title="Client–Server Architecture"
          desc="Deep understanding of stateless communication between distinct frontend, backend, and database layers."
        />
        <ConceptCard
          index={1}
          icon={FiDatabase}
          title="REST API Design"
          desc="Designing predictable, resource-oriented, and scalable API endpoints with proper status codes."
        />
        <ConceptCard
          index={2}
          icon={FiCode}
          title="Authentication Flow"
          desc="Secure login systems, JWT/Session handling, OAuth flows, and protected route middleware."
        />
        <ConceptCard
          index={3}
          icon={FiLayers}
          title="Deployment Workflow"
          desc="CI/CD pipelines, containerization (Docker), and deploying to platforms like Vercel and AWS."
        />
        <ConceptCard
          index={4}
          icon={FiCpu}
          title="Component-Based UI"
          desc="Building reusable, composable, and maintainable frontend component libraries and design systems."
        />
        <ConceptCard
          index={5}
          icon={FiActivity}
          title="AI Application Flow"
          desc="Orchestrating data retrieval, context injection, and LLM responses into cohesive user experiences."
        />
      </div>
    </div>
  </section>
);

const WorkflowStep = ({
  label,
  index,
  total,
}: {
  label: string;
  index: number;
  total: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      className="flex items-center gap-4 group"
    >
      <span className="text-sm md:text-base font-mono uppercase tracking-widest text-lime-400/70 group-hover:text-lime-400 transition-colors cursor-default">
        {label}
      </span>
      {index < total - 1 && (
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-white/20 group-hover:text-white/60 transition-colors"
        >
          <FiArrowRight />
        </motion.span>
      )}
    </motion.div>
  );
};

const WorkflowSection = () => (
  <section className="py-32 px-6 max-w-5xl mx-auto">
    <SpotlightCard className="relative overflow-hidden p-10 md:p-14 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white">
          How I Build Software
        </h2>
        <p className="text-xl text-zinc-300 mb-12 max-w-3xl leading-relaxed">
          My workflow focuses on{" "}
          <span className="text-lime-400 font-semibold">
            shipping working systems first
          </span>
          , then refining structure and performance through iteration. I break
          problems into smaller components, prototype quickly, and iterate based
          on real feedback.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-white/10">
          {["Idea", "Breakdown", "Prototype", "Test", "Refine"].map(
            (step, i, arr) => (
              <WorkflowStep
                key={step}
                label={step}
                index={i}
                total={arr.length}
              />
            ),
          )}
        </div>
      </div>

      {/* Background decorative glow */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </SpotlightCard>
  </section>
);

const NoteCard = ({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer h-full"
      >
        <SpotlightCard className="p-6 h-full border border-white/5 hover:border-lime-500/30 transition-all duration-300 group">
          <h3 className="font-bold mb-4 flex justify-between items-start text-lg">
            {title}
            <FiArrowRight className="text-lime-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
          <p className="text-zinc-500 text-sm line-clamp-3 group-hover:text-zinc-400 transition-colors">
            {content}
          </p>
          <div className="mt-4 text-xs font-mono text-lime-500/70 group-hover:text-lime-400">
            READ MORE
          </div>
        </SpotlightCard>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl overflow-hidden"
            >
              {/* Modal decorative blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <FiX size={20} />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-lime-400 pr-8">
                {title}
              </h3>
              <div className="text-zinc-300 leading-relaxed text-base space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p>{content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const EngineeringNotes = () => (
  <section className="py-32 px-6 max-w-7xl mx-auto">
    <SectionHeading>Engineering Notes</SectionHeading>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NoteCard
        index={0}
        title="Auth Flow Understanding"
        content="Authentication isn't just about login screens. It's about stateless sessions (JWTs), secure cookie handling (HttpOnly), minimizing token payload size, and handling refresh tokens silently to keep the user experience smooth while maintaining security. Understanding the difference between authentication (who you are) and authorization (what you can do) is critical."
      />
      <NoteCard
        index={1}
        title="RAG Explained"
        content="Retrieval-Augmented Generation (RAG) bridges the gap between static LLM knowledge and real-time private data. By embedding documents into vectors and storing them in a vector DB (like pgvector or Pinecone), we can fetch relevant context *before* sending a prompt to the AI. This dramatically reduces hallucinations and makes the AI actually useful for specific domains."
      />
      <NoteCard
        index={2}
        title="API Error Handling"
        content="Good error handling means never exposing stack traces to the client. I wrap API logic in try/catch blocks and return standardized error objects (e.g., { error: { code: 'VALIDATION_ERROR', message: '...' } }) so the frontend can handle them gracefully. Graceful degradation is key—if one service fails, the whole app shouldn't crash."
      />
      <NoteCard
        index={3}
        title="My Debugging Approach"
        content="I follow a binary search method for debugging: Isolate the system half by half. Is it the frontend sending wrong data? Or the backend failing to parse it? Logging inputs and outputs at the API boundary is usually the fastest way to find the root cause. I also rely heavily on reproducing the issue in a controlled environment before fixing."
      />
    </div>

    <div className="mt-12 text-center">
      <Link
        href="/engineering/notes"
        className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-mono uppercase tracking-widest text-sm group"
      >
        View Full Engineering Notes
        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
);

const CurrentlyLearning = () => (
  <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden bg-black/40">
    <div className="absolute inset-0 bg-lime-500/5 blur-[100px] pointer-events-none"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-10">
        Currently Exploring
      </h3>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-lg md:text-2xl font-light text-zinc-300">
        <span className="hover:text-lime-400 transition-colors cursor-default">
          System design fundamentals
        </span>
        <span className="text-lime-500/30 font-thin">•</span>
        <span className="hover:text-lime-400 transition-colors cursor-default">
          AI evaluation techniques
        </span>
        <span className="text-lime-500/30 font-thin">•</span>
        <span className="hover:text-lime-400 transition-colors cursor-default">
          Performance optimization
        </span>
      </div>
    </div>
  </section>
);

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30">
      <LiquidNavbar />

      {/* Background Liquid Effect */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <LiquidEther
          colors={["#D0F0C0", "#000000"]}
          isViscous={true}
          viscous={15}
          mouseForce={8}
          cursorSize={80}
          dt={0.016}
          resolution={0.35}
          iterationsViscous={16}
          iterationsPoisson={16}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <LearningEvolution />
        <ConceptsGrid />
        <WorkflowSection />
        <EngineeringNotes />
        <CurrentlyLearning />
        <Footer />
      </div>
    </main>
  );
}
