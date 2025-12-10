"use client";

import { useState, useEffect } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiExternalLink,
  FiCode,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- ROBUST HELPER: PARSE SUPABASE IMAGE DATA ---
const getCleanImages = (
  imageColumn: unknown,
  galleryColumn: unknown
): string[] => {
  const images: string[] = [];

  // Function to process any input (String, Array, or Postgres Array String)
  const processEntry = (entry: unknown) => {
    if (!entry) return;

    if (Array.isArray(entry)) {
      // 1. It's a real JavaScript Array (Text[])
      entry.forEach((item) => processEntry(item));
    } else if (typeof entry === "string") {
      const trimmed = entry.trim();

      // 2. It's a Postgres Array String like {"url1", "url2"}
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        // Remove braces
        const inner = trimmed.slice(1, -1);
        // Split by comma (ignoring quotes)
        const urls = inner.split(",");
        urls.forEach((url) => {
          // Clean quotes and whitespace
          const cleanUrl = url.replace(/["']/g, "").trim();
          if (cleanUrl.startsWith("http")) images.push(cleanUrl);
        });
      }
      // 3. It's a standard single URL string
      else {
        const cleanUrl = trimmed.replace(/["']/g, "").trim();
        if (cleanUrl.startsWith("http")) images.push(cleanUrl);
      }
    }
  };

  // Process both columns
  processEntry(imageColumn);
  processEntry(galleryColumn);

  // Remove duplicates and return
  return Array.from(new Set(images));
};

// --- COMPONENT: PROJECT CARD ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract URLs using the new robust helper
  const allImages = getCleanImages(project.image_url, project.gallery_images);

  const activeImage =
    allImages.length > 0
      ? allImages[currentImageIndex % allImages.length]
      : null;

  useEffect(() => {
    if (!isHovered || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative w-full border-b border-zinc-800 overflow-hidden block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <div className="absolute inset-0 bg-white/2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
      <div className="absolute left-0 top-0 w-1 h-full bg-lime-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top z-10" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 px-4 md:px-8">
        {/* Index */}
        <div className="hidden lg:flex col-span-1 flex-col items-center justify-center border-r border-zinc-800/50 h-full pr-8">
          <span className="text-xs font-mono text-zinc-600 mb-2">ID</span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-zinc-700 to-zinc-900 group-hover:from-white group-hover:to-zinc-500 transition-all font-mono">
            0{index + 1}
          </span>
        </div>

        {/* Info */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-start justify-between mb-4 lg:hidden">
            <span className="font-mono text-xs text-lime-400">
              0{index + 1}PROJECT
            </span>
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-300 group-hover:text-white transition-colors tracking-tight mb-4 flex items-center gap-4">
            {project.title}
            <FiArrowUpRight className="text-2xl text-lime-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
          </h3>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {project.tech_stack?.slice(0, 4).map((tech: string) => (
              <div
                key={tech}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 group-hover:border-zinc-700 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-lime-500/50 group-hover:bg-lime-400" />
                <span className="text-xs font-mono uppercase text-zinc-400 group-hover:text-white tracking-wider">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Carousel */}
        <div className="col-span-1 lg:col-span-5 mt-6 lg:mt-0">
          <div className="relative h-64 lg:h-48 w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 transition-colors">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none" />

            {activeImage ? (
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${project.id}-${activeImage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeImage}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    unoptimized // Forces browser to load image directly (Fixes Private IP error)
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <FiCode className="text-zinc-700 text-4xl" />
                <span className="text-xs font-mono text-zinc-700 uppercase tracking-widest">
                  Visual Pending
                </span>
              </div>
            )}

            {/* Progress Dots */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                {allImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === currentImageIndex % allImages.length
                        ? "w-4 bg-lime-400"
                        : "w-1 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="absolute top-4 right-4 z-30 flex gap-2 -translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {project.github_url && (
                <div className="p-2 bg-black text-white rounded-lg hover:bg-lime-400 hover:text-black transition-colors shadow-lg">
                  <FiGithub />
                </div>
              )}
              {project.demo_url && (
                <div className="p-2 bg-white text-black rounded-lg hover:bg-lime-400 hover:text-black transition-colors shadow-lg">
                  <FiExternalLink />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- MAIN GRID ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="flex flex-col w-full border-t border-zinc-800">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
