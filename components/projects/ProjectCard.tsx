"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { getCleanImages } from "./projectUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
        
        {/* Left Side: Content (Moves to bottom on mobile) */}
        <div className="flex w-full flex-col justify-between lg:w-1/2 p-6 lg:p-10 lg:border-r border-border order-2 lg:order-1">
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
                    <Badge key={tech} variant="secondary" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </div>

          <CardFooter className="p-0 flex flex-wrap items-center gap-4 mt-auto">
            {project.demo_url && (
              <Button asChild variant="outline" size="sm" className="gap-1.5 rounded-full hover:border-primary hover:text-primary">
                <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  Live Demo <FiArrowUpRight />
                </Link>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="ghost" size="sm" className="gap-1.5 rounded-full text-muted-foreground hover:text-foreground">
                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                  Source <FiGithub />
                </Link>
              </Button>
            )}
          </CardFooter>
        </div>

        {/* Right Side: Image Carousel (Moves to top on mobile) */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10 bg-muted/10 border-b lg:border-b-0 border-border order-1 lg:order-2">
          {allImages.length > 0 ? (
            <Carousel opts={{ loop: true }} className="w-full max-w-full">
              <CarouselContent>
                {allImages.map((src: string, i: number) => (
                  <CarouselItem key={i}>
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border/50 shadow-sm bg-muted/20">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        priority={true}
                        unoptimized={true}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="hidden sm:flex left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background" />
                  <CarouselNext className="hidden sm:flex right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background" />
                </>
              )}
            </Carousel>
          ) : (
            <div className="w-full aspect-video rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground text-sm">
              No images available
            </div>
          )}
        </div>

      </Card>
    </motion.div>
  );
}
