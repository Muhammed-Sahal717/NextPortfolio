"use client";

import Link from "next/link";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiCheck,
  FiLoader,
  FiMapPin,
} from "react-icons/fi";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import emailjs from "@emailjs/browser";

export default function Footer() {
  // --- FORM STATE ---
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus("SENDING");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_email: formData.email,
          message: formData.message,
          to_name: "Sahal",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("SUCCESS");
      setFormData({ email: "", message: "" });
      setTimeout(() => setStatus("IDLE"), 3000);
    } catch (error) {
      console.error(error);
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
      className="bg-black text-white relative border-t border-zinc-900"
      id="contact"
    >
      {/* 1. TOP HEADER SECTION */}
      <div className="border-b border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
          <div className="max-w-4xl">
            <ScrollReveal
              text="LET'S BUILD"
              className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-2"
            />
            <ScrollReveal
              text="THE FUTURE."
              className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-800 leading-[0.85]"
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID LAYOUT */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN: THE FORM */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-900 p-6 md:p-12 lg:py-24">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
            Contact
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
            <div className="group">
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-400 transition-colors">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@address.com"
                className="w-full bg-zinc-900/30 border-b border-zinc-800 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400 transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-400 transition-colors">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Your message..."
                className="w-full bg-zinc-900/30 border-b border-zinc-800 py-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-lime-400 transition-all resize-none"
              />
            </div>

            <button
              disabled={status === "SENDING" || status === "SUCCESS"}
              className={`w-full py-5 px-8 font-bold text-lg uppercase tracking-widest flex items-center justify-between group transition-all ${
                status === "SUCCESS"
                  ? "bg-green-600 text-white"
                  : "bg-white text-black hover:bg-lime-400"
              }`}
            >
              <span className="flex items-center gap-3">
                {status === "IDLE" && "Execute Send"}
                {status === "SENDING" && "Uploading..."}
                {status === "SUCCESS" && "Transmission Sent"}
                {status === "ERROR" && "Error. Retry?"}
              </span>
              <span className="bg-black text-white p-2 rounded-full group-hover:rotate-45 transition-transform duration-300">
                {status === "SENDING" ? (
                  <FiLoader className="animate-spin" />
                ) : status === "SUCCESS" ? (
                  <FiCheck />
                ) : (
                  <FiArrowUpRight />
                )}
              </span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: LINKS & INFO */}
        <div className="grid grid-rows-2">
          {/* Top Half: Navigation */}
          <div className="border-b border-zinc-900 p-6 md:p-12 flex flex-col justify-center">
            <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-8">
              Directory
            </span>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-baseline gap-6 text-3xl md:text-5xl font-bold text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="text-sm font-mono text-lime-400/50 group-hover:text-lime-400 transition-colors -translate-y-2">
                    {link.label}
                  </span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Half: Socials & Location */}
          <div className="p-6 md:p-12 flex flex-col justify-between gap-12 bg-zinc-950">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-4 block">
                  Social Uplink
                </span>
                <div className="flex gap-4">
                  {[
                    {
                      icon: FiGithub,
                      href: "https://github.com/Muhammed-Sahal717",
                    },
                    {
                      icon: FiLinkedin,
                      href: "https://linkedin.com/in/mhdsahal717",
                    },
                    {
                      icon: FiInstagram,
                      href: "https://instagram.com/_mhd_sahal_ap",
                    },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      target="_blank"
                      className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-lime-400 hover:border-lime-400 transition-all rounded-lg"
                    >
                      <item.icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-4 block">
                  Base of Operations
                </span>
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="p-2 bg-zinc-900 rounded-full text-lime-400">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="font-bold">Malappuram</p>
                    <p className="text-sm text-zinc-500">Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-zinc-900/50 text-xs font-mono text-zinc-600 uppercase">
              <p>© 2025 Sahal. Web Developer.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
