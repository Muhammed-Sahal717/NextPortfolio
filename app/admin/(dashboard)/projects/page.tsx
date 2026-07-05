import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import { FiPlus, FiEdit2, FiExternalLink } from "react-icons/fi";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { AdminGrid, AdminCellWrapper } from "@/components/admin/AdminGrid";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(
    typeof resolvedParams.page === "string" ? resolvedParams.page : "1",
    10
  );
  const limit = 8;
  const offset = (page - 1) * limit;

  const supabase = await createSupabaseServerClient();
  
  // Get total count
  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });
    
  const totalProjects = count || 0;
  const totalPages = Math.ceil(totalProjects / limit);

  // Get paginated projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your case studies ({totalProjects} total).
          </p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all text-xs uppercase tracking-wider"
        >
          <FiPlus size={14} />
          New Project
        </Link>
      </div>

      {/* Projects Grid */}
      <AdminGrid className="grid-cols-1">
        {!projects || projects.length === 0 ? (
          <AdminCellWrapper index={0}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-xl bg-border flex items-center justify-center mb-4">
                <FiPlus className="text-muted-foreground" size={20} />
              </div>
              <p className="text-foreground text-sm font-medium mb-1">No projects available</p>
              <p className="text-muted-foreground text-xs mb-6 max-w-xs mx-auto">
                Create your first project to display it on your public portfolio.
              </p>
              <Link 
                href="/admin/projects/new"
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <FiPlus size={14} /> Create
              </Link>
            </div>
          </AdminCellWrapper>
        ) : (
          <AdminCellWrapper index={0}>
            <div className="w-full">
              {/* Rows */}
              <div className="divide-y divide-border">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 hover:bg-muted/50 transition-colors items-center group"
                  >
                    {/* Title + Slug */}
                    <div className="md:col-span-4 flex flex-col">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">
                        /{project.slug}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="md:col-span-3">
                      <Badge variant="secondary" className="bg-border hover:bg-muted text-muted-foreground font-mono text-[9px] uppercase tracking-wider rounded-md font-normal">
                        {project.category || "Uncategorized"}
                      </Badge>
                    </div>

                    {/* Tech Stack */}
                    <div className="md:col-span-3 flex flex-wrap gap-1.5">
                      {project.tech_stack?.slice(0, 2).map((tech: string) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack?.length > 2 && (
                        <span className="text-[10px] text-muted-foreground font-mono bg-border px-1.5 py-0.5 rounded-sm">
                          +{project.tech_stack.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex items-center justify-end gap-1">
                      {project.demo_url && (
                        <a 
                          href={project.demo_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-border rounded-md transition-all"
                          title="View Live"
                        >
                          <FiExternalLink size={14} />
                        </a>
                      )}
                      <Link 
                        href={`/admin/projects/${project.id}/edit`} 
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all"
                        title="Edit"
                      >
                        <FiEdit2 size={14} />
                      </Link>
                      <div className="scale-[0.8] opacity-80 hover:opacity-100 transition-opacity">
                        <DeleteProjectButton
                          projectId={project.id}
                          projectTitle={project.title}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-border p-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href={page > 1 ? `/admin/projects?page=${page - 1}` : "#"} 
                          className={page <= 1 ? "pointer-events-none opacity-50 text-xs" : "text-xs"}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              href={`/admin/projects?page=${pageNum}`}
                              isActive={page === pageNum}
                              className={`text-xs w-8 h-8 ${page === pageNum ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext 
                          href={page < totalPages ? `/admin/projects?page=${page + 1}` : "#"}
                          className={page >= totalPages ? "pointer-events-none opacity-50 text-xs" : "text-xs"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </AdminCellWrapper>
        )}
      </AdminGrid>
    </div>
  );
}
