"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, Terminal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

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

  // Removed body scroll lock so you can still scroll the site while chat is open as a small tab
  useEffect(() => {
    document.body.style.overflow = "unset";
  }, [isOpen]);

  const getKuttappanFace = () => {
    if (isError) return "/kuttappan-aiyyoo.png";
    if (isLoading) return "/kuttappan-loading.png";
    return "/kuttappan-idle.png";
  };

  const getKuttappanMood = () => {
    if (isError) return "SYSTEM_ERR: AIYYO!";
    if (isLoading) return "PROCESSING...";
    return "STATUS: ONLINE";
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

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
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
      {/* 1. NEUBRUTALIST TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-100">
        <AnimatePresence>
          {!isOpen && (
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 w-max bg-white text-black font-mono text-[10px] font-bold px-3 py-1.5 border-2 border-black shadow-[4px_4px_0px_#000] hidden md:block"
              >
                {getKuttappanMood()}
              </motion.div>

              <motion.button
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                whileHover={{ scale: 1.05, translate: "-2px -2px" }}
                whileTap={{ scale: 0.95, translate: "2px 2px" }}
                onClick={() => setIsOpen(true)}
                className={`
                  h-12 w-12
                  ${isError ? "bg-red-500" : "bg-lime-400"} 
                  border-2 border-black 
                  shadow-[4px_4px_0px_#000] 
                  hover:shadow-[6px_6px_0px_#000]
                  active:shadow-[0px_0px_0px_#000]
                  flex items-center justify-center 
                  overflow-hidden 
                  transition-all duration-100 ease-out
                  rounded-full
                `}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={getKuttappanFace()}
                    alt="AI"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. CHAT WINDOW (Small Tab on Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-101 flex items-end justify-end"
          >
            <div
              className="
                w-[calc(100vw-32px)] md:w-[400px] 
                h-[450px] md:h-[600px] /* Compact height on mobile */
                max-h-[80vh]
                bg-white 
                border-2 border-black 
                shadow-[8px_8px_0px_#000] 
                flex flex-col 
                rounded-xl 
                overflow-hidden 
                relative z-10
              "
            >
              {/* Header */}
              <div className="h-14 border-b-2 border-black bg-zinc-100 flex flex-row justify-between items-center px-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${
                      isError ? "bg-red-500" : "bg-lime-400"
                    } border-2 border-black rounded-md flex items-center justify-center overflow-hidden`}
                  >
                    <Image
                      src={getKuttappanFace()}
                      alt="Avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-sm text-black leading-none">
                      KUTTAPPAN_AI
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase leading-tight">
                      v2.0 // {isError ? "ERR" : "RDY"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white border-2 text-black border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center rounded-md"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden bg-white relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px]" />

                <ScrollArea className="h-full p-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full pt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="w-20 h-20 bg-zinc-100 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000]">
                        <Terminal size={32} className="text-black" />
                      </div>
                      <p className="font-mono font-bold text-base mb-1">
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
                            onClick={() => setInput(q)}
                            className="text-[10px] font-mono font-bold border-2 border-black bg-white px-2 py-1 rounded-md hover:bg-lime-400 hover:shadow-[2px_2px_0px_#000] transition-all active:translate-y-0.5 active:shadow-none"
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
                      <div
                        key={m.id}
                        className={`flex gap-2 ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {m.role === "assistant" && (
                          <div className="w-6 h-6 rounded-none border-2 border-black bg-lime-400 flex items-center justify-center shrink-0 mt-1 shadow-[2px_2px_0px_#000]">
                            <Bot size={14} />
                          </div>
                        )}

                        <div
                          className={`
                            max-w-[85%] p-2.5 text-xs font-medium border-2 border-black shadow-[3px_3px_0px_#000]
                            whitespace-pre-wrap wrap-break-words
                            ${
                              m.role === "user"
                                ? "bg-black text-white rounded-lg rounded-tr-none"
                                : "bg-white text-black rounded-lg rounded-tl-none"
                            }
                          `}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-6 h-6 border-2 border-black bg-lime-400 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
                          <Bot size={14} />
                        </div>
                        <div className="bg-white border-2 border-black px-3 py-2 rounded-lg rounded-tl-none shadow-[3px_3px_0px_#000] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-black animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-black animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-black animate-bounce"></span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-zinc-100 border-t-2 border-black pb-safe">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex gap-2 relative"
                >
                  <div className="relative flex-1">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type command..."
                      className="bg-white border-2 border-black text-black placeholder:text-zinc-400 rounded-lg pr-2 h-10 font-mono text-sm focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[3px_3px_0px_#000] transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 bg-black hover:bg-zinc-800 text-white border-2 border-black rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#84cc16] disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                  >
                    <Send size={16} strokeWidth={2.5} />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
