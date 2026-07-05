/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { AdminGrid, AdminCellWrapper } from "@/components/admin/AdminGrid";

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
    try {
      const res = await fetch("/api/admin/resume");
      const data = await res.json();
      if (data.success && data.fileName && data.url) {
        setResumeFileName(data.fileName);
        setResumeUrl(data.url);
      } else {
        setResumeFileName(null);
        setResumeUrl(null);
      }
    } catch (err) {
      console.error("Failed to fetch resume", err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Only PDF files are allowed." });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size must be under 10MB." });
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    if (resumeName) {
      formData.append("oldFileName", resumeName);
    }

    try {
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload resume.");
      }

      setMessage({ type: "success", text: "Resume uploaded successfully!" });
      await fetchResume();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!resumeName) return;

    setDeleting(true);
    setMessage(null);

    try {
      const res = await fetch(
        `/api/admin/resume?fileName=${encodeURIComponent(resumeName)}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete resume.");
      }

      setResumeUrl(null);
      setResumeFileName(null);
      setMessage({ type: "success", text: "Resume deleted." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Resume Management</h1>
          <p className="text-lg text-muted-foreground">
            Upload and manage the PDF resume displayed on your portfolio.
          </p>
        </div>
        
        {/* Upload Action */}
        <label
          className={`inline-flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
            uploading
              ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
              : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          }`}
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FiUpload size={18} />
              {resumeUrl ? "Replace File" : "Upload File"}
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

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <FiCheck size={18} />
          ) : (
            <FiAlertCircle size={18} />
          )}
          {message.text}
        </div>
      )}

      {/* Bento Grid */}
      <AdminGrid className="grid-cols-1 md:grid-cols-12">
        {/* Left Column: Details */}
        <AdminCellWrapper index={0} columnsMd={12} columnsLg={12} className="md:col-span-4">
          <div className="flex flex-col p-6 h-full">
            <h3 className="text-lg font-bold text-foreground mb-6">Document Details</h3>
            
            {resumeUrl ? (
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FiFile className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-foreground mb-0.5">Current File</p>
                    <p className="text-[10px] text-muted-foreground font-mono truncate" title={resumeName || ""}>
                      {resumeName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a 
                    href={resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-border hover:bg-muted transition-colors text-foreground group"
                  >
                    <span className="text-xs font-medium">Open in new tab</span>
                    <FiExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a 
                    href={resumeUrl} 
                    download
                    className="flex items-center justify-between p-3 rounded-lg bg-border hover:bg-muted transition-colors text-foreground group"
                  >
                    <span className="text-xs font-medium">Download PDF</span>
                    <FiDownload size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <button 
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-colors text-red-400 hover:text-red-300 group disabled:opacity-50"
                  >
                    <span className="text-xs font-medium">{deleting ? "Deleting..." : "Delete Document"}</span>
                    <FiTrash2 size={14} className="text-red-500/50 group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center flex-1 py-12">
                <div className="w-12 h-12 rounded-xl bg-border flex items-center justify-center mb-3">
                  <FiFile className="text-muted-foreground" size={20} />
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-1">No document available</p>
                <p className="text-muted-foreground opacity-80 text-[10px]">
                  Upload a PDF to make it available for download.
                </p>
              </div>
            )}
          </div>
        </AdminCellWrapper>

        {/* Right Column: Preview */}
        <AdminCellWrapper index={1} columnsMd={12} columnsLg={12} className="md:col-span-8">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Live Preview</h3>
              {resumeUrl && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-mono text-primary uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Active
                </span>
              )}
            </div>
            
            {resumeUrl ? (
              <div className="flex-1 min-h-[500px] border border-border rounded-xl overflow-hidden bg-card">
                <iframe
                  src={resumeUrl}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            ) : (
              <div className="flex-1 min-h-[500px] border border-dashed border-border rounded-xl flex items-center justify-center bg-card/50">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">Preview Area</p>
              </div>
            )}
          </div>
        </AdminCellWrapper>
      </AdminGrid>
    </div>
  );
}
