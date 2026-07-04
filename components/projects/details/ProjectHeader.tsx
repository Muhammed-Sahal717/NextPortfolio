import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 bg-transparent">
      <div className="max-w-3xl">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack?.map((tech: string) => (
            <Badge key={tech} variant="outline" className="px-3 py-1 text-xs font-medium bg-white/5 backdrop-blur-md border-zinc-200 dark:border-white/10">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex flex-row gap-3 lg:mt-0 shrink-0">
        {demoUrl && (
          <Button asChild>
            <Link href={demoUrl} target="_blank">
              Live Demo{" "}
              <FiExternalLink className="ml-2" size={16} />
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline">
            <Link href={githubUrl} target="_blank">
              <FiGithub className="mr-2" size={16} /> Source Code
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
