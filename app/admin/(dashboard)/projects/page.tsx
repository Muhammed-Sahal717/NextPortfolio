import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import { FiPlus, FiEdit2, FiExternalLink } from "react-icons/fi";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function AdminProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {projects?.length || 0} total projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all text-sm uppercase tracking-wider"
        >
          <FiPlus size={16} />
          New Project
        </Link>
      </div>

      {/* Projects Table */}
      {!projects || projects.length === 0 ? (
        <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl p-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            No projects yet. Create your first one!
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 text-sm font-mono uppercase tracking-widest transition-colors"
          >
            <FiPlus size={14} /> Create Project
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-xs font-mono text-zinc-600 uppercase tracking-widest">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Tech Stack</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.04]">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-center"
              >
                {/* Title + Slug */}
                <div className="md:col-span-4">
                  <p className="text-sm font-medium text-white truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-zinc-600 font-mono truncate">
                    /{project.slug}
                  </p>
                </div>

                {/* Category */}
                <div className="md:col-span-2">
                  <span className="text-xs text-zinc-500 bg-white/[0.04] px-2 py-1 rounded-md font-mono">
                    {project.category || "—"}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="md:col-span-3 flex flex-wrap gap-1">
                  {project.tech_stack?.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-lime-400/70 bg-lime-400/5 border border-lime-400/10 px-1.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack?.length > 3 && (
                    <span className="text-[10px] text-zinc-600 font-mono">
                      +{project.tech_stack.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="md:col-span-3 flex items-center justify-end gap-2">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-600 hover:text-white transition-colors"
                      title="View Live"
                    >
                      <FiExternalLink size={14} />
                    </a>
                  )}
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-zinc-500 hover:text-lime-400 transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={14} />
                  </Link>
                  <DeleteProjectButton
                    projectId={project.id}
                    projectTitle={project.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
