"use client";

import { useState } from "react";
import { FiX, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProjectFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project?: any;
  action: (formData: FormData) => Promise<{ error: string } | void>;
  submitLabel: string;
}

export default function ProjectForm({
  project,
  action,
  submitLabel,
}: ProjectFormProps) {
  const [techStack, setTechStack] = useState<string[]>(
    project?.tech_stack || [],
  );
  const [techInput, setTechInput] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>(
    project?.gallery_images || [],
  );
  const [galleryInput, setGalleryInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [contentValue, setContentValue] = useState(project?.content || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const addGalleryImage = () => {
    const trimmed = galleryInput.trim();
    if (trimmed && !galleryImages.includes(trimmed)) {
      setGalleryImages([...galleryImages, trimmed]);
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (url: string) => {
    setGalleryImages(galleryImages.filter((u) => u !== url));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Override with our managed state
    formData.set("tech_stack", techStack.join(","));
    formData.set("gallery_images", galleryImages.join(","));
    formData.set("content", contentValue);

    const result = await action(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  const labelClasses =
    "text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className={labelClasses}>Title *</Label>
          <Input
            name="title"
            defaultValue={project?.title}
            required
            placeholder="My Awesome Project"
            className="h-11 rounded-xl"
          />
        </div>
        <div>
          <Label className={labelClasses}>Slug (auto-generated if empty)</Label>
          <Input
            name="slug"
            defaultValue={project?.slug}
            placeholder="my-awesome-project"
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Label className={labelClasses}>Description *</Label>
        <Textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={3}
          placeholder="A brief description of the project..."
          className="rounded-xl resize-none"
        />
      </div>

      {/* Content (Markdown) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className={labelClasses + " mb-0"}>Content (Markdown)</Label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-widest"
          >
            {showPreview ? (
              <>
                <FiEyeOff size={12} /> Editor
              </>
            ) : (
              <>
                <FiEye size={12} /> Preview
              </>
            )}
          </button>
        </div>
        {showPreview ? (
          <div className="bg-card border border-border rounded-xl p-6 min-h-[200px] prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-primary dark:prose-invert">
            <ReactMarkdown>
              {contentValue || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            rows={10}
            placeholder="Write detailed project description in markdown..."
            className="rounded-xl resize-y font-mono text-xs leading-relaxed"
          />
        )}
      </div>

      {/* Tech Stack Tags */}
      <div>
        <Label className={labelClasses}>Tech Stack</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-mono px-3 py-1.5 rounded-lg border border-primary/20"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="hover:text-foreground transition-colors"
              >
                <FiX size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="Add technology..."
            className="h-11 rounded-xl flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addTech}
            className="h-11 w-11 rounded-xl shrink-0 p-0"
          >
            <FiPlus size={16} />
          </Button>
        </div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className={labelClasses}>Image URL</Label>
          <Input
            name="image_url"
            defaultValue={project?.image_url}
            placeholder="https://example.com/image.png"
            className="h-11 rounded-xl"
          />
        </div>
        <div>
          <Label className={labelClasses}>Demo URL</Label>
          <Input
            name="demo_url"
            defaultValue={project?.demo_url}
            placeholder="https://demo.example.com"
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className={labelClasses}>GitHub URL</Label>
          <Input
            name="github_url"
            defaultValue={project?.github_url}
            placeholder="https://github.com/..."
            className="h-11 rounded-xl"
          />
        </div>
        <div>
          <Label className={labelClasses}>Category</Label>
          <Input
            name="category"
            defaultValue={project?.category}
            placeholder="Full Stack, AI, etc."
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <div>
        <Label className={labelClasses}>Timeline</Label>
        <Input
          name="timeline"
          defaultValue={project?.timeline}
          placeholder="Jan 2025 - Mar 2025"
          className="h-11 rounded-xl"
        />
      </div>

      {/* Gallery Images */}
      <div>
        <Label className={labelClasses}>Gallery Images</Label>
        {galleryImages.length > 0 && (
          <div className="space-y-2 mb-3">
            {galleryImages.map((url, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2"
              >
                <span className="text-xs text-muted-foreground font-mono truncate flex-1">
                  {url}
                </span>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(url)}
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGalleryImage();
              }
            }}
            placeholder="Add gallery image URL..."
            className="h-11 rounded-xl flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addGalleryImage}
            className="h-11 w-11 rounded-xl shrink-0 p-0"
          >
            <FiPlus size={16} />
          </Button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <Button
          type="submit"
          disabled={loading}
          className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all text-sm uppercase tracking-wider"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mx-auto" />
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
