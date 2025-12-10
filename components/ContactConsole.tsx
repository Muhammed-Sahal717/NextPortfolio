"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FiTerminal,
  FiSend,
  FiLoader,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";

export default function ContactConsole() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const [logs, setLogs] = useState<string[]>([
    "> SYSTEM_READY...",
    "> WAITING_FOR_INPUT...",
  ]);

  const addLog = (text: string) => {
    setLogs((prev) => [...prev.slice(-2), text]); // Keep last 3 logs
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      addLog("> ERROR: MISSING_FIELDS");
      return;
    }

    setStatus("SENDING");
    addLog("> INITIATING_HANDSHAKE...");

    // Simulate tech processing delay for effect
    setTimeout(async () => {
      addLog("> ENCRYPTING_PAYLOAD...");

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_email: formData.email,
            message: formData.message,
            to_name: "Sahal", // Your name
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        setStatus("SUCCESS");
        addLog("> STATUS: 200 OK");
        addLog("> TRANSMISSION_COMPLETE.");
        setFormData({ email: "", message: "" });

        // Reset after 3 seconds
        setTimeout(() => setStatus("IDLE"), 3000);
      } catch (error) {
        console.error(error);
        setStatus("ERROR");
        addLog("> FATAL_ERR: CONNECTION_REFUSED");
      }
    }, 800);
  };

  return (
    <div className="w-full h-full bg-black border border-zinc-800 p-1 font-mono text-sm relative group">
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500" />

      {/* Header Bar */}
      <div className="flex items-center justify-between bg-zinc-900/50 px-3 py-2 border-b border-zinc-800 mb-4">
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <FiTerminal />
          <span>CONTACT_RELAY_V1.0</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-6">
        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-[10px] text-lime-400/70 uppercase tracking-widest block">
            01 // ENTER_SOURCE_ID (EMAIL)
          </label>
          <input
            type="email"
            placeholder="user@network.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-transparent border-b border-zinc-800 text-zinc-300 py-2 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-700"
            required
          />
        </div>

        {/* Message Input */}
        <div className="space-y-1">
          <label className="text-[10px] text-lime-400/70 uppercase tracking-widest block">
            02 // INPUT_PAYLOAD (MESSAGE)
          </label>
          <textarea
            rows={2}
            placeholder="Describe project parameters..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full bg-transparent border-b border-zinc-800 text-zinc-300 py-2 focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-700 resize-none"
            required
          />
        </div>

        {/* System Logs & Button */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pt-2">
          {/* Logs Display */}
          <div className="text-[10px] text-zinc-600 space-y-1 w-full font-mono min-h-[30px]">
            {logs.map((log, i) => (
              <p
                key={i}
                className={
                  i === logs.length - 1 ? "text-lime-400/80 animate-pulse" : ""
                }
              >
                {log}
              </p>
            ))}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={status === "SENDING" || status === "SUCCESS"}
            className={`
              flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all
              ${
                status === "IDLE" ? "bg-white text-black hover:bg-lime-400" : ""
              }
              ${
                status === "SENDING"
                  ? "bg-zinc-800 text-zinc-500 cursor-wait"
                  : ""
              }
              ${
                status === "SUCCESS"
                  ? "bg-green-500 text-black cursor-default"
                  : ""
              }
              ${status === "ERROR" ? "bg-red-500 text-white" : ""}
            `}
          >
            {status === "IDLE" && (
              <>
                <FiSend /> EXECUTE
              </>
            )}
            {status === "SENDING" && (
              <>
                <FiLoader className="animate-spin" /> UPLOADING
              </>
            )}
            {status === "SUCCESS" && (
              <>
                <FiCheck /> SENT
              </>
            )}
            {status === "ERROR" && (
              <>
                <FiAlertTriangle /> RETRY
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
