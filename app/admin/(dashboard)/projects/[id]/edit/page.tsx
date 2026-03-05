import { createSupabaseServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/app/admin/actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", parseInt(id))
    .single();

  if (!project) return notFound();

  const updateProjectWithId = async (formData: FormData) => {
    "use server";
    return updateProject(project.id, formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
        >
          <FiArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Edit Project
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Editing &ldquo;{project.title}&rdquo;
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl p-6 md:p-8">
        <ProjectForm
          project={project}
          action={updateProjectWithId}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
