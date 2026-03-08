"use client";

import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Fallback if the browser doesn't support the View Transition API
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      // Small setTimeout to ensure next-themes has applied the DOM update before snapshotting
      return new Promise<void>((resolve) => {
        setTheme(nextTheme);
        setTimeout(resolve, 0);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // If switching to dark, the old view (light) shrinks.
      // Put old view on top using a custom class.
      if (!isDark) {
        document.documentElement.classList.add("dark-transition");
      }

      const animation = document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 1200, // slower transition
          easing: "cubic-bezier(0.76, 0, 0.24, 1)", // buttery smooth expressive ease-in-out
          pseudoElement: isDark
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        },
      );

      // Clean up class when animation finishes
      animation.finished.then(() => {
        document.documentElement.classList.remove("dark-transition");
      });
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </Button>
  );
}
