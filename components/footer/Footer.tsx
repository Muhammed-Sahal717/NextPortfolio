import Link from "next/link";
import ContactForm from "./ContactForm";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: FiGithub, href: process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#", label: "GitHub" },
    { icon: FiLinkedin, href: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#", label: "LinkedIn" },
    { icon: FiInstagram, href: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "#", label: "Instagram" },
  ];

  return (
    <footer
      className="bg-background text-foreground relative border-t border-border flex flex-col pt-24 pb-12"
      id="contact"
    >
      <div className="w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Let's work together.
          </h2>
          <p className="text-lg text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full text-left">
          <ContactForm />
        </div>
      </div>

      {/* Bottom Horizontal Bar */}
      <div className="w-full max-w-5xl mx-auto mt-32 px-6">
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          
          {/* Navigation */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div>
             <p>© {new Date().getFullYear()} Sahal. All rights reserved.</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks.map((item, i) => (
              <Button
                key={i}
                asChild
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-9 w-9 rounded-full"
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <item.icon size={18} />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
