"use client";

import Link from "next/link";
import ContactForm from "./ContactForm";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#",
      label: "GitHub",
    },
    {
      icon: FiLinkedin,
      href: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#",
      label: "LinkedIn",
    },
    {
      icon: FiInstagram,
      href: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "#",
      label: "Instagram",
    },
  ];

  return (
    <footer
      className="bg-background text-foreground relative border-t border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col pt-24 pb-12"
      id="contact"
    >
      <motion.div
        className="w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col gap-4"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            <ScrollReveal text="Let's work together." />
          </h2>
          <p className="text-lg text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="w-full text-left"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <ContactForm />
        </motion.div>
      </motion.div>

      {/* Bottom Horizontal Bar */}
      <motion.div
        className="w-full max-w-[100rem] mx-auto mt-32 px-6 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
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
            <p>
              &copy; {new Date().getFullYear()} Sahal. Thanks for scrolling this
              far.
            </p>
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
      </motion.div>
    </footer>
  );
}
