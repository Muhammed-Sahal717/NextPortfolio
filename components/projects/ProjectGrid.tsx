"use client";

import ProjectCard from "./ProjectCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  // Calculate how many empty cells we need to complete the row for different breakpoints
  const emptyLg = (3 - (projects.length % 3)) % 3; // For 3-column layout
  const emptyMd = (2 - (projects.length % 2)) % 2; // For 2-column layout

  return (
    <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
        
        {/* Pad empty cells on large screens (3 columns) */}
        {Array.from({ length: emptyLg }).map((_, i) => (
          <div key={`empty-lg-${i}`} className="hidden lg:block bg-background" />
        ))}
        
        {/* Pad empty cells on medium screens (2 columns) */}
        {Array.from({ length: emptyMd }).map((_, i) => (
          <div key={`empty-md-${i}`} className="hidden md:block lg:hidden bg-background" />
        ))}
      </div>
    </div>
  );
}
