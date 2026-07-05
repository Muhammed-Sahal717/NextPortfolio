import { supabase } from "@/lib/supabaseClient";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import ProjectHeader from "@/components/projects/details/ProjectHeader";
import ProjectSidebar from "@/components/projects/details/ProjectSidebar";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .single();
  return {
    title: project ? project.title : "Project Not Found",
    description: project?.description,
  };
}

// Robust URL Parser
const extractUrls = (input: unknown): string[] => {
  if (!input) return [];
  const urls: string[] = [];
  const process = (entry: unknown) => {
    if (typeof entry === "string") {
      const cleaned = entry.replace(/[{}"\\]/g, "");
      cleaned.split(",").forEach((u) => {
        const trimmed = u.trim();
        if (trimmed.startsWith("http")) urls.push(trimmed);
      });
    } else if (Array.isArray(entry)) {
      entry.forEach(process);
    }
  };
  process(input);
  return urls;
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) return notFound();

  // Combine all images for the carousel
  const mainImages = extractUrls(project.image_url);
  const galleryImages = extractUrls(project.gallery_images);
  const allProjectImages = Array.from(
    new Set([...mainImages, ...galleryImages])
  );

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground pb-32">
      {/* 1. SIMPLE TOP NAV */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-background border-b border-dashed border-zinc-200 dark:border-zinc-800 shadow-md">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-6 lg:px-16">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />{" "}
            Back to Projects
          </Link>
          
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-6 pt-32 lg:px-16">
        {/* SINGLE BOARD WRAPPER */}
        <div className="border border-border rounded-[2rem] overflow-hidden bg-card flex flex-col shadow-sm">
          
          {/* 1. HERO HEADER */}
          <div className="border-b border-border">
            <ProjectHeader
              title={project.title}
              description={project.description}
              techStack={project.tech_stack}
              demoUrl={project.demo_url}
              githubUrl={project.github_url}
            />
          </div>

          {/* 2. MAIN GRID (Carousel + Content vs Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-transparent relative">
            {/* LEFT COLUMN: Carousel + Content (8 Cols) */}
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
              
              {/* Carousel Section */}
              <div className="w-full aspect-video relative border-b border-border bg-black overflow-hidden">
                <ProjectCarousel images={allProjectImages} />
              </div>

              {/* Main Content Section */}
              <div className="p-8 md:p-12">
                <div
                  className="prose max-w-none 
                    dark:prose-invert
                    prose-headings:font-semibold prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed 
                    prose-li:text-muted-foreground
                    prose-strong:text-foreground
                    prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-border prose-code:before:content-none prose-code:after:content-none
                    prose-a:text-primary hover:prose-a:underline hover:prose-a:opacity-80
                  "
                >
                  <ReactMarkdown>
                    {project.content || "No detailed description provided."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar (4 Cols) */}
            <div className="lg:col-span-4 bg-muted/20">
              <ProjectSidebar
                title={project.title}
                category={project.category}
                timeline={project.timeline}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
