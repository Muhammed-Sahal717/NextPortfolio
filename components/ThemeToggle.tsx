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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </Button>
  );
}
