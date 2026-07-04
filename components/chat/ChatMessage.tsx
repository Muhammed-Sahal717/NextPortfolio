"use client";

import React from "react";
import { Message as MessageWrapper, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import AiraIcon from "@/components/chat/AiraIcon";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface ChatMessageProps {
  message: Message;
  sendMessage: (text: string) => void;
}

export default function ChatMessage({ message, sendMessage }: ChatMessageProps) {
  // Parse answer and suggestions
  const [answer, suggestionsBlock] = message.content.split("---SUGGESTIONS---");
  const suggestions = suggestionsBlock
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim())
    .filter(Boolean);

  const isUser = message.role === "user";

  return (
    <MessageWrapper align={isUser ? "end" : "start"} className="mb-4">
      {!isUser && (
        <MessageAvatar className="w-8 h-8 bg-transparent border border-zinc-200 dark:border-zinc-800 shadow-sm p-1 mt-0">
          <AiraIcon status="idle" className="w-full h-full" />
        </MessageAvatar>
      )}

      <MessageContent>
        <Bubble variant={isUser ? "default" : "ghost"} className={!isUser ? "max-w-full" : ""}>
          <BubbleContent className={`
            whitespace-pre-wrap break-words leading-relaxed
            ${isUser 
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2.5 rounded-2xl rounded-tr-sm text-[15px]" 
              : "bg-transparent text-zinc-900 dark:text-zinc-100 px-1 py-1 text-[15px]"
            }
          `}>
            {answer?.trim()}
          </BubbleContent>
        </Bubble>

        {!isUser && suggestions && suggestions.length > 0 && (
          <MessageFooter className="mt-3 flex flex-wrap gap-2 px-1">
            {suggestions.map((s, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(s)}
                className="h-8 text-xs font-medium bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 relative overflow-hidden group shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-pink-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{s}</span>
              </Button>
            ))}
          </MessageFooter>
        )}
      </MessageContent>
    </MessageWrapper>
  );
}
