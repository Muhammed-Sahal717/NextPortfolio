"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { FiAlertCircle, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="bg-zinc-950 border-white/10 shadow-none">
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mb-2">
              <FiLock className="text-green-400" size={20} />
            </div>
            <CardTitle className="text-2xl font-semibold text-white tracking-tight">Admin Login</CardTitle>
            <CardDescription className="text-zinc-500 text-sm">
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
                  <FiAlertCircle className="shrink-0" size={14} />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-green-400/20 focus-visible:border-green-400/50 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-green-400/20 focus-visible:border-green-400/50 rounded-md"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold rounded-md transition-colors"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center pt-2 pb-6">
            <p className="text-xs text-zinc-600">Authorized access only.</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
