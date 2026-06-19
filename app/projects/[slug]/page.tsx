import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ClientButton from "@/components/ClientButton";
import ProjectCarousel from "@/components/ProjectCarousel";

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
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> RETURN_TO_BASE
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-6 pt-32 lg:px-16">
        {/* 2. HERO HEADER (Bento Grid Style) */}
        <div className="mb-12 rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-8 backdrop-blur-sm dark:border-white/20 dark:bg-black/20 md:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-4xl">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech_stack?.map((tech: string) => (
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
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 lg:mt-0 shrink-0">
            {project.demo_url && (
              <Link
                href={project.demo_url}
                target="_blank"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--theme-lime-400)] text-black rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Live Demo{" "}
                <FiExternalLink className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            )}
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-100 border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg hover:bg-zinc-200 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                <FiGithub /> Source Code
              </Link>
            )}
          </div>
        </div>

        {/* 3. VISUAL CAROUSEL */}
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-dashed border-zinc-300 dark:border-white/20 mb-12 relative shadow-2xl">
          <ProjectCarousel images={allProjectImages} />
        </div>

        {/* 4. DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Meta Data (4 Cols) */}
          <div className="lg:col-span-4 h-fit rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-8 backdrop-blur-sm dark:border-white/20 dark:bg-black/20 lg:sticky lg:top-24 space-y-8">
            <div>
              <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)] block">
                Category
              </span>
              <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
                <FiLayers className="text-[var(--theme-lime-400)]" />{" "}
                {project.category || "Engineering"}
              </div>
            </div>

            <div>
              <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)] block">
                Timeline
              </span>
              <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
                <FiCalendar className="text-[var(--theme-lime-400)]" />{" "}
                {project.timeline || "Completed"}
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
              <p className="text-sm text-zinc-500 mb-4">
                Curious about the implementation details?
              </p>
              <ClientButton
                projectName={project.title}
                className="w-full py-4 border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-[var(--theme-lime-400)] hover:text-black hover:border-[var(--theme-lime-400)] font-mono text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-[var(--theme-lime-400)] dark:hover:text-black dark:hover:border-[var(--theme-lime-400)]"
              >
                <FiZap size={14} /> Analyze Code
              </ClientButton>
            </div>
          </div>

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
