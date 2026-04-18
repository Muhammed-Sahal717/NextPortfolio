import { supabase } from "@/lib/supabaseClient";
import HeroSection from "@/components/HeroSection";
import ProjectGrid from "@/components/ProjectGrid";
import BentoGrid from "@/components/BentoGrid"; // <--- Import this
import Footer from "@/components/Footer"; // <--- Import this

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
              <div className="flex items-center gap-4 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                <span className="h-[2px] w-10 bg-[var(--theme-lime-400)]" />
                Featured Deployments
              </div>

              <h2
                className="relative z-10 text-6xl font-black leading-[1] tracking-[-0.02em] !text-black dark:!text-white 
drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] 
dark:drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] 
md:text-7xl lg:text-8xl"
              >
                Selected
                <span className="block bg-gradient-to-r from-zinc-500 to-zinc-300 bg-clip-text font-light italic text-transparent dark:from-zinc-400 dark:to-zinc-600 drop-shadow-none">
                  Works
                </span>
              </h2>
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
