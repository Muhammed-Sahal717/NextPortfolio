"use client";

import ProjectCard from "./ProjectCard";

function CellWrapper({ 
  children, 
  index, 
  className = "" 
}: { 
  children?: React.ReactNode; 
  index: number; 
  className?: string 
}) {
  const isLgInternal = index >= 3 && index % 3 !== 0;
  const isMdInternal = index >= 2 && index % 2 !== 0;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* LG Diamond */}
      {isLgInternal && (
        <div className="hidden lg:block absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-zinc-800" />
      )}
      {/* MD Diamond */}
      {isMdInternal && (
        <div className="hidden md:block lg:hidden absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-zinc-800" />
      )}
      {children}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  // Calculate how many empty cells we need to complete the row for different breakpoints
  const emptyLg = (3 - (projects.length % 3)) % 3; // For 3-column layout
  const emptyMd = (2 - (projects.length % 2)) % 2; // For 2-column layout

  return (
    <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        {projects.map((project, index) => (
          <CellWrapper key={project.id} index={index}>
            <ProjectCard project={project} index={index} />
          </CellWrapper>
        ))}
        
        {/* Pad empty cells on large screens (3 columns) */}
        {Array.from({ length: emptyLg }).map((_, i) => {
          const index = projects.length + i;
          return (
            <CellWrapper key={`empty-lg-${i}`} index={index} className="hidden lg:block bg-background" />
          );
        })}
        
        {/* Pad empty cells on medium screens (2 columns) */}
        {Array.from({ length: emptyMd }).map((_, i) => {
          const index = projects.length + i;
          return (
            <CellWrapper key={`empty-md-${i}`} index={index} className="hidden md:block lg:hidden bg-background" />
          );
        })}
      </div>
    </div>
  );
}
