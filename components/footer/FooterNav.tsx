"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function FooterNav() {
  const navLinks = [
    { name: "Projects", href: "#projects", label: "01" },
    { name: "About", href: "#about", label: "02" },
    { name: "Stack", href: "#about", label: "03" },
  ];

  return (
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
  );
}
