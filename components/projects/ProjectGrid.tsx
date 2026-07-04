"use client";

import ProjectCard from "./ProjectCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16">
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
