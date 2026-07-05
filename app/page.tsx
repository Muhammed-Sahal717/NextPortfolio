import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/hero/HeroSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Footer from "@/components/footer/Footer"; // <--- Import this

export const revalidate = 3600; // Cache for 1 hour instead of every request

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white font-sans selection:bg-[var(--theme-lime-400)]/30">
      <HeroSection />

      {/* The Bento "About" Section */}
      <AboutSection />

      {/* The Experience Section */}
      <ExperienceSection experience={experience || []} />

      <ProjectsSection projects={projects || []} />

      {/* The Mega Footer */}
      <Footer />
    </main>
  );
}
