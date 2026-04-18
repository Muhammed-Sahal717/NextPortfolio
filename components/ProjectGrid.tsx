"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
  FiCode,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// --- ROBUST HELPER: PARSE SUPABASE IMAGE DATA ---
const getCleanImages = (
  imageColumn: unknown,
  galleryColumn: unknown,
): string[] => {
  const images: string[] = [];

  const processEntry = (entry: unknown) => {
    if (!entry) return;

    if (Array.isArray(entry)) {
      entry.forEach((item) => processEntry(item));
      return;
    }

    if (typeof entry === "string") {
      const trimmed = entry.trim();

      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        const inner = trimmed.slice(1, -1);
        const urls = inner.split(",");
        urls.forEach((url) => {
          const cleanUrl = url.replace(/["']/g, "").trim();
          if (cleanUrl.startsWith("http")) images.push(cleanUrl);
        });
      } else {
        const cleanUrl = trimmed.replace(/["']/g, "").trim();
        if (cleanUrl.startsWith("http")) images.push(cleanUrl);
      }
    }
  };

  processEntry(imageColumn);
  processEntry(galleryColumn);

  return Array.from(new Set(images));
};

// --- COMPONENT: 3D PARALLAX ROLL CARD ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0],
  );
  const z = useTransform(smoothProgress, [0, 0.5, 1], [-300, 0, -300]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [150, 0, -150]);

  const imageY = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const titleY = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);

  const allImages = getCleanImages(project.image_url, project.gallery_images);

  const activeImage =
    allImages.length > 0
      ? allImages[currentImageIndex % allImages.length]
      : null;

  useEffect(() => {
    if (!isHovered || allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  return (
    <div
      ref={containerRef}
      className="relative mb-24 flex min-h-[70vh] w-full origin-center items-center justify-center will-change-transform lg:mb-32 [perspective:1500px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
          z,
          y,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          group relative flex h-auto min-h-[600px] w-full flex-col overflow-hidden
          rounded-[2rem] border border-zinc-200/80 bg-white/85 backdrop-blur-2xl
          shadow-[0_10px_30px_rgba(0,0,0,0.06)]
          dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)]
          lg:h-[70vh] lg:flex-row
        "
      >
        {/* Cinematic Backdrop Image inside Card */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2rem] opacity-5 dark:opacity-20">
          {activeImage && (
            <motion.div
              style={{ y: imageY }}
              className="relative -top-[25%] h-[150%] w-full scale-125 blur-xl"
            >
              <Image
                src={activeImage}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized
              />
            </motion.div>
          )}
        </div>

        {/* Dynamic Light Reflection Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(1000px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.04), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-50 rounded-[2rem] opacity-0 transition-opacity duration-1000 dark:group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(1000px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 50%)",
          }}
        />

        {/* Content Section */}
        <div className="relative z-10 flex w-full flex-col justify-between p-8 lg:w-1/2 lg:p-12 xl:p-16">
          <motion.div style={{ y: titleY }} className="w-full">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-full bg-zinc-900 px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-md dark:bg-zinc-100 dark:text-black">
                0{index + 1} // System
              </div>
              <div className="h-px flex-grow bg-zinc-300 dark:bg-zinc-700/50" />
            </div>

            <h3 className="mb-6 break-words text-4xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-zinc-950 to-zinc-600 dark:from-white dark:to-zinc-400 md:text-5xl lg:text-6xl">
              {project.title}
            </h3>

            <p className="max-w-xl text-base leading-relaxed text-zinc-700 font-light dark:text-zinc-300 md:text-lg lg:text-xl">
              {project.description}
            </p>
          </motion.div>

          <div className="mt-8 space-y-8">
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.slice(0, 5).map((tech: string) => (
                <span
                  key={tech}
                  className="cursor-default rounded-full border border-zinc-200/80 bg-zinc-100 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-700 shadow-sm transition-all hover:scale-105 hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-black/30 dark:text-zinc-200 dark:hover:bg-zinc-800/80 sm:text-xs backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="group/btn flex items-center justify-center gap-3 rounded-xl bg-[var(--theme-lime-400)] px-6 py-3 font-bold uppercase tracking-[0.1em] text-black shadow-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(163,230,53,0.28)] active:scale-95 md:px-8 md:py-4"
              >
                Deep Dive
                <FiArrowUpRight className="text-xl transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
              </Link>

              {project.github_url && (
                <Link
                  href={project.github_url}
                  className="rounded-xl border border-zinc-200 bg-zinc-100 p-3 text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:border-[var(--theme-lime-400)] hover:bg-[var(--theme-lime-400)] hover:text-black dark:border-zinc-700/50 dark:bg-black/30 dark:text-zinc-400 dark:hover:bg-[var(--theme-lime-400)] dark:hover:text-black md:p-4"
                >
                  <FiGithub className="text-xl" />
                </Link>
              )}

              {project.demo_url && (
                <Link
                  href={project.demo_url}
                  className="rounded-xl border border-zinc-200 bg-zinc-100 p-3 text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:border-[var(--theme-lime-400)] hover:bg-[var(--theme-lime-400)] hover:text-black dark:border-zinc-700/50 dark:bg-black/30 dark:text-zinc-400 dark:hover:bg-[var(--theme-lime-400)] dark:hover:text-black md:p-4"
                >
                  <FiExternalLink className="text-xl" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Visual/Image Section */}
        <div className="relative z-10 mt-auto h-[40vh] w-full overflow-hidden border-t border-zinc-200/50 bg-zinc-100 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-900 md:h-[50vh] lg:mt-0 lg:h-full lg:w-1/2 lg:border-l lg:border-t-0">
          <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

          {activeImage ? (
            <motion.div
              style={{ y: imageY }}
              className="absolute left-0 top-[-25%] h-[150%] w-full"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={activeImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover will-change-transform transition-all duration-[3000ms] ease-out"
                    style={{
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      filter: isHovered
                        ? "brightness(1.05) contrast(1.1)"
                        : "brightness(0.92) contrast(1)",
                    }}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-zinc-100 dark:bg-zinc-900">
              <FiCode className="text-6xl text-zinc-400 dark:text-zinc-700" />
              <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">
                System Awaiting Visuals
              </span>
            </div>
          )}

          {/* Hover Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-white/45 via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:from-black/40 dark:via-transparent" />

          {/* Interactive Pagination Indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-8 right-8 z-40 flex flex-col gap-3 rounded-full bg-white/55 p-4 shadow-2xl backdrop-blur-xl opacity-0 translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-0 dark:bg-black/20">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(i);
                  }}
                  onMouseEnter={() => setCurrentImageIndex(i)}
                  className={`w-2.5 rounded-full transition-all duration-500 ${
                    i === currentImageIndex
                      ? "h-10 bg-zinc-950 shadow-[0_0_15px_rgba(255,255,255,0.45)] dark:bg-white dark:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      : "h-2.5 bg-zinc-500/40 hover:bg-zinc-700/70 dark:bg-white/40 dark:hover:bg-white/80"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN GRID COMPONENT ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col overflow-hidden px-4 py-20 md:px-8 xl:px-12 lg:py-40">
      {/* Decorative background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
