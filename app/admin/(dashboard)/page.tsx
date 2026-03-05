import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import { FiFolder, FiPlus, FiArrowRight, FiActivity } from "react-icons/fi";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, slug, category, created_at")
    .order("id", { ascending: false });

  const projectCount = projects?.length || 0;
  const recentProjects = projects?.slice(0, 5) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your portfolio content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Projects */}
        <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 flex items-center justify-center">
              <FiFolder className="text-lime-400" size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
              Total
            </span>
          </div>
          <p className="text-4xl font-bold text-white">{projectCount}</p>
          <p className="text-zinc-500 text-sm mt-1">Projects</p>
        </div>

        {/* Quick Add */}
        <Link
          href="/admin/projects/new"
          className="group bg-zinc-950/60 backdrop-blur border border-dashed border-white/[0.08] rounded-2xl p-6 hover:border-lime-400/30 hover:bg-lime-400/[0.02] transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] group-hover:bg-lime-400/10 flex items-center justify-center transition-colors">
              <FiPlus
                className="text-zinc-500 group-hover:text-lime-400 transition-colors"
                size={20}
              />
            </div>
            <FiArrowRight className="text-zinc-700 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-lg font-semibold text-zinc-400 group-hover:text-white transition-colors">
            Add New Project
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Create a new portfolio entry
          </p>
        </Link>

        {/* Status */}
        <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
              <FiActivity className="text-green-400" size={20} />
            </div>
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
              Status
            </span>
          </div>
          <p className="text-lg font-semibold text-white">Live</p>
          <p className="text-zinc-500 text-sm mt-1">Portfolio is active</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Recent Projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-widest flex items-center gap-1"
          >
            View All <FiArrowRight size={12} />
          </Link>
        </div>
        {recentProjects.length === 0 ? (
          <div className="px-6 py-12 text-center text-zinc-600 text-sm">
            No projects yet. Create your first one!
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}/edit`}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors">
                    {project.title}
                  </p>
                  <p className="text-xs text-zinc-600 font-mono mt-0.5">
                    {project.category || "Uncategorized"} • /{project.slug}
                  </p>
                </div>
                <FiArrowRight className="text-zinc-700 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
