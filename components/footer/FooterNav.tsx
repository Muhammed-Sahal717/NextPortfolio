"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function FooterNav() {
  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-12 lg:gap-24 mx-auto lg:mx-0 w-full max-w-lg lg:max-w-none">
      {/* Links */}
      <div>
         <span className="text-muted-foreground font-medium text-sm mb-4 block">Navigation</span>
         <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors w-fit"
              >
                {link.name}
              </Link>
            ))}
         </div>
      </div>

      {/* Socials & Location */}
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-muted-foreground font-medium text-sm mb-4 block">Socials</span>
          <div className="flex gap-4">
            {[
              { icon: FiGithub, href: process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#", label: "GitHub" },
              { icon: FiLinkedin, href: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#", label: "LinkedIn" },
              { icon: FiInstagram, href: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "#", label: "Instagram" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-muted"
                aria-label={item.label}
              >
                <item.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <span className="text-muted-foreground font-medium text-sm mb-2 block">Location</span>
          <div className="text-sm text-foreground">
            <p>Malappuram</p>
            <p className="text-muted-foreground">Kerala, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
