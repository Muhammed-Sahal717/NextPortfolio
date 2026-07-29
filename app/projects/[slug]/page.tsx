import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import ProjectNavigation from "@/components/projects/details/ProjectNavigation";
import ProjectHero from "@/components/projects/details/ProjectHero";
import ProjectBrowserShowcase from "@/components/projects/details/ProjectBrowserShowcase";
import ProjectContentRenderer from "@/components/projects/details/ProjectContentRenderer";
import ProjectBottomCTA from "@/components/projects/details/ProjectBottomCTA";
import ProjectInfoPanel from "@/components/projects/details/ProjectInfoPanel";
import {
  formatProjectDocumentation,
  getProjectDocumentation,
  extractNavSections,
} from "@/lib/project-docs";

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
    title: project ? `${project.title} | Sahal's Portfolio` : "Project Not Found",
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
  const [{ data: project }, documentation] = await Promise.all([
    supabase
      .from("projects")
      .select(
        "id, title, slug, description, tech_stack, demo_url, github_url, image_url, gallery_images, category, timeline, status"
      )
      .eq("slug", slug)
      .single(),
    getProjectDocumentation(slug),
  ]);

  if (!project) return notFound();

  const projectDocumentation = documentation
    ? formatProjectDocumentation(documentation)
    : null;

  const navSections = projectDocumentation
    ? extractNavSections(projectDocumentation)
    : [];

  // Combine all images for the browser showcase / carousel
  const mainImages = extractUrls(project.image_url);
  const galleryImages = extractUrls(project.gallery_images);
  const allProjectImages = Array.from(
    new Set([...mainImages, ...galleryImages])
  );

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/20 selection:text-emerald-500 pb-32">
      {/* 1. TOP NAV BAR */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-12">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 2. MAIN THREE-COLUMN LAYOUT CONTAINER */}
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-12 pt-28">
        
        {/* MOBILE / TABLET HORIZONTAL STICKY CHIPS (Visible <1024px) */}
        {navSections.length > 0 && (
          <div className="lg:hidden sticky top-16 z-[900] bg-background/95 backdrop-blur-md py-3 mb-6 border-b border-border/40 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase shrink-0 mr-1">
              Sections:
            </span>
            {navSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="text-xs px-3 py-1 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 shrink-0 transition-colors"
              >
                {sec.label}
              </a>
            ))}
          </div>
        )}

        {/* 3-COLUMN DESKTOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* LEFT COLUMN: Sticky Table of Contents (3 Cols on lg / 2.5 on xl) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-28 self-start">
            <ProjectNavigation projectName={project.title} sections={navSections} />
          </div>

          {/* CENTER COLUMN: Main Case Study Content (6 Cols on lg / 6.5 on xl) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 space-y-8">
            {/* Hero Header */}
            <ProjectHero
              title={project.title}
              description={project.description}
              techStack={project.tech_stack}
              demoUrl={project.demo_url}
              githubUrl={project.github_url}
            />

            {/* Browser Showcase / Screenshot Carousel */}
            <ProjectBrowserShowcase
              images={allProjectImages}
              title={project.title}
              demoUrl={project.demo_url}
            />

            {/* Structured Content Presentation */}
            {projectDocumentation && (
              <ProjectContentRenderer documentation={projectDocumentation} />
            )}

            {/* Bottom Centered CTA */}
            <ProjectBottomCTA
              title={project.title}
              demoUrl={project.demo_url}
              githubUrl={project.github_url}
            />
          </div>

          {/* RIGHT COLUMN: Sticky Info Panel (3 Cols on lg / 3 on xl) */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-3 lg:sticky lg:top-28 self-start">
            <ProjectInfoPanel
              title={project.title}
              category={project.category}
              timeline={project.timeline}
              status={project.status}
              techStack={project.tech_stack}
              demoUrl={project.demo_url}
              githubUrl={project.github_url}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
