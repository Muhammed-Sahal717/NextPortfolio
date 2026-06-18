import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/sections/HeroSection";
import ProjectGrid from "@/components/features/ProjectGrid";
import BentoGrid from "@/components/features/BentoGrid"; // <--- Import this
import Footer from "@/components/sections/Footer"; // <--- Import this
import ScrollReveal from "@/components/animations/ScrollReveal";

export const revalidate = 3600; // Cache for 1 hour instead of every request

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white font-sans selection:bg-[var(--theme-lime-400)]/30">
      <HeroSection />

      {/* The Bento "About" Section */}
      <BentoGrid />

      <section id="projects" className="relative w-full overflow-hidden">
        {/* Editorially Styled Header matching the 3D Grid dimensions */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20 md:px-8 lg:pt-32 xl:px-12 relative z-20 isolate">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
            {/* Left Side: Label & Heading */}
            <div className="flex flex-col gap-6 bg-zinc-50 dark:bg-black/40 backdrop-blur-sm px-6 py-6 md:px-8 md:py-8 lg:bg-transparent lg:dark:bg-transparent lg:backdrop-blur-none lg:p-0 rounded-[2rem]">
              <div className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
                <ScrollReveal
                  text="SELECTED"
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter !text-black dark:!text-white leading-[0.85] mb-2 transition-all"
                />
                <ScrollReveal
                  text="WORKS."
                  className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-800 leading-[0.85]"
                />
              </div>
            </div>

            {/* Right Side: Description */}
            <div className="w-full border-b-2 border-zinc-200 pb-6 dark:border-zinc-800 lg:max-w-sm lg:pb-8 xl:max-w-md">
              <p className="text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
                Robust full-stack platforms, immersive front-ends, and scalable
                systems built with an uncompromising focus on premium user
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* ProjectGrid pulls itself via its own max-w-screen-2xl padding */}
        <div className="-mt-10 lg:-mt-20">
          <ProjectGrid projects={projects || []} />
        </div>
      </section>

      {/* The Mega Footer */}
      <Footer />
    </main>
  );
}
