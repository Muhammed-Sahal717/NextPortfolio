"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiCheck,
  FiLoader,
  FiMail,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleText from "@/components/ParticleText";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [toast, setToast] = useState<{ email: string; message: string; visible: boolean } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus("SENDING");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_email: formData.email,
          message: formData.message,
          to_name: "Sahal",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );
      setStatus("SUCCESS");
      
      // Show toast
      setToast({ email: formData.email, message: formData.message, visible: true });
      setFormData({ email: "", message: "" });
      
      setTimeout(() => {
        setStatus("IDLE");
        setToast((prev) => (prev ? { ...prev, visible: false } : null));
      }, 3000);
    } catch (error: any) {
      console.error("EmailJS Full Error:", error);
      console.error("EmailJS Error Text:", error?.text || "No text");
      console.error("EmailJS Status:", error?.status || "No status");
      
      // If the error object is empty, stringify it
      if (typeof error === "object" && Object.keys(error).length === 0) {
        console.error("EmailJS Empty Error Object Stringified:", JSON.stringify(error));
      }

      setStatus("ERROR");
      setTimeout(() => setStatus("IDLE"), 3000);
    }
  };

  const navLinks = [
    { name: "Projects", href: "#projects", label: "01" },
    { name: "About", href: "#about", label: "02" },
    { name: "Stack", href: "#about", label: "03" },
  ];

  return (
    <footer
      className="bg-black text-white relative border-t border-zinc-900 transition-all overflow-hidden flex flex-col justify-between min-h-screen pt-12"
      id="contact"
    >
      {/* 1. TOP HEADER & IMAGE SECTION */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-12 md:pt-20">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12">
          
          {/* Left: Heading */}
          <div className="flex flex-col drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] z-20 w-full lg:w-auto text-center lg:text-left">
            <ScrollReveal
              text="LET'S BUILD"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.85] transition-all justify-center lg:justify-start !flex-nowrap"
            />
            <ScrollReveal
              text="THE FUTURE."
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-zinc-800 leading-[0.85] justify-center lg:justify-start !flex-nowrap"
            />
          </div>

          {/* Right: Free-floating Image */}
          <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[480px] aspect-square z-10 lg:-mb-10 pointer-events-none mx-auto lg:mx-0">
            {/* Very subtle glow behind image to detach it from the deep black */}
            <div className="absolute inset-0 bg-lime-400/5 blur-[80px] rounded-full" />
            <Image
              src="/sahal.png"
              alt="Sahal"
              fill
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* 2. COMPACT CONTACT & INFO SECTION */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20 mt-10 lg:mt-0" id="email-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border-t border-white/5 pt-16">
          
          {/* Form (Sleek & Compact) */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white uppercase tracking-widest font-mono text-sm">
              <span className="w-2 h-2 bg-[var(--theme-lime-400)] rounded-full animate-pulse shadow-[0_0_10px_var(--theme-lime-400)]" />
              Direct Uplink
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative group">
                <FiMail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 text-xl group-focus-within:text-lime-400 transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@example.com"
                  className="w-full bg-transparent border-b border-zinc-800 py-4 pl-10 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all font-mono text-sm"
                />
              </div>

              <div className="relative group">
                <textarea
                  rows={1}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your vision..."
                  className="w-full bg-transparent border-b border-zinc-800 py-4 pl-0 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all resize-none font-mono text-sm"
                />
              </div>

              <button
                disabled={status === "SENDING" || status === "SUCCESS"}
                className={`w-fit py-3 pr-6 font-bold text-sm uppercase tracking-widest flex items-center gap-4 transition-all group ${
                  status === "SUCCESS"
                    ? "text-green-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className={`p-3 rounded-full border transition-all duration-300 ${status === 'SUCCESS' ? 'bg-green-400 border-green-400 text-black' : 'border-zinc-800 group-hover:border-[var(--theme-lime-400)] group-hover:bg-[var(--theme-lime-400)] group-hover:text-black'}`}>
                  {status === "SENDING" ? (
                    <FiLoader className="animate-spin" />
                  ) : status === "SUCCESS" ? (
                    <FiCheck />
                  ) : (
                    <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
                  )}
                </span>
                <span>
                  {status === "IDLE" && "Initiate Send"}
                  {status === "SENDING" && "Transmitting..."}
                  {status === "SUCCESS" && "Message Received"}
                  {status === "ERROR" && "Error. Retry?"}
                </span>
              </button>
            </form>
          </div>

          {/* Nav & Socials (Minimalist) */}
          <div className="flex flex-col sm:flex-row justify-between gap-12 lg:gap-24 mx-auto lg:mx-0 w-full max-w-lg lg:max-w-none">
            {/* Links */}
            <div>
               <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-6 block">Sitemap</span>
               <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-tight flex items-center gap-4 group"
                    >
                      <span className="text-xs font-mono text-zinc-700 group-hover:text-[var(--theme-lime-400)] transition-colors">{link.label}</span>
                      {link.name}
                    </Link>
                  ))}
               </div>
            </div>

            {/* Socials & Location */}
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-6 block">Socials</span>
                <div className="flex gap-6">
                  {[
                    { icon: FiGithub, href: process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#" },
                    { icon: FiLinkedin, href: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#" },
                    { icon: FiInstagram, href: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "#" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-[var(--theme-lime-400)] transition-colors"
                    >
                      <item.icon size={24} />
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-4 block">Base</span>
                <div className="text-zinc-400 font-mono text-sm">
                  <p className="text-white mb-1">Malappuram</p>
                  <p>Kerala, India</p>
                </div>
              </div>
            </div>
          </div>
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

      {/* Success Toast Popup */}
      <AnimatePresence>
        {toast?.visible && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            className="fixed bottom-8 left-8 z-[100] bg-[var(--theme-lime-400)] text-black p-5 rounded-xl shadow-[0_20px_50px_rgba(163,230,53,0.2)] max-w-[320px] w-full border border-black/10 flex flex-col gap-2 pointer-events-auto"
          >
            <button 
              onClick={() => setToast({ ...toast, visible: false })}
              className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
            >
              <FiX size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse shadow-[0_0_5px_black]" />
              <p className="font-bold text-sm uppercase tracking-wider">Message Sent</p>
            </div>
            <div className="bg-black/5 rounded-lg p-3">
              <p className="text-xs font-mono font-medium truncate mb-1 opacity-80 border-b border-black/10 pb-1">{toast.email}</p>
              <p className="text-sm font-medium line-clamp-2 leading-relaxed">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
