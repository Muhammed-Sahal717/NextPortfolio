import React from "react";
import LiquidNavbar from "@/components/LiquidNavbar";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import TiltCard from "@/components/TiltCard";
import {
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiMapPin,
  FiAward,
  FiServer,
  FiDatabase,
  FiLayout,
  FiLayers,
  FiTerminal,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiVercel,
  SiOpenai,
  SiGooglegemini,
  SiGithub,
  SiPostman,
  SiFigma,
  SiNotion,
  SiLinux,
  SiGooglechrome,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const metadata = {
  title: "Profile | Sahal",
  description: "My background and technical capabilities.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-lime-500/30 overflow-hidden">
      <LiquidNavbar />

      <div className="relative pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto z-10">
        {/* Decorative Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Header */}
        <header className="mb-16 md:mb-24 relative z-10 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
            PROFILE
          </h1>
          <p 
            className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Structured overview of my background and technical capabilities.
          </p>
        </header>

        {/* Highlight Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-lime-500/50 via-zinc-800 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* 2. Core Summary */}
            <section>
              <h2 className="text-sm font-mono text-lime-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                <FiLayout className="text-lg" /> Core Summary
              </h2>
              <p 
                className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light backdrop-blur-sm bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Full Stack Engineer focused on building scalable web systems and
                integrating AI into real-world applications. Strong in
                performance, architecture, and maintainable system design.
              </p>
            </section>

            {/* 3. Education */}
            <section>
              <h2 className="text-sm font-mono text-lime-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                <FiAward className="text-lg" /> Education
              </h2>
              <TiltCard>
                <SpotlightCard className="p-6 md:p-8 backdrop-blur-md bg-zinc-900/40 border border-white/10 shadow-xl group">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-300 transition-colors">
                    BCA — Bachelor of Computer Applications
                  </h3>
                  <p className="text-zinc-400 flex items-center gap-2 mb-6 text-sm md:text-base">
                    <FiMapPin className="text-lime-500/70 shrink-0" />
                    <span>MCAS Vengara, Malappuram, Kerala, India</span>
                  </p>
                  <div className="inline-flex items-center justify-center px-4 py-1.5 bg-lime-500/10 border border-lime-500/20 text-lime-400 rounded-full text-xs font-mono font-medium tracking-widest">
                    2023 - 2026
                  </div>
                </SpotlightCard>
              </TiltCard>
            </section>

            {/* 5. Tools I Use */}
            <section>
              <h2 className="text-sm font-mono text-lime-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                <FiTerminal className="text-lg" /> Tools I Use
              </h2>
              <div className="flex flex-wrap gap-3">
                <ToolBadge
                  icon={<VscVscode className="text-[#007ACC]" />}
                  name="VS Code"
                />
                <ToolBadge
                  icon={<SiGithub className="text-white" />}
                  name="GitHub"
                />
                <ToolBadge
                  icon={<SiPostman className="text-[#FF6C37]" />}
                  name="Postman"
                />
                <ToolBadge
                  icon={<SiDocker className="text-[#2496ED]" />}
                  name="Docker"
                />
                <ToolBadge
                  icon={<SiFigma className="text-[#F24E1E]" />}
                  name="Figma"
                />
                <ToolBadge
                  icon={<SiNotion className="text-white" />}
                  name="Notion"
                />
                <ToolBadge
                  icon={<SiLinux className="text-white" />}
                  name="Linux / CLI"
                />
                <ToolBadge
                  icon={<SiGooglechrome className="text-[#4285F4]" />}
                  name="Chrome DevTools"
                />
                <ToolBadge
                  icon={<SiOpenai className="text-white" />}
                  name="AI Tools"
                />
              </div>
            </section>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* 4. Technical Skills */}
            <section>
              <h2 className="text-sm font-mono text-lime-400 mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                <FiLayers className="text-lg" /> Technical Skills
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Connecting lines for aesthetics (visible on larger screens) */}
                <div className="hidden md:block absolute top-[50%] left-0 w-full h-[1px] bg-white/5 -z-10" />
                <div className="hidden md:block absolute top-0 left-[50%] w-[1px] h-full bg-white/5 -z-10" />

                <SkillGroup
                  title="Frontend"
                  skills={[
                    {
                      name: "React",
                      icon: <SiReact className="text-[#61DAFB]" />,
                    },
                    {
                      name: "Next.js",
                      icon: <SiNextdotjs className="invert dark:invert-0" />,
                    },
                    {
                      name: "TypeScript",
                      icon: <SiTypescript className="text-[#3178C6]" />,
                    },
                    {
                      name: "Tailwind CSS",
                      icon: <SiTailwindcss className="text-[#06B6D4]" />,
                    },
                    {
                      name: "Bootstrap",
                      icon: <SiBootstrap className="text-[#7952B3]" />,
                    },
                  ]}
                />

                <SkillGroup
                  title="Backend"
                  skills={[
                    {
                      name: "Node.js",
                      icon: <SiNodedotjs className="text-[#339933]" />,
                    },
                    {
                      name: "Express",
                      icon: <SiExpress className="invert dark:invert-0" />,
                    },
                    {
                      name: "REST APIs",
                      icon: <FiServer className="text-lime-400" />,
                    },
                  ]}
                />

                <SkillGroup
                  title="Database"
                  skills={[
                    {
                      name: "MongoDB",
                      icon: <SiMongodb className="text-[#47A248]" />,
                    },
                    {
                      name: "PostgreSQL",
                      icon: <SiPostgresql className="text-[#4169E1]" />,
                    },
                  ]}
                />

                <SkillGroup
                  title="DevOps / Platform"
                  skills={[
                    {
                      name: "Docker",
                      icon: <SiDocker className="text-[#2496ED]" />,
                    },
                    { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
                    {
                      name: "Vercel",
                      icon: <SiVercel className="invert dark:invert-0" />,
                    },
                  ]}
                />

                <SkillGroup
                  title="AI / Integration"
                  className="md:col-span-2"
                  skills={[
                    {
                      name: "Gemini API",
                      icon: <SiGooglegemini className="text-[#8E75B2]" />,
                    },
                    {
                      name: "RAG Concepts",
                      icon: <FiDatabase className="text-lime-400" />,
                    },
                    {
                      name: "Prompt Engineering",
                      icon: <FiTerminal className="text-lime-400" />,
                    },
                  ]}
                />
              </div>
            </section>

            {/* Highlight Line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-lime-500/50" />

            {/* 6. Links */}
            <section>
              <h2 className="text-sm font-mono text-lime-400 mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                <FiGithub className="text-lg" /> Connect
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <LinkCard
                  href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"}
                  icon={
                    <SiGithub className="text-3xl text-zinc-300 group-hover:text-white transition-colors" />
                  }
                  label="GitHub"
                  subLabel="Code & Contributions"
                />
                <LinkCard
                  href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"}
                  icon={
                    <FiLinkedin className="text-3xl text-[#0A66C2] saturate-0 group-hover:saturate-100 transition-all" />
                  }
                  label="LinkedIn"
                  subLabel="Professional Network"
                />
                <LinkCard
                  href="https://orbdarymycthwezfodwb.supabase.co/storage/v1/object/public/resume/resume_muhammedsahal_v1_0_0-3.pdf"
                  icon={
                    <FiFileText className="text-3xl text-lime-500/70 group-hover:text-lime-400 transition-colors" />
                  }
                  label="Resume"
                  subLabel="View PDF Format"
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Subcomponents

interface Skill {
  name: string;
  icon: React.ReactNode;
}

function SkillGroup({
  title,
  skills,
  className = "",
}: {
  title: string;
  skills: Skill[];
  className?: string;
}) {
  return (
    <div
      className={`p-6 md:p-8 bg-zinc-900/30 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-2xl relative overflow-hidden group transition-colors duration-500 ${className}`}
    >
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <h3 className="text-lg font-semibold text-white mb-6 relative z-10 group-hover:text-lime-300 transition-colors">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3 relative z-10">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/5 rounded-xl text-sm text-zinc-300 shadow-sm hover:bg-white/5 hover:border-lime-500/30 transition-all cursor-default"
          >
            <span className="text-lg">{skill.icon}</span>
            <span className="font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolBadge({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl text-sm text-zinc-300 shadow-sm hover:border-lime-500/40 hover:bg-zinc-800 transition-all cursor-default overflow-hidden relative group">
      <div className="absolute inset-0 bg-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <span className="text-lg z-10">{icon}</span>
      <span className="font-medium z-10">{name}</span>
    </span>
  );
}

function LinkCard({
  href,
  icon,
  label,
  subLabel,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  subLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center gap-4 p-8 bg-zinc-900/20 hover:bg-zinc-900/60 backdrop-blur-sm border border-white/5 hover:border-lime-500/30 rounded-2xl transition-all group overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-lime-500/0 to-transparent group-hover:via-lime-500/50 transition-all duration-700" />

      <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-center">
        <div className="text-zinc-200 font-bold text-lg mb-1 group-hover:text-white transition-colors">
          {label}
        </div>
        <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider group-hover:text-lime-500/70 transition-colors">
          {subLabel}
        </div>
      </div>
    </a>
  );
}
