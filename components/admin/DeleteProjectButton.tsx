"use client";

import { deleteProject } from "@/app/admin/actions";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface DeleteProjectButtonProps {
  projectId: number;
  projectTitle: string;
}

export default function DeleteProjectButton({
  projectId,
  projectTitle,
}: DeleteProjectButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    await deleteProject(projectId);
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-red-400 font-mono">
          Delete &quot;{projectTitle.slice(0, 15)}
          {projectTitle.length > 15 ? "..." : ""}&quot;?
        </span>
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-[10px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md transition-colors font-mono uppercase"
        >
          Yes
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-[10px] font-bold bg-white/[0.04] text-zinc-500 hover:text-white rounded-md transition-colors font-mono uppercase"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-zinc-600 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <FiTrash2 size={14} />
    </button>
  );
}
