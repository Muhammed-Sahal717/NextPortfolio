"use client";

import { useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiCode,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

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

// --- COMPONENT: OUTLINE SERIES CARD ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = getCleanImages(project.image_url, project.gallery_images);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : allImages.length - 1,
    );
  };

  return (
    <section className="group mb-12 flex w-full flex-col gap-8 rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-[var(--theme-lime-400)] dark:border-white/20 dark:bg-black/20 dark:hover:border-[var(--theme-lime-400)] md:gap-12 md:p-10 lg:flex-row">
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)]">
          0{index + 1}. Featured Project
        </span>
        <h2 className="mb-6 text-4xl font-semibold text-zinc-900 dark:text-white md:text-5xl">
          {project.title}
        </h2>
        <p className="mb-8 line-clamp-3 text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech_stack.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-200/80 bg-zinc-100 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-700 dark:border-zinc-700/50 dark:bg-black/30 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-6">
          {project.demo_url && (
            <Link
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 border-b border-[var(--theme-lime-400)] pb-1 text-lg font-medium text-zinc-900 transition-colors hover:text-[var(--theme-lime-400)] dark:text-white dark:hover:text-[var(--theme-lime-400)]"
            >
              Live Demo{" "}
              <FiArrowUpRight className="transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
            </Link>
          )}
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Source Code <FiGithub />
            </Link>
          )}
        </div>
      </div>
      <div className="carousel-container relative h-[300px] w-full overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl dark:bg-zinc-900 md:h-[400px] lg:w-1/2">
        <div
          className="carousel-inner flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {allImages.length > 0 ? (
            allImages.map((img, i) => (
              <div key={i} className="relative h-full w-full shrink-0">
                <Image
                  src={img}
                  alt={`${project.title} - ${i}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full shrink-0 items-center justify-center">
              <FiCode className="text-6xl text-zinc-400 dark:text-zinc-700" />
            </div>
          )}
        </div>
        {/* Floating Nav */}
        {allImages.length > 1 && (
          <div className="absolute bottom-6 left-6 right-6 flex justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={prevImage}
              className="prev flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all hover:scale-110 hover:bg-[var(--theme-lime-400)] hover:text-black dark:bg-zinc-900 dark:text-white dark:hover:bg-[var(--theme-lime-400)]"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="next flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all hover:scale-110 hover:bg-[var(--theme-lime-400)] hover:text-black dark:bg-zinc-900 dark:text-white dark:hover:bg-[var(--theme-lime-400)]"
            >
              <FiArrowRight className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- MAIN GRID COMPONENT ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col overflow-hidden px-4 py-20 md:px-8 lg:py-40 xl:px-12">
      {/* Decorative background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
