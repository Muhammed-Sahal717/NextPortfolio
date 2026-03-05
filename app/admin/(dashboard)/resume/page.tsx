"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import {
  FiUpload,
  FiFile,
  FiTrash2,
  FiExternalLink,
  FiDownload,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

export default function AdminResumePage() {
  const supabase = createSupabaseBrowserClient();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeName, setResumeFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch existing resume on load
  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    const { data } = await supabase.storage.from("resume").list("", {
      limit: 10,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (data && data.length > 0) {
      // Filter out .emptyFolderPlaceholder
      const files = data.filter((f) => f.name !== ".emptyFolderPlaceholder");
      if (files.length > 0) {
        const file = files[0];
        setResumeFileName(file.name);
        const {
          data: { publicUrl },
        } = supabase.storage.from("resume").getPublicUrl(file.name);
        setResumeUrl(publicUrl);
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Only PDF files are allowed." });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size must be under 10MB." });
      return;
    }

    setUploading(true);
    setMessage(null);

    // Delete existing resume first
    if (resumeName) {
      await supabase.storage.from("resume").remove([resumeName]);
    }

    // Upload with a clean filename
    const fileName = `resume_${Date.now()}.pdf`;
    const { error } = await supabase.storage
      .from("resume")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setUploading(false);
      return;
    }

    setMessage({ type: "success", text: "Resume uploaded successfully!" });
    setUploading(false);
    await fetchResume();
  };

  const handleDelete = async () => {
    if (!resumeName) return;

    setDeleting(true);
    setMessage(null);

    const { error } = await supabase.storage
      .from("resume")
      .remove([resumeName]);

    if (error) {
      setMessage({ type: "error", text: error.message });
      setDeleting(false);
      return;
    }

    setResumeUrl(null);
    setResumeFileName(null);
    setMessage({ type: "success", text: "Resume deleted." });
    setDeleting(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Resume</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Upload your resume to make it downloadable from the portfolio
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <FiCheck size={16} />
          ) : (
            <FiAlertCircle size={16} />
          )}
          {message.text}
        </div>
      )}

      {/* Current Resume */}
      {resumeUrl ? (
        <div className="bg-zinc-950/60 backdrop-blur border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                <FiFile className="text-lime-400" size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Current Resume</p>
                <p className="text-xs text-zinc-600 font-mono mt-0.5">
                  {resumeName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-lime-400 transition-colors"
                title="View"
              >
                <FiExternalLink size={16} />
              </a>
              <a
                href={resumeUrl}
                download
                className="p-2 text-zinc-500 hover:text-lime-400 transition-colors"
                title="Download"
              >
                <FiDownload size={16} />
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-50"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4 border border-white/[0.06] rounded-xl overflow-hidden bg-zinc-900/50">
            <iframe
              src={resumeUrl}
              className="w-full h-[500px]"
              title="Resume Preview"
            />
          </div>
        </div>
      ) : (
        <div className="bg-zinc-950/60 backdrop-blur border border-dashed border-white/[0.08] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
            <FiFile className="text-zinc-600" size={28} />
          </div>
          <p className="text-zinc-500 text-sm mb-1">No resume uploaded yet</p>
          <p className="text-zinc-700 text-xs">
            Upload a PDF to enable the download button on your portfolio
          </p>
        </div>
      )}

      {/* Upload Button */}
      <label
        className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
          uploading
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            : "bg-lime-400 hover:bg-lime-300 text-black"
        }`}
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <FiUpload size={16} />
            {resumeUrl ? "Replace Resume" : "Upload Resume"}
          </>
        )}
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
