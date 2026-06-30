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
            placeholder="Type command..."
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white dark:text-white placeholder:text-zinc-400 rounded-lg pr-2 h-10 font-mono text-sm focus-visible:ring-1 focus-visible:ring-lime-400 focus-visible:border-lime-400 transition-all"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="h-10 w-10 bg-black hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-300 text-white dark:text-black border border-transparent rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
        >
          <Send size={16} strokeWidth={2.5} />
        </Button>
      </form>
    </div>
  );
}
