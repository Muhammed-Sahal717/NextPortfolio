"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  MessageSquare,
  Clock,
  User,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const triggerPrompt = (promptText: string) => {
    window.dispatchEvent(
      new CustomEvent("open-chat", {
        detail: {
          message: `${promptText} for the ${title} project.`,
        },
      })
    );
  };

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
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
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
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-muted-foreground" /> Category
                </span>
                <span className="font-semibold text-foreground">{category}</span>
              </div>
            )}

            {/* Duration / Timeline */}
            {timeline && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" /> Timeline
                </span>
                <span className="font-mono text-foreground">{timeline}</span>
              </div>
            )}

            {/* Role */}
            {role && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" /> Role
                </span>
                <span className="font-semibold text-foreground text-right">{role}</span>
              </div>
            )}

            {/* Team Size */}
            {teamSize && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" /> Team
                </span>
                <span className="font-medium text-foreground">{teamSize}</span>
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

      {/* AI Assistant Quick Actions Card */}
      <div className="p-6 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Ask AI Assistant</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Ask anything about this project to get instant architectural explanations.
        </p>

        {/* Quick Prompts */}
        <div className="space-y-2">
          <button
            onClick={() => triggerPrompt("Explain the architecture")}
            className="w-full text-left p-2.5 rounded-xl border border-border/60 bg-card hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-medium text-foreground transition-all flex items-center justify-between group"
          >
            <span>Explain the architecture</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => triggerPrompt("How authentication works")}
            className="w-full text-left p-2.5 rounded-xl border border-border/60 bg-card hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-medium text-foreground transition-all flex items-center justify-between group"
          >
            <span>How authentication works</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => triggerPrompt("Why this stack was chosen")}
            className="w-full text-left p-2.5 rounded-xl border border-border/60 bg-card hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-medium text-foreground transition-all flex items-center justify-between group"
          >
            <span>Why this stack was chosen</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Green CTA Button */}
        <Button
          onClick={() => triggerPrompt("Tell me about the technical details")}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs h-10 gap-2 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ask AI Assistant</span>
        </Button>
      </div>
    </aside>
  );
}
