import { supabase } from "@/lib/supabaseClient";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import ProjectHeader from "@/components/projects/details/ProjectHeader";
import ProjectSidebar from "@/components/projects/details/ProjectSidebar";

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
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white font-sans selection:bg-[var(--theme-lime-400)]/30 pb-32">
      {/* 1. SIMPLE TOP NAV */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center px-6 lg:px-16">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />{" "}
            RETURN_TO_BASE
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-6 pt-32 lg:px-16">
        {/* 2. HERO HEADER (Bento Grid Style) */}
        <ProjectHeader
          title={project.title}
          description={project.description}
          techStack={project.tech_stack}
          demoUrl={project.demo_url}
          githubUrl={project.github_url}
        />

        {/* 3. VISUAL CAROUSEL */}
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-dashed border-zinc-300 dark:border-white/20 mb-12 relative shadow-2xl">
          <ProjectCarousel images={allProjectImages} />
        </div>

        {/* 4. DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Meta Data (4 Cols) */}
          <ProjectSidebar
            title={project.title}
            category={project.category}
            timeline={project.timeline}
          />

          {/* RIGHT: Main Content (8 Cols) */}
          <div className="lg:col-span-8 rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-8 md:p-12 backdrop-blur-sm dark:border-white/20 dark:bg-black/20">
            <div
              className="prose prose-zinc prose-lg max-w-none 
                dark:prose-invert
                prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-white 
                prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-8 
                prose-li:text-zinc-600 dark:prose-li:text-zinc-400
                prose-strong:text-zinc-900 dark:prose-strong:text-white
                prose-code:text-[var(--theme-lime-400)] prose-code:bg-zinc-100 dark:prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                prose-a:text-[var(--theme-lime-400)] hover:prose-a:text-[var(--theme-lime-500)]
              "
            >
              <ReactMarkdown>
                {project.content || "No detailed description provided."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
