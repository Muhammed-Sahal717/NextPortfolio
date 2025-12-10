import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/HeroSection";
import ProjectGrid from "@/components/ProjectGrid";
import BentoGrid from "@/components/BentoGrid"; // <--- Import this
import Footer from "@/components/Footer"; // <--- Import this

export const revalidate = 0;

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <HeroSection />

      {/* The Bento "About" Section */}
      <BentoGrid />

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <span className="w-1 h-8 bg-lime-400 block rounded-full" />
              Selected Works
            </h2>
            <p className="text-zinc-400 max-w-xl">
              Full Stack development, UI/UX Design.
            </p>
          </div>
        </div>

        <ProjectGrid projects={projects || []} />
      </section>

      {/* The Mega Footer */}
      <Footer />
    </main>
  );
}
