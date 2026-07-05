"use client";

import ProjectGrid from "./ProjectGrid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <section id="projects" className="relative w-full py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16 mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Projects
            </h2>
          </div>
          <div className="max-w-md text-muted-foreground text-lg leading-relaxed">
            <p>
              A selection of my recent work. Highlighting full-stack applications, problem-solving, and clean interfaces.
            </p>
          </div>
        </div>
      </div>

      <div>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
