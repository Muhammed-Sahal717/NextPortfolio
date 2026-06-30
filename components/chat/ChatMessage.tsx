"use client";

import { Bot } from "lucide-react";

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
  const [answer, suggestionsBlock] = message.content.split("---SUGGESTIONS---");
  const suggestions = suggestionsBlock
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace("-", "").trim())
    .filter(Boolean);

  return (
    <div
      className={`flex gap-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "assistant" && (
        <div className="w-6 h-6 rounded-none border border-zinc-200 dark:border-zinc-800 bg-lime-400 dark:bg-lime-500 flex items-center justify-center shrink-0 mt-1 shadow-sm">
          <Bot size={14} />
        </div>
      )}

      <div
        className={`flex flex-col gap-2 max-w-[85%] ${
          message.role === "user" ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`
          p-2.5 text-xs font-medium border border-zinc-200 dark:border-zinc-800 shadow-sm
          whitespace-pre-wrap break-words
          ${
            message.role === "user"
              ? "bg-black text-white dark:bg-zinc-100 dark:text-black rounded-lg rounded-tr-none"
              : "bg-white text-black dark:bg-zinc-900 dark:text-white rounded-lg rounded-tl-none"
          }
        `}
        >
          {answer?.trim()}
        </div>

        {message.role === "assistant" && suggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(s)}
                className="
                  text-[10px] font-bold bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 px-2 py-1.5 rounded-full
                  hover:bg-lime-300 dark:hover:bg-lime-500 hover:text-black dark:text-white hover:-translate-y-0.5
                  transition-all duration-150 cursor-pointer
                "
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
