"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Github, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectBottomCTAProps {
  title: string;
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectBottomCTA({
  title,
  demoUrl,
  githubUrl,
}: ProjectBottomCTAProps) {
  const handleOpenAIChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat", {
        detail: {
          message: `Tell me about the architecture and features of the ${title} project.`,
        },
      })
    );
  };

  return (
    <section className="py-16 my-12 border-t border-border/80 text-center space-y-6 bg-card/40 rounded-3xl p-8 md:p-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Next Steps</span>
      </div>

      <div className="space-y-2 max-w-xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Interested in {title}?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore the live demonstration, inspect the source code, or ask the AI Assistant specific technical questions about this project.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4 max-w-md mx-auto">
        {demoUrl && (
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm gap-2"
          >
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        )}

        {githubUrl && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-muted font-medium gap-2"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </Link>
          </Button>
        )}

        <Button
          onClick={handleOpenAIChat}
          variant="outline"
          size="lg"
          className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-medium gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask AI Assistant</span>
        </Button>
      </div>
    </section>
  );
}
