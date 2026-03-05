"use client";

import { useState } from "react";
import { FiX, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

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

  const inputClasses =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/20 transition-all text-sm";
  const labelClasses =
    "block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Title *</label>
          <input
            name="title"
            defaultValue={project?.title}
            required
            placeholder="My Awesome Project"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Slug (auto-generated if empty)</label>
          <input
            name="slug"
            defaultValue={project?.slug}
            placeholder="my-awesome-project"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClasses}>Description *</label>
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={3}
          placeholder="A brief description of the project..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Content (Markdown) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClasses + " mb-0"}>Content (Markdown)</label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-lime-400 transition-colors font-mono uppercase tracking-widest"
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
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 min-h-[200px] prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-zinc-400 prose-strong:text-lime-400">
            <ReactMarkdown>
              {contentValue || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            rows={10}
            placeholder="Write detailed project description in markdown..."
            className={`${inputClasses} resize-y font-mono text-xs leading-relaxed`}
          />
        )}
      </div>

      {/* Tech Stack Tags */}
      <div>
        <label className={labelClasses}>Tech Stack</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 bg-lime-400/10 text-lime-400 text-xs font-mono px-3 py-1.5 rounded-lg border border-lime-400/20"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="hover:text-white transition-colors"
              >
                <FiX size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="Add technology..."
            className={inputClasses + " flex-1"}
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-zinc-400 hover:text-lime-400 hover:border-lime-400/30 transition-all"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Image URL</label>
          <input
            name="image_url"
            defaultValue={project?.image_url}
            placeholder="https://example.com/image.png"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Demo URL</label>
          <input
            name="demo_url"
            defaultValue={project?.demo_url}
            placeholder="https://demo.example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>GitHub URL</label>
          <input
            name="github_url"
            defaultValue={project?.github_url}
            placeholder="https://github.com/..."
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Category</label>
          <input
            name="category"
            defaultValue={project?.category}
            placeholder="Full Stack, AI, etc."
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Timeline</label>
        <input
          name="timeline"
          defaultValue={project?.timeline}
          placeholder="Jan 2025 - Mar 2025"
          className={inputClasses}
        />
      </div>

      {/* Gallery Images */}
      <div>
        <label className={labelClasses}>Gallery Images</label>
        {galleryImages.length > 0 && (
          <div className="space-y-2 mb-3">
            {galleryImages.map((url, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-2"
              >
                <span className="text-xs text-zinc-400 font-mono truncate flex-1">
                  {url}
                </span>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(url)}
                  className="text-zinc-600 hover:text-red-400 transition-colors shrink-0"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGalleryImage();
              }
            }}
            placeholder="Add gallery image URL..."
            className={inputClasses + " flex-1"}
          />
          <button
            type="button"
            onClick={addGalleryImage}
            className="px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-zinc-400 hover:text-lime-400 hover:border-lime-400/30 transition-all"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto" />
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
