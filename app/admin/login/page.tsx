"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-lime-400/3 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(163, 230, 53, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(163, 230, 53, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lime-400/10 border border-lime-400/20 mb-6"
          >
            <FiLock className="text-lime-400" size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Admin Access
          </h1>
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            Portfolio Control Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                <FiAlertCircle className="shrink-0" size={16} />
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pl-11 text-white placeholder:text-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pl-11 text-white placeholder:text-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-xs mt-6 font-mono">
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}
