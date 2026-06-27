import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectHeaderProps {
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectHeader({
  title,
  description,
  techStack,
  demoUrl,
  githubUrl,
}: ProjectHeaderProps) {
  return (
    <div className="mb-12 rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-8 backdrop-blur-sm dark:border-white/20 dark:bg-black/20 md:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-4xl">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack?.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-200/80 bg-zinc-100 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-700 dark:border-zinc-700/50 dark:bg-black/30 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[0.9]">
          {title}
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 lg:mt-0 shrink-0">
        {demoUrl && (
          <Link
            href={demoUrl}
            target="_blank"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--theme-lime-400)] text-black rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Live Demo{" "}
            <FiExternalLink className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        )}
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-100 border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg hover:bg-zinc-200 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            <FiGithub /> Source Code
          </Link>
        )}
      </div>
    </div>
  );
}
