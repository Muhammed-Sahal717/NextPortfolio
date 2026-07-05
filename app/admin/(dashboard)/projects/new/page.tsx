import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/app/admin/actions";

export default function NewProjectPage() {
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
            New Project
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Add a new project to your portfolio
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card/60 backdrop-blur border border-border rounded-2xl p-6 md:p-8">
        <ProjectForm action={createProject} submitLabel="Create Project" />
      </div>
    </div>
  );
}
