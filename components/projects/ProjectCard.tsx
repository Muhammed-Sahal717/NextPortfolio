"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";
import { getCleanImages } from "./projectUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="group flex flex-col lg:flex-row h-full overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-muted-foreground/30">
        
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
          <div>
            <CardHeader className="p-0 mb-6 flex flex-col gap-2">
              <Link href={`/projects/${project.slug}`} className="w-fit">
                <CardTitle className="text-3xl font-bold transition-colors group-hover:text-primary">
                  {project.title}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-4 text-base text-muted-foreground mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {/* Tech Stack */}
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech_stack.slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full bg-muted/50 border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </div>

          <CardFooter className="p-0 flex items-center gap-6 mt-auto">
            {project.demo_url && (
              <Link
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Live Demo <FiArrowUpRight />
              </Link>
            )}
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Source <FiGithub />
              </Link>
            )}
          </CardFooter>
        </div>

        {/* Right Side: Image Carousel */}
        <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto flex">
          <div className="w-full h-full min-h-[300px]">
            <ProjectCarousel images={allImages} />
          </div>
        </div>

      </Card>
    </motion.div>
  );
}
