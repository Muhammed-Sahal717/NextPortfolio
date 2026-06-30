"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";
import { getCleanImages } from "./projectUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const allImages = getCleanImages(project.image_url, project.gallery_images);

  return (
    <section
      className={`group mb-12 flex w-full flex-col gap-8 rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-[var(--theme-lime-400)] dark:border-white/20 dark:bg-black/20 dark:hover:border-[var(--theme-lime-400)] md:gap-12 md:p-10 lg:flex-row`}
    >
      <div className="flex w-full flex-col justify-center lg:w-1/2">
        <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)]">
          0{index + 1}. Featured Project
        </span>
        <div className="mb-6 flex items-center justify-start gap-4">
          <Link href={`/projects/${project.slug}`}>
            <h2 className="text-4xl font-semibold text-zinc-900 transition-colors hover:text-[var(--theme-lime-400)] dark:text-white dark:hover:text-[var(--theme-lime-400)] md:text-5xl">
              {project.title}
            </h2>
          </Link>
          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 transition-all duration-300 hover:scale-110 hover:border-[var(--theme-lime-400)] hover:bg-[var(--theme-lime-400)] dark:border-white/10 dark:bg-white/5 dark:hover:border-[var(--theme-lime-400)] dark:hover:bg-[var(--theme-lime-400)]"
              aria-label="View Project Details"
            >
              <FiArrowUpRight className="text-2xl text-zinc-600 transition-transform duration-300 group-hover:rotate-45 group-hover:text-white dark:text-zinc-300" />
            </Link>
          )}
        </div>
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
              className="flex items-center gap-2 text-lg font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              Live Demo <FiArrowUpRight />
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
      <div className="relative mt-8 w-full aspect-video overflow-hidden rounded-2xl border border-dashed border-zinc-300 dark:border-white/20 lg:mt-0 lg:w-1/2 lg:aspect-auto lg:min-h-[400px] shadow-2xl">
        <ProjectCarousel images={allImages} />
      </div>
    </section>
  );
}
