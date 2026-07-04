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
        <span className="mb-2 font-serif text-xl italic text-primary block">
          Category
        </span>
        <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
          <FiLayers className="text-primary" />{" "}
          {category || "Engineering"}
        </div>
      </div>

      <div>
        <span className="mb-2 font-serif text-xl italic text-primary block">
          Timeline
        </span>
        <div className="flex items-center gap-2 text-xl font-medium text-zinc-900 dark:text-white">
          <FiCalendar className="text-primary" />{" "}
          {timeline || "Completed"}
        </div>
      </div>

      <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
        <p className="text-sm text-zinc-500 mb-4">
          Curious about the implementation details?
        </p>
        <ClientButton
          projectName={title}
          variant="outline"
          className="w-full py-6 font-mono text-xs uppercase tracking-widest gap-2 group"
        >
          <FiZap size={14} className="group-hover:text-primary transition-colors" /> Analyze Code
        </ClientButton>
      </div>
    </div>
  );
}
