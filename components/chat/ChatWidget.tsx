"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AIIcon from "@/components/chat/AIIcon";
import ChatTrigger from "./ChatTrigger";
import ChatInput from "./ChatInput";
import ChatMessage, { Message } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 400, h: 600 });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Resizing logic
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, w: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      // Moving mouse left (negative delta) means larger width since anchored bottom-right
      const deltaX = startPos.current.x - e.clientX;
      let newW = startPos.current.w + deltaX;
      
      // Constraints: Min 400, Max 800
      newW = Math.max(400, Math.min(newW, 1000));
      let newH = newW * 1.5; // lock aspect ratio
      
      // Screen bounds
      const maxH = window.innerHeight - 60;
      if (newH > maxH) {
        newH = maxH;
        newW = newH / 1.5;
      }
      
      setDimensions({ w: newW, h: newH });
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startPos.current = { x: e.clientX, w: dimensions.w };
    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

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
        const chunkValue = decoder.decode(value || new Uint8Array(), { stream: !done });
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
              <div 
              style={{ "--chat-w": `${dimensions.w}px`, "--chat-h": `${dimensions.h}px` } as React.CSSProperties}
              className="w-[calc(100vw-32px)] md:w-[var(--chat-w)] h-[500px] md:h-[var(--chat-h)] max-h-[85vh] bg-background border border-border shadow-xl flex flex-col rounded-xl overflow-hidden relative z-10 transition-shadow ease-in-out"
            >
              {/* Drag Handle Top-Left (Only visible on desktop) */}
              <div 
                onMouseDown={handleMouseDown}
                className="hidden md:block absolute -top-[1px] -left-[1px] w-10 h-10 cursor-nwse-resize z-50 group/handle"
              >
                {/* Seamless glowing border overlay */}
                <div className="absolute top-0 left-0 w-full h-full rounded-tl-xl border-t-[3px] border-l-[3px] border-muted-foreground/30 group-hover/handle:border-emerald-500 transition-colors pointer-events-none group-hover/handle:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              
              {/* Header */}
              <div className="flex flex-row justify-between items-center p-3 shrink-0 z-20">
                <Badge variant="outline" className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-muted/30 shadow-sm border-border cursor-default">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <AIIcon status={currentStatus} />
                  </div>
                  <span className="font-sans font-bold text-xs text-foreground">
                    AI Assistant
                  </span>
                </Badge>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-muted/30 border-border text-muted-foreground hover:text-foreground shadow-sm"
                >
                  <X size={16} strokeWidth={2.5} />
                </Button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden bg-background relative">
                <div
                  data-lenis-prevent
                  className="h-full w-full overflow-y-auto overscroll-contain overscroll-y-contain scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                >
                  <div className="p-4">
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full pt-8 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-20 h-20 bg-muted/50 border border-border rounded-full flex items-center justify-center mb-4 shadow-sm relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Terminal size={32} className="text-foreground relative z-10" />
                        </div>
                        <p className="font-mono font-bold text-base mb-1 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400">
                          SYSTEM READY
                        </p>
                        <p className="text-xs text-muted-foreground text-center max-w-[200px] mb-6 font-medium">
                          Ask about Sahal&apos;s stack, projects, or hire him
                          immediately.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {["STACK", "PROJECTS", "HIRE"].map((q) => (
                            <button
                              key={q}
                              onClick={() => sendMessage(q)}
                              className="text-[10px] font-mono font-bold border border-border bg-background text-foreground px-3 py-1.5 rounded-full hover:bg-gradient-to-r hover:from-emerald-500 hover:via-green-400 hover:to-lime-400 hover:text-white hover:border-transparent transition-all duration-300 active:translate-y-0.5 shadow-sm"
                            >
                              {"> "}
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pb-4">
                      {messages.length > 0 && (
                        <div className="flex flex-col min-w-0 gap-2">
                          {messages.map((m) => (
                            <ChatMessage key={m.id} message={m} sendMessage={sendMessage} />
                          ))}
                        </div>
                      )}

                      {isLoading && (
                        <div className="group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse mb-4" data-align="start">
                          <div className="flex w-8 h-8 min-w-8 shrink-0 items-center justify-center self-start overflow-hidden rounded-full bg-transparent border border-border shadow-sm p-1 mt-1">
                            <AIIcon status="loading" className="w-full h-full" />
                          </div>
                          
                          <div className="flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end">
                            <div className="group/bubble relative flex w-fit max-w-full min-w-0 flex-col gap-1 border-none bg-transparent">
                              <div className="w-fit max-w-full min-w-0 overflow-hidden px-1 py-3 text-sm leading-relaxed wrap-break-word bg-transparent h-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"></span>
                              </div>
                            </div>
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
