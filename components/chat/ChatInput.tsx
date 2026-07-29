"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const MAX_CHARS = 100;

export default function ChatInput({
  input,
  setInput,
  isLoading,
  onSubmit,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setInput(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="p-3 bg-transparent pb-safe">
      <form onSubmit={onSubmit} className="relative flex items-end">
        <div className="relative w-full bg-background border border-border/80 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/30 rounded-2xl transition-all shadow-sm pl-4 pr-20 py-2.5">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder="Ask something..."
            className="w-full bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-base font-sans leading-snug resize-none overflow-y-auto max-h-32 custom-scrollbar"
          />

          {/* Character Limit Counter */}
          <div className="absolute right-12 bottom-3 text-[10px] font-mono text-muted-foreground/70 select-none">
            {input.length}/{MAX_CHARS}
          </div>
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 bottom-2 w-9 h-9 bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all duration-300 disabled:opacity-50 shadow-sm shrink-0"
        >
          <Send size={15} strokeWidth={2.5} className="ml-[-1px]" />
        </Button>
      </form>
    </div>
  );
}
