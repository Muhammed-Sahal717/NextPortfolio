"use client";

import { FiArrowRight, FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { motion } from "framer-motion"; // Kept for reference but not used

export default function HeroContent() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setResumeUrl(data.url);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-center z-20">
      {/* Status Badge */}
      <div className="inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
        Open for Opportunities
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-foreground">
        Full-Stack Engineer
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed mb-10">
        Hi, I&apos;m Sahal. I specialize in building robust full-stack applications
        and integrating AI functionalities to solve complex problems.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="rounded-full h-12 px-8 text-base hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500 dark:hover:text-green-400 transition-all border border-transparent"
        >
          <Link href="#projects">
            View Work <FiArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>

        {/* Resume Button */}
        {resumeUrl && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 text-base"
          >
            <a href={resumeUrl} download>
              <FiDownload className="mr-2 w-4 h-4" />
              View Resume
            </a>
          </Button>
        )}

        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <Link
            href={
              process.env.NEXT_PUBLIC_CONTACT_GITHUB || "https://github.com"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <Link
            href={
              process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "https://linkedin.com"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
