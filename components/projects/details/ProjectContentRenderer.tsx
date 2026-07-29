"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  Cpu,
  Database,
  Lock,
  GitBranch,
  Rocket,
  Lightbulb,
  ArrowRight,
  Server,
  Code,
  Layout,
  Terminal,
  Activity,
} from "lucide-react";

interface ProjectContentRendererProps {
  documentation: string;
}

interface ParsedSection {
  id: string;
  title: string;
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function parseMarkdownSections(markdown: string): ParsedSection[] {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(normalized.matchAll(headingRegex));

  if (matches.length === 0) {
    return [{ id: "overview", title: "Overview", content: normalized }];
  }

  const sections: ParsedSection[] = [];

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const title = current[1].trim();
    const id = slugify(title);
    const startIndex = current.index! + current[0].length;
    const endIndex = next ? next.index! : normalized.length;
    const content = normalized.slice(startIndex, endIndex).trim();

    sections.push({ id, title, content });
  }

  return sections;
}

export default function ProjectContentRenderer({
  documentation,
}: ProjectContentRendererProps) {
  const sections = parseMarkdownSections(documentation);

  return (
    <div className="space-y-12 py-6">
      {sections.map((section) => {
        const titleLower = section.title.toLowerCase();

        return (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-32 space-y-4 border-b border-border/40 pb-12 last:border-0 last:pb-0"
          >
            {/* SECTION TITLE */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-emerald-500 shrink-0" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
            </div>

            {/* CUSTOM VISUAL PRESENTATION BY SECTION INTENT */}
            {titleLower.includes("problem") ? (
              <ProblemSection content={section.content} />
            ) : titleLower.includes("solution") ? (
              <SolutionSection content={section.content} />
            ) : titleLower.includes("feature") ? (
              <FeaturesSection content={section.content} />
            ) : titleLower.includes("tech stack") ? (
              <TechStackSection content={section.content} />
            ) : titleLower.includes("architecture") ? (
              <ArchitectureSection content={section.content} />
            ) : titleLower.includes("database") ? (
              <DatabaseSection content={section.content} />
            ) : titleLower.includes("auth") ? (
              <AuthSection content={section.content} />
            ) : titleLower.includes("challenge") ? (
              <ChallengesSection content={section.content} />
            ) : titleLower.includes("performance") ? (
              <PerformanceSection content={section.content} />
            ) : titleLower.includes("deploy") ? (
              <DeploymentSection content={section.content} />
            ) : titleLower.includes("lesson") ? (
              <LessonsSection content={section.content} />
            ) : (
              <DefaultProseSection content={section.content} />
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* SECTION RENDERERS                                                         */
/* ========================================================================== */

function DefaultProseSection({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

function ProblemSection({ content }: { content: string }) {
  return (
    <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 space-y-3">
      <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
        <span>Core Engineering Problem</span>
      </div>
      <div className="text-foreground/90 text-sm md:text-base leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function SolutionSection({ content }: { content: string }) {
  return (
    <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-3">
      <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
        <span>Architectural Solution</span>
      </div>
      <div className="text-foreground/90 text-sm md:text-base leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function FeaturesSection({ content }: { content: string }) {
  // Parse bullet items: - **Title:** Description
  const bulletLines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  if (bulletLines.length === 0) {
    return <DefaultProseSection content={content} />;
  }

  const icons = [Zap, Shield, Layers, Cpu, Activity, Layout, Terminal, Code];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      {bulletLines.map((line, idx) => {
        const clean = line.replace(/^[-*]\s+/, "");
        const match = clean.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        const title = match ? match[1] : `Feature ${idx + 1}`;
        const desc = match ? match[2] : clean;
        const IconComponent = icons[idx % icons.length];

        return (
          <div
            key={idx}
            className="p-5 border border-border/80 rounded-2xl bg-card hover:border-emerald-500/40 transition-all duration-200 space-y-2 group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <IconComponent className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-9">
              {desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function TechStackSection({ content }: { content: string }) {
  // Parse stack categories (Frontend, Backend, Infrastructure, Database, etc.)
  const categories: { name: string; items: string[] }[] = [];
  const lines = content.split("\n");

  let currentCategory = "";
  let currentItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("**") && trimmed.endsWith(":**")) {
      if (currentCategory && currentItems.length > 0) {
        categories.push({ name: currentCategory, items: currentItems });
      }
      currentCategory = trimmed.replace(/\*\*/g, "").replace(":", "");
      currentItems = [];
    } else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const item = trimmed.replace(/^[-*]\s+/, "").trim();
      if (item) currentItems.push(item);
    }
  }

  if (currentCategory && currentItems.length > 0) {
    categories.push({ name: currentCategory, items: currentItems });
  }

  if (categories.length === 0) {
    return <DefaultProseSection content={content} />;
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Layout className="w-4 h-4 text-sky-500" />,
    Backend: <Server className="w-4 h-4 text-emerald-500" />,
    "Infrastructure & Database": <Database className="w-4 h-4 text-purple-500" />,
    Infrastructure: <Server className="w-4 h-4 text-amber-500" />,
    Database: <Database className="w-4 h-4 text-indigo-500" />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="p-5 border border-border/80 rounded-2xl bg-card space-y-3"
        >
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground pb-2 border-b border-border/40">
            {categoryIcons[cat.name] || <Code className="w-4 h-4 text-emerald-500" />}
            <span>{cat.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border/40"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchitectureSection({ content }: { content: string }) {
  return (
    <div className="space-y-6">
      {/* Light Architecture Flow Diagram */}
      <div className="p-6 border border-border/80 rounded-2xl bg-card/60 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <GitBranch className="w-4 h-4 text-emerald-500" />
          <span>System Flow Architecture</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-muted/30 border border-border/40 text-xs font-mono">
          <div className="px-3 py-2 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center gap-1.5 shadow-sm">
            <Layout className="w-3.5 h-3.5 text-sky-500" /> Frontend App
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="px-3 py-2 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center gap-1.5 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-amber-500" /> REST API Gateway
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="px-3 py-2 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center gap-1.5 shadow-sm">
            <Server className="w-3.5 h-3.5 text-emerald-500" /> Backend Service
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="px-3 py-2 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center gap-1.5 shadow-sm">
            <Database className="w-3.5 h-3.5 text-purple-500" /> PostgreSQL / Redis
          </div>
        </div>
      </div>

      <DefaultProseSection content={content} />
    </div>
  );
}

function DatabaseSection({ content }: { content: string }) {
  return (
    <div className="p-6 border border-border/80 rounded-2xl bg-card space-y-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Database className="w-4 h-4 text-indigo-500" />
        <span>Database & Storage Strategy</span>
      </div>
      <DefaultProseSection content={content} />
    </div>
  );
}

function AuthSection({ content }: { content: string }) {
  return (
    <div className="space-y-6">
      {/* Light Auth Flow Diagram */}
      <div className="p-6 border border-border/80 rounded-2xl bg-card space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Lock className="w-4 h-4 text-emerald-500" />
          <span>Authentication & Security Flow</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center space-y-1">
            <div className="font-semibold text-foreground">JWT Credentials</div>
            <div className="text-[10px] text-muted-foreground">Stateless Tokens</div>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center space-y-1">
            <div className="font-semibold text-foreground">Frontend State</div>
            <div className="text-[10px] text-muted-foreground">Client Storage</div>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center space-y-1">
            <div className="font-semibold text-foreground">API Headers</div>
            <div className="text-[10px] text-muted-foreground">Bearer Token</div>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-center space-y-1">
            <div className="font-semibold text-foreground">Backend RBAC</div>
            <div className="text-[10px] text-muted-foreground">Permission Matrix</div>
          </div>
        </div>
      </div>

      <DefaultProseSection content={content} />
    </div>
  );
}

function ChallengesSection({ content }: { content: string }) {
  const bulletLines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  if (bulletLines.length === 0) {
    return <DefaultProseSection content={content} />;
  }

  return (
    <div className="space-y-3 pt-2">
      {bulletLines.map((line, idx) => {
        const clean = line.replace(/^[-*]\s+/, "");
        const match = clean.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        const title = match ? match[1] : `Challenge ${idx + 1}`;
        const desc = match ? match[2] : clean;

        return (
          <div
            key={idx}
            className="p-5 border border-border/80 rounded-2xl bg-card space-y-2 hover:border-amber-500/40 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{title}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-4">
              {desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function PerformanceSection({ content }: { content: string }) {
  const bulletLines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  if (bulletLines.length === 0) {
    return <DefaultProseSection content={content} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      {bulletLines.map((line, idx) => {
        const clean = line.replace(/^[-*]\s+/, "");
        const match = clean.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        const title = match ? match[1] : `Metric ${idx + 1}`;
        const desc = match ? match[2] : clean;

        return (
          <div
            key={idx}
            className="p-5 border border-border/80 rounded-2xl bg-card space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-semibold">
                Optimized
              </span>
              <h4 className="font-bold text-sm text-foreground">{title}</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
              {desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function DeploymentSection({ content }: { content: string }) {
  const bulletLines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  if (bulletLines.length === 0) {
    return <DefaultProseSection content={content} />;
  }

  return (
    <div className="space-y-3 pt-2">
      {bulletLines.map((line, idx) => {
        const clean = line.replace(/^[-*]\s+/, "");
        const match = clean.match(/^\*\*(.+?):\*\*\s*(.*)$/);
        const title = match ? match[1] : `Pipeline Step ${idx + 1}`;
        const desc = match ? match[2] : clean;

        return (
          <div
            key={idx}
            className="p-4 border border-border/80 rounded-xl bg-card flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              0{idx + 1}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-foreground">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LessonsSection({ content }: { content: string }) {
  return (
    <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        <Lightbulb className="w-4 h-4 text-emerald-500" />
        <span>Key Takeaways & Engineering Insights</span>
      </div>
      <div className="text-foreground/90 text-sm md:text-base leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
