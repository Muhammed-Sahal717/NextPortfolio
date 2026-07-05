import { FiCalendar, FiLayers, FiMessageSquare } from "react-icons/fi";
import ClientButton from "@/components/common/ClientButton";
import { Separator } from "@/components/ui/separator";

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
    <div className="h-full flex flex-col p-8 md:p-12">
      <div>
        <h3 className="text-xl font-semibold mb-8">Project Details</h3>
      </div>
      
      <div className="space-y-8 flex-1">
        <div>
          <span className="mb-2 text-sm font-medium text-muted-foreground block">
            Category
          </span>
          <div className="flex items-center gap-2 font-medium text-foreground">
            <FiLayers className="text-muted-foreground" />
            {category || "Engineering"}
          </div>
        </div>

        <div>
          <span className="mb-2 text-sm font-medium text-muted-foreground block">
            Timeline
          </span>
          <div className="flex items-center gap-2 font-medium text-foreground">
            <FiCalendar className="text-muted-foreground" />
            {timeline || "Completed"}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-12">
        <Separator className="mb-6" />
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Have questions about this project?
          </p>
          <ClientButton
            projectName={title}
            variant="outline"
            className="w-full py-5 gap-2 group font-medium"
          >
            <FiMessageSquare size={16} className="text-muted-foreground group-hover:text-fuchsia-500 transition-colors" /> 
            Ask AI Assistant
          </ClientButton>
        </div>
      </div>
    </div>
  );
}
