import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import { FiFolder, FiPlus, FiArrowRight, FiActivity } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { AdminGrid, AdminCellWrapper } from "@/components/admin/AdminGrid";
import {
  Pagination,
  PaginationContent,
  
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(
    typeof resolvedParams.page === "string" ? resolvedParams.page : "1",
    10
  );
  const limit = 5;
  const offset = (page - 1) * limit;

  const supabase = await createSupabaseServerClient();
  
  // Get total count
  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true });
    
  const totalProjects = count || 0;
  const totalPages = Math.ceil(totalProjects / limit);

  // Get paginated projects
  const { data: recentProjects } = await supabase
    .from("projects")
    .select("id, title, slug, category, created_at")
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor your projects and system status.
        </p>
      </div>

      <AdminGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Projects Card */}
        <AdminCellWrapper index={0}>
          <div className="flex flex-col p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Total Projects</span>
              <FiFolder className="text-primary h-4 w-4" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{totalProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">Published on portfolio</p>
            </div>
          </div>
        </AdminCellWrapper>

        {/* Quick Add Action Card */}
        <AdminCellWrapper index={1}>
          <Link href="/admin/projects/new" className="flex flex-col p-6 h-full group transition-colors hover:bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                New Project
              </span>
              <FiPlus className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Create Entry
              </div>
              <p className="text-xs text-muted-foreground mt-1">Add a new case study</p>
            </div>
          </Link>
        </AdminCellWrapper>

        {/* System Status Card */}
        <AdminCellWrapper index={2}>
          <div className="flex flex-col p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">System Status</span>
              <FiActivity className="text-primary h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-foreground">Online</div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-[10px] px-1.5 py-0">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All systems functional</p>
            </div>
          </div>
        </AdminCellWrapper>

        {/* Recent Projects Table / List */}
        <AdminCellWrapper index={3} className="md:col-span-2 lg:col-span-3">
          <div className="p-6">
            <div className="flex flex-row items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Recent Projects</h3>
              </div>
              <Link 
                href="/admin/projects"
                className="hidden sm:inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                View All <FiArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="w-full">
              {!recentProjects || recentProjects.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-xs">
                  No projects found.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/admin/projects/${project.id}/edit`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-3 hover:bg-muted/50 transition-colors group -mx-4 px-4 rounded-lg"
                    >
                      <div className="space-y-1 mb-1 sm:mb-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {project.category || "Uncategorized"} <span className="text-border mx-1">•</span> /{project.slug}
                        </p>
                      </div>
                      <div className="flex items-center text-muted-foreground group-hover:text-primary transition-colors text-xs">
                        Edit <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-all h-3 w-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 border-t border-border pt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href={page > 1 ? `/admin?page=${page - 1}` : "#"} 
                        className={page <= 1 ? "pointer-events-none opacity-50 text-xs" : "text-xs"}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            href={`/admin?page=${pageNum}`}
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
                        href={page < totalPages ? `/admin?page=${page + 1}` : "#"}
                        className={page >= totalPages ? "pointer-events-none opacity-50 text-xs" : "text-xs"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </AdminCellWrapper>
      </AdminGrid>
    </div>
  );
}
