import { FiCalendar, FiLayers, FiZap } from "react-icons/fi";
import ClientButton from "@/components/common/ClientButton";

interface ProjectSidebarProps {
  title: string;
  category?: string;
  timeline?: string;
}

export default function ProjectSidebar({
  title,
  category,
  timeline,
}: ProjectSidebarProps) {
  return (
    <div className="lg:col-span-4 h-fit rounded-[2rem] border border-dashed border-zinc-300 bg-white/5 p-8 backdrop-blur-sm dark:border-white/20 dark:bg-black/20 lg:sticky lg:top-24 space-y-8">
      <div>
        <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)] block">
          Category
        </span>
        <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
          <FiLayers className="text-[var(--theme-lime-400)]" />{" "}
          {category || "Engineering"}
        </div>
      </div>

      <div>
        <span className="mb-2 font-serif text-xl italic text-[var(--theme-lime-400)] block">
          Timeline
        </span>
        <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
          <FiCalendar className="text-[var(--theme-lime-400)]" />{" "}
          {timeline || "Completed"}
        </div>
      </div>

      <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
        <p className="text-sm text-zinc-500 mb-4">
          Curious about the implementation details?
        </p>
        <ClientButton
          projectName={title}
          className="w-full py-4 border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-[var(--theme-lime-400)] hover:text-black hover:border-[var(--theme-lime-400)] font-mono text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-[var(--theme-lime-400)] dark:hover:text-black dark:hover:border-[var(--theme-lime-400)]"
        >
          <FiZap size={14} /> Analyze Code
        </ClientButton>
      </div>
    </div>
  );
}
