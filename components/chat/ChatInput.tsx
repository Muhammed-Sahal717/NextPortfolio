"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({ input, setInput, isLoading, onSubmit }: ChatInputProps) {
  return (
    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe">
      <form onSubmit={onSubmit} className="flex gap-2 relative">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message..."
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white placeholder:text-zinc-500 rounded-lg pr-2 h-10 font-sans text-sm focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 focus-visible:border-zinc-400 dark:focus-visible:border-zinc-600 transition-all shadow-sm"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="h-10 w-10 bg-black dark:bg-white text-white dark:text-black border border-transparent rounded-lg transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 relative overflow-hidden group hover:scale-105 active:scale-95 shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Send size={16} strokeWidth={2.5} className="relative z-10 group-hover:text-white transition-colors" />
        </Button>
      </form>
    </div>
  );
}
