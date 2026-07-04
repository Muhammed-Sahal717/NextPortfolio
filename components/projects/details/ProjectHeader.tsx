import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/button";

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
          <Button asChild className="rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:scale-105 transition-transform duration-300 group">
            <Link href={demoUrl} target="_blank">
              Live Demo{" "}
              <FiExternalLink className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg font-medium group">
            <Link href={githubUrl} target="_blank">
              <FiGithub className="mr-2" /> Source Code
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
