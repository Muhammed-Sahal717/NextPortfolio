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
    .select(
      "id, title, slug, description, tech_stack, demo_url, github_url, image_url, gallery_images, category, timeline, status"
    )
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
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
        >
          <FiArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Edit Project
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Editing &ldquo;{project.title}&rdquo;
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-6 md:p-8">
        <ProjectForm
          project={project}
          action={updateProjectWithId}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
