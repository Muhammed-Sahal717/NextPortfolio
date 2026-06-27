"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Bot, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AiraIcon from "@/components/chat/AiraIcon";
import ChatTrigger from "./ChatTrigger";
import ChatInput from "./ChatInput";
import ChatMessage, { Message } from "./ChatMessage";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, [isOpen]);

  const currentStatus = isError ? "error" : isLoading ? "loading" : "idle";

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Network error");
      if (!response.body) throw new Error("No response body");

      const botMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: !done });
        accumulatedText += chunkValue;

        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === "assistant") {
            lastMsg.content = accumulatedText;
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setIsError(true);
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          role: "assistant",
          content: "CONNECTION_LOST. REBOOTING...",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsError(false), 4000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "/panic") {
      setIsError(true);
      setMessages((prev) => [
        ...prev,
        { id: "test", role: "assistant", content: "⚠️ TEST PANIC INITIATED" },
      ]);
      setInput("");
      setTimeout(() => setIsError(false), 4000);
      return;
    }
    await sendMessage(input);
  };

  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const e = event as CustomEvent;
      setIsOpen(true);
      if (e.detail?.message) setInput(e.detail.message);
    };
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  return (
    <>
      <ChatTrigger isOpen={isOpen} setIsOpen={setIsOpen} currentStatus={currentStatus} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[101] flex items-end justify-end"
          >
            <div className="w-[calc(100vw-32px)] md:w-[400px] h-[450px] md:h-[600px] max-h-[80vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col rounded-xl overflow-hidden relative z-10">
              
              {/* Header */}
              <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex flex-row justify-between items-center px-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center p-[2px]">
                    <AiraIcon status={currentStatus} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-sm text-black dark:text-white leading-none">
                      Aira
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center rounded-md"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden bg-white dark:bg-zinc-950 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div
                  data-lenis-prevent
                  className="h-full w-full overflow-y-auto overscroll-contain overscroll-y-contain scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
                >
                  <div className="p-4">
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full pt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                          <Terminal size={32} className="text-black dark:text-white" />
                        </div>
                        <p className="font-mono font-bold text-base mb-1 dark:text-white">
                          SYSTEM READY
                        </p>
                        <p className="text-xs text-zinc-500 text-center max-w-[200px] mb-6 font-medium">
                          Ask about Sahal&apos;s stack, projects, or hire him
                          immediately.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {["STACK", "PROJECTS", "HIRE"].map((q) => (
                            <button
                              key={q}
                              onClick={() => sendMessage(q)}
                              className="text-[10px] font-mono font-bold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white px-2 py-1 rounded-md hover:bg-lime-400 dark:hover:bg-lime-500 hover:text-black transition-all active:translate-y-0.5"
                            >
                              {"> "}
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pb-4">
                      {messages.map((m) => (
                        <ChatMessage key={m.id} message={m} sendMessage={sendMessage} />
                      ))}

                      {isLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-6 h-6 border border-zinc-200 dark:border-zinc-800 bg-lime-400 dark:bg-lime-500 flex items-center justify-center shrink-0 shadow-sm">
                            <Bot size={14} />
                          </div>
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-black dark:bg-white animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-black dark:bg-white animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-black dark:bg-white animate-bounce"></span>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>
              </div>

              <ChatInput
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                onSubmit={handleFormSubmit}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
