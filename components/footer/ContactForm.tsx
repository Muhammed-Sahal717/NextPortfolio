"use client";

import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiLoader, FiMail, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [toast, setToast] = useState<{ email: string; message: string; visible: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus("SENDING");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_email: formData.email,
          message: formData.message,
          to_name: "Sahal",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );
      setStatus("SUCCESS");
      
      // Show toast
      setToast({ email: formData.email, message: formData.message, visible: true });
      setFormData({ email: "", message: "" });
      
      setTimeout(() => {
        setStatus("IDLE");
        setToast((prev) => (prev ? { ...prev, visible: false } : null));
      }, 3000);
    } catch (error: any) {
      console.error("EmailJS Full Error:", error);
      console.error("EmailJS Error Text:", error?.text || "No text");
      console.error("EmailJS Status:", error?.status || "No status");
      
      // If the error object is empty, stringify it
      if (typeof error === "object" && Object.keys(error).length === 0) {
        console.error("EmailJS Empty Error Object Stringified:", JSON.stringify(error));
      }

      setStatus("ERROR");
      setTimeout(() => setStatus("IDLE"), 3000);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto lg:mx-0">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white uppercase tracking-widest font-mono text-sm">
          <span className="w-2 h-2 bg-[var(--theme-lime-400)] rounded-full animate-pulse shadow-[0_0_10px_var(--theme-lime-400)]" />
          Direct Uplink
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <FiMail className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 text-xl group-focus-within:text-lime-400 transition-colors" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="hello@example.com"
              className="w-full bg-transparent border-b border-zinc-800 py-4 pl-10 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all font-mono text-sm"
            />
          </div>

          <div className="relative group">
            <textarea
              rows={1}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your vision..."
              className="w-full bg-transparent border-b border-zinc-800 py-4 pl-0 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[var(--theme-lime-400)] transition-all resize-none font-mono text-sm"
            />
          </div>

          <button
            disabled={status === "SENDING" || status === "SUCCESS"}
            className={`w-fit py-3 pr-6 font-bold text-sm uppercase tracking-widest flex items-center gap-4 transition-all group ${
              status === "SUCCESS"
                ? "text-green-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className={`p-3 rounded-full border transition-all duration-300 ${status === 'SUCCESS' ? 'bg-green-400 border-green-400 text-black' : 'border-zinc-800 group-hover:border-[var(--theme-lime-400)] group-hover:bg-[var(--theme-lime-400)] group-hover:text-black'}`}>
              {status === "SENDING" ? (
                <FiLoader className="animate-spin" />
              ) : status === "SUCCESS" ? (
                <FiCheck />
              ) : (
                <FiArrowUpRight className="group-hover:rotate-45 transition-transform" />
              )}
            </span>
            <span>
              {status === "IDLE" && "Initiate Send"}
              {status === "SENDING" && "Transmitting..."}
              {status === "SUCCESS" && "Message Received"}
              {status === "ERROR" && "Error. Retry?"}
            </span>
          </button>
        </form>
      </div>

      {/* Success Toast Popup */}
      <AnimatePresence>
        {toast?.visible && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            className="fixed bottom-8 left-8 z-[100] bg-[var(--theme-lime-400)] text-black p-5 rounded-xl shadow-[0_20px_50px_rgba(163,230,53,0.2)] max-w-[320px] w-full border border-black/10 flex flex-col gap-2 pointer-events-auto"
          >
            <button 
              onClick={() => setToast({ ...toast, visible: false })}
              className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
            >
              <FiX size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse shadow-[0_0_5px_black]" />
              <p className="font-bold text-sm uppercase tracking-wider">Message Sent</p>
            </div>
            <div className="bg-black/5 rounded-lg p-3">
              <p className="text-xs font-mono font-medium truncate mb-1 opacity-80 border-b border-black/10 pb-1">{toast.email}</p>
              <p className="text-sm font-medium line-clamp-2 leading-relaxed">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
