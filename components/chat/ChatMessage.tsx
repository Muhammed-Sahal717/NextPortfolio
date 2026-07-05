"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Message as MessageWrapper, MessageAvatar, MessageContent, MessageHeader, MessageFooter } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Copy, Check } from "lucide-react";
import AIIcon from "@/components/chat/AIIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [copied, setCopied] = useState(false);
  
  // Parse answer and suggestions
  const [answer, suggestionsBlock] = message.content.split("---SUGGESTIONS---");
  const suggestions = suggestionsBlock
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim())
    .filter(Boolean);

  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(answer?.trim() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MessageWrapper align={isUser ? "end" : "start"} className="mb-4">
      {isUser ? (
        <MessageAvatar className="w-8 h-8 mt-0 border border-border shadow-sm">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-muted">
              <User className="w-4 h-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </MessageAvatar>
      ) : (
        <MessageAvatar className="w-8 h-8 bg-transparent border border-border shadow-sm p-1 mt-0">
          <AIIcon status="idle" className="w-full h-full" />
        </MessageAvatar>
      )}

      <MessageContent>
        <MessageHeader className="text-[10px] text-muted-foreground font-medium px-1 mb-0.5">
          {isUser ? "You" : "AI Assistant"}
        </MessageHeader>
        
        <Bubble variant={isUser ? "default" : "ghost"} className={!isUser ? "max-w-full" : ""}>
          <BubbleContent className={`
            leading-relaxed
            ${isUser 
              ? "bg-foreground text-background px-4 py-2.5 rounded-2xl rounded-tr-sm text-[15px]" 
              : "bg-transparent text-foreground px-1 py-1 text-[15px]"
            }
          `}>
            {isUser ? (
              <div className="whitespace-pre-wrap break-words">{answer?.trim()}</div>
            ) : (
              <div className="prose prose-sm dark:prose-invert prose-zinc max-w-none break-words prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-li:my-0.5 prose-ul:my-2 prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0">
                <ReactMarkdown>
                  {answer?.trim() || ""}
                </ReactMarkdown>
              </div>
            )}
          </BubbleContent>
        </Bubble>

        {!isUser && (
          <MessageFooter className="mt-3 flex flex-col items-start gap-3 px-1">
            {suggestions && suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(s)}
                    className="h-8 text-xs font-medium bg-transparent border-border text-foreground rounded-full hover:bg-muted transition-all duration-300 relative overflow-hidden group shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-pink-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{s}</span>
                  </Button>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <TooltipProvider delayDuration={1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopy}
                      className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Copy message"
                    >
                      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{copied ? "Copied!" : "Copy"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </MessageFooter>
        )}
      </MessageContent>
    </MessageWrapper>
  );
}
