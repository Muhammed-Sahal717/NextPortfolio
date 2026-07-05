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
    <div className="p-3 bg-transparent pb-safe">
      <form onSubmit={onSubmit} className="relative flex items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="w-full bg-transparent border border-border text-foreground placeholder:text-muted-foreground rounded-full pl-5 pr-12 h-12 font-sans text-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring transition-all"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="absolute right-1.5 w-9 h-9 bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all duration-300 disabled:opacity-50 shadow-sm"
        >
          <Send size={15} strokeWidth={2.5} className="ml-[-1px]" />
        </Button>
      </form>
    </div>
  );
}
