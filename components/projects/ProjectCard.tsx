"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { getCleanImages } from "./projectUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

 
export default function ProjectCard({
  project,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  index: number;
}) {
  const allImages = getCleanImages(project.image_url, project.gallery_images);
  const mainImage = allImages.length > 0 ? allImages[0] : null;

  return (
    <Card className="flex flex-col p-0 gap-0 h-full overflow-hidden border-none rounded-none shadow-none bg-background group transition-colors hover:bg-zinc-900/20">
      
      {/* Top: Image */}
      <CardContent className="p-0">
        <Link href={`/projects/${project.slug}`}>
          <div className="relative w-full aspect-video overflow-hidden bg-zinc-950">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={`${project.title} screenshot`}
                fill
                priority={true}
                unoptimized={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                No image available
              </div>
            )}
          </div>
        </Link>
      </CardContent>

      {/* Middle: Content */}
      <CardHeader className="flex flex-col flex-1 p-6 gap-3">
        <div>
          <Link href={`/projects/${project.slug}`} className="w-fit">
            <CardTitle className="text-2xl font-bold transition-colors group-hover:text-primary">
              {project.title}
            </CardTitle>
          </Link>
          <CardDescription className="line-clamp-3 text-sm text-muted-foreground mt-2 leading-relaxed">
            {project.description}
          </CardDescription>
        </div>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech_stack.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="secondary" className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-zinc-900 border-zinc-800/50">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      {/* Bottom: Actions */}
      <CardFooter className="p-6 pt-0 mt-auto flex flex-wrap items-center gap-3">
        {project.demo_url && (
          <Button asChild size="sm" className="gap-1.5 flex-1">
            <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
              Live Demo <FiArrowUpRight />
            </Link>
          </Button>
        )}
        {project.github_url && (
          <Button asChild variant="outline" size="sm" className="gap-1.5 flex-1">
            <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
              Source <FiGithub />
            </Link>
          </Button>
        )}
      </CardFooter>

    </Card>
  );
}
