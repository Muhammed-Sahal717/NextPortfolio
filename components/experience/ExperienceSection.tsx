"use client";

import React from "react";
import ExperienceList from "./ExperienceList";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ExperienceSection({ experience }: { experience: any[] }) {
  return (
    <section id="experience" className="relative w-full py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16 mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              <ScrollReveal text="Experience" />
            </h2>
          </div>

        </div>
      </div>

      <div>
        <ExperienceList experience={experience} />
      </div>
    </section>
  );
}
