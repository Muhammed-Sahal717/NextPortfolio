"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk"; // or use ShadCN's command component if installed
import {
  FiHome,
  FiCpu,
  FiUser,
  FiMail,
  FiGithub,
  FiArrowRight,
} from "react-icons/fi";

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle with CMD+K or CTRL+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-99999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-950 border-2 border-lime-500 rounded-xl shadow-[0_0_50px_rgba(132,204,22,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command label="Global Command Menu" className="w-full">
          <div className="flex items-center border-b border-white/10 px-4">
            <FiArrowRight className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 text-white font-mono"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500 font-mono">
              NO_RESULTS_FOUND.
            </Command.Empty>

            <Command.Group
              heading="NAVIGATION"
              className="text-xs font-bold text-zinc-600 px-2 py-1.5 mb-2"
            >
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-lime-500 hover:text-black cursor-pointer transition-colors group"
              >
                <FiHome /> <span>Home</span>
                <span className="ml-auto text-[10px] opacity-50 group-hover:text-black font-mono">
                  G H
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => router.push("/#projects"))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-lime-500 hover:text-black cursor-pointer transition-colors"
              >
                <FiCpu /> <span>Projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => router.push("/#about"))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-lime-500 hover:text-black cursor-pointer transition-colors"
              >
                <FiUser /> <span>About Me</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="EXTERNAL"
              className="text-xs font-bold text-zinc-600 px-2 py-1.5 mt-2 mb-2"
            >
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      process.env.NEXT_PUBLIC_CONTACT_GITHUB!,
                      "_blank",
                    ),
                  )
                }
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-white hover:text-black cursor-pointer transition-colors"
              >
                <FiGithub /> <span>GitHub</span>
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() =>
                    window.open(
                      `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
                      "_blank",
                    ),
                  )
                }
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-zinc-300 hover:bg-white hover:text-black cursor-pointer transition-colors"
              >
                <FiMail /> <span>Contact Email</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-white/10 px-4 py-2 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
            <span>SYSTEM: ONLINE</span>
            <div className="flex gap-2">
              <span className="bg-zinc-800 px-1 rounded">↑↓</span> to navigate
              <span className="bg-zinc-800 px-1 rounded">↵</span> to select
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}
