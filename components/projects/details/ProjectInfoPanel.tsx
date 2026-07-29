"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  ExternalLink,
  Github,
  Clock,
  User,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectInfoPanelProps {
  title: string;
  category?: string;
  timeline?: string;
  status?: string;
  role?: string;
  teamSize?: string;
  techStack?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectInfoPanel({
  title,
  category,
  timeline,
  status,
  role,
  teamSize,
  techStack = [],
  demoUrl,
  githubUrl,
}: ProjectInfoPanelProps) {
  const hasMetadata = Boolean(status || category || timeline || role || teamSize);

  return (
    <aside className="sticky top-28 space-y-6">
      {/* Project Metadata Card */}
      <div className="p-6 border border-border/80 rounded-2xl bg-card shadow-sm space-y-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground pb-3 border-b border-border/40">
          Project Details
        </h3>

        {hasMetadata && (
          <div className="space-y-4 text-xs">
            {/* Status */}
            {status && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" /> Status
                </span>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[11px] font-mono"
                >
                  {status}
                </Badge>
              </div>
            )}

            {/* Category */}
            {category && (
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0 pt-0.5">
                  <Layers className="w-3.5 h-3.5 text-muted-foreground" /> Category
                </span>
                <span className="font-semibold text-foreground text-right leading-tight">{category}</span>
              </div>
            )}

            {/* Duration / Timeline */}
            {timeline && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" /> Timeline
                </span>
                <span className="font-mono text-foreground text-right">{timeline}</span>
              </div>
            )}

            {/* Role */}
            {role && (
              <div className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0 pt-0.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" /> Role
                </span>
                <span className="font-semibold text-foreground text-right leading-tight">{role}</span>
              </div>
            )}

            {/* Team Size */}
            {teamSize && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" /> Team
                </span>
                <span className="font-medium text-foreground text-right">{teamSize}</span>
              </div>
            )}
          </div>
        )}

        {/* Links */}
        {(demoUrl || githubUrl) && (
          <div className="pt-4 border-t border-border/40 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Quick Links
            </span>
            <div className="flex flex-col gap-2">
              {demoUrl && (
                <Link
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-emerald-500 hover:underline flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-foreground hover:underline flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" /> Source Code
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack Summary */}
        {techStack && techStack.length > 0 && (
          <div className="pt-4 border-t border-border/40 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
