"use client";

import { useState, useEffect } from "react";
import ParticleText from "@/components/animations/ParticleText";
import FooterHeader from "./FooterHeader";
import ContactForm from "./ContactForm";
import FooterNav from "./FooterNav";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className="bg-black text-white relative border-t border-zinc-900 transition-all overflow-hidden flex flex-col justify-between min-h-screen pt-12"
      id="contact"
    >
      {/* 1. TOP HEADER & IMAGE SECTION */}
      <FooterHeader />

      {/* 2. COMPACT CONTACT & INFO SECTION */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20 mt-10 lg:mt-0" id="email-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-t border-white/5 pt-16">
          
          {/* Form (Sleek & Compact) */}
          <ContactForm />

          {/* Nav & Socials (Minimalist) */}
          <FooterNav />
          
        </div>
      </div>

      {/* 3. INTERACTIVE TEXT PARTICLES */}
      <div className="relative w-full h-[250px] overflow-hidden pointer-events-auto mt-auto border-t border-white/5">
        <ParticleText text={isMobile ? "SAHAL" : "MUHAMMED SAHAL"} />
      </div>
      
      {/* Copyright Bar */}
      <div className="w-full border-t border-white/5 py-6 px-6 md:px-12 flex justify-between items-center text-xs font-mono text-zinc-600 uppercase z-20 relative bg-black">
         <p>© {new Date().getFullYear()} Sahal.</p>
         <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
