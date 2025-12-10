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
    <main className="min-h-screen bg-black text-white font-sans selection:bg-lime-400 selection:text-black pb-32">
      {/* 1. SIMPLE TOP NAV */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <FiArrowLeft /> RETURN_TO_BASE
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* 2. HERO HEADER (Product Launch Style) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-12">
          <div className="max-w-3xl">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech_stack?.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-zinc-800 text-zinc-400 font-mono text-xs uppercase px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* ACTION BUTTONS (Highly Visible) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            {project.demo_url && (
              <Link
                href={project.demo_url}
                target="_blank"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-lime-400 text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200"
              >
                Live Demo{" "}
                <FiExternalLink className="group-hover:rotate-45 transition-transform" />
              </Link>
            )}
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors"
              >
                <FiGithub /> Source Code
              </Link>
            )}
          </div>
        </div>

        {/* 3. VISUAL CAROUSEL (Full Width Box) */}
        <div className="w-full aspect-video md:aspect-21/9 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 mb-20 relative shadow-2xl shadow-lime-900/5">
          <ProjectCarousel images={allProjectImages} />
        </div>

        {/* 4. DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-zinc-900 pt-16">
          {/* LEFT: Meta Data (3 Cols) */}
          <div className="lg:col-span-3 space-y-8 h-fit lg:sticky lg:top-24">
            <div>
              <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest block mb-2">
                Category
              </span>
              <div className="flex items-center gap-2 text-lg font-medium text-white">
                <FiLayers className="text-lime-400" />{" "}
                {project.category || "Engineering"}
              </div>
            </div>

            <div>
              <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest block mb-2">
                Timeline
              </span>
              <div className="flex items-center gap-2 text-lg font-medium text-white">
                <FiCalendar className="text-lime-400" />{" "}
                {project.timeline || "Completed"}
              </div>
            </div>

            {/* Status Removed as requested */}

            <div className="pt-8 border-t border-zinc-900">
              <p className="text-sm text-zinc-500 mb-4">
                Curious about the implementation details?
              </p>
              <ClientButton
                projectName={project.title}
                className="w-full py-3 border border-zinc-800 bg-zinc-900/50 hover:bg-lime-400 hover:text-black hover:border-lime-400 text-zinc-300 font-mono text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <FiZap size={14} /> Analyze Code
              </ClientButton>
            </div>
          </div>

          {/* RIGHT: Main Content (9 Cols) */}
          <div className="lg:col-span-9">
            <div
              className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-white 
                prose-p:text-zinc-400 prose-p:leading-8 
                prose-li:text-zinc-400
                prose-strong:text-lime-400
                prose-code:text-lime-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
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
