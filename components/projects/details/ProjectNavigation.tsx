"use client";

import React, { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
}

const DEFAULT_SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "architecture", label: "Architecture" },
  { id: "database", label: "Database" },
  { id: "authentication", label: "Authentication" },
  { id: "challenges", label: "Challenges" },
  { id: "performance", label: "Performance" },
  { id: "deployment", label: "Deployment" },
  { id: "lessons-learned", label: "Lessons Learned" },
];

interface ProjectNavigationProps {
  sections?: NavSection[];
  projectName: string;
}

export default function ProjectNavigation({
  sections = DEFAULT_SECTIONS,
  projectName,
}: ProjectNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "overview",
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll spy & progress calculation
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate page scroll progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)),
        );
      }

      // 2. Intersection detection for active section
      const sectionElements = sections
        .map((sec) => document.getElementById(sec.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleOpenAIChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat", {
        detail: {
          message: `Tell me about the ${projectName} project.`,
        },
      }),
    );
  };

  return (
    <aside className="sticky top-28 space-y-6">
      {/* Table of Contents Card */}
      <div className="p-5 border border-border/80 rounded-2xl bg-card/60 backdrop-blur-sm shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            On this page
          </h4>
          <span className="text-[11px] font-mono text-muted-foreground/80">
            {Math.round(scrollProgress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/50 h-1 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation List */}
        <nav className="space-y-0.5 max-h-[calc(100vh-22rem)] overflow-y-auto pr-1 custom-scrollbar text-sm">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500 font-semibold border-l-2 border-emerald-500 pl-2.5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <span className="truncate">{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
