"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function login(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess("Login successful. Redirecting...");
    // IMPORTANT: refresh server-side auth
    window.location.href = "/admin";
  }

  async function forgotPassword() {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Enter email first.");
      return;
    }
    setLoading(true);
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/admin/reset`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password reset email sent.");
    }
  }

  return (
    <div className="flex flex-col max-w-sm mx-auto gap-6 pt-20">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with your admin credentials.
        </p>
      </div>

      <form onSubmit={login} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Email</label>
          <Input
            placeholder="admin@example.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-1">
            {success}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </div>
      </form>

      <div className="flex justify-between text-xs">
        <button
          onClick={forgotPassword}
          disabled={loading}
          className="text-blue-600 hover:underline disabled:opacity-50"
          type="button"
        >
          Forgot password?
        </button>
        <span className="text-muted-foreground">
          Need help? Contact support.
        </span>
      </div>
    </div>
  );
}
