"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { KeyRound, Mail, Sparkles, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.refresh();
        router.push("/id/admin");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-accent-blue/10 rounded-2xl text-accent-blue">
            <Sparkles className="h-6 w-6 text-accent-gold" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black dark:text-white">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500">
            Ritinari Karya Indonesia Studio
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-2.5 text-left">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6 text-left" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white"
                  placeholder="admin@ritinari.id"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 inline-flex items-center justify-center bg-accent-blue hover:bg-accent-blue/95 text-white font-bold text-sm tracking-wider rounded-xl transition-all shadow-md shadow-accent-blue/15 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
