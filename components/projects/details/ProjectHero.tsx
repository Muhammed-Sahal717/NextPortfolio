import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectHeroProps {
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectHero({
  title,
  description,
  techStack,
  demoUrl,
  githubUrl,
}: ProjectHeroProps) {
  return (
    <section className="space-y-6 pb-4">
      {/* Technology Badges */}
      <div className="flex flex-wrap gap-2">
        {techStack?.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="font-mono text-xs px-3 py-1 bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
        {title}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {demoUrl && (
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm gap-2"
          >
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-muted font-medium gap-2"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
