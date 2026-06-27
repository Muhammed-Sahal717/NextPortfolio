"use client";

import ProjectCard from "./ProjectCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col overflow-hidden px-6 py-20 lg:px-16 lg:py-40">
      {/* Decorative background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
