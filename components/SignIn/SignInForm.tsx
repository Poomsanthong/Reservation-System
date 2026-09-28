"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientInstance } from "@/lib/supabaseClient";
import { Button } from "../ui/button";
export default function SignInForm() {
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
    const { data, error } =
      await createClientInstance().auth.signInWithPassword({
        email,
        password,
      });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSuccess("Login successful. Redirecting...");
    // Smooth client-side navigation
    window.location.href = "/admin"; // Use full reload to ensure auth state is properly initialized on the admin page
  }

  async function forgotPassword() {
    console.log("clicked" + email.length);

    setError("");
    setSuccess("");
    if (!email || email.length < 1) {
      setError("Enter email first.");
      return;
    }
    setLoading(true);
    const { error } = await createClientInstance().auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${location.origin}/admin/reset`,
      },
    );
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password reset email sent.");
    }
  }

  return (
    <div className="mb-10 mt-25">
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#f5f0e8] mb-3">
        Welcome Back
      </h2>
      <div className="w-full min-w-0 max-w-[560px]">
        <form className="w-full max-w-[560px] space-y-6" onSubmit={login}>
          <div>
            <legend className="text-[10px] uppercase tracking-[0.15em] text-foreground mb-4 block">
              Email Address{" "}
            </legend>
            <Input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Demo@gmail.com"
            />
          </div>

          <div className="relative">
            <legend className="text-[10px] uppercase tracking-[0.15em] text-foreground mb-4 block">
              Password{" "}
            </legend>

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute cursor-pointer inset-y-5 right-2 top-1 flex items-center text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>

            <div className=" mt-2">
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 ">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-1">
                  {success}
                </p>
              )}
            </div>
            <a
              type="button"
              onClick={forgotPassword}
              className="text-xs text-[#d4821a] hover:text-[#f0a83a] transition-colors cursor-pointer"
            >
              Forgot password?
            </a>
          </div>

          <div className="flex items-center justify-between mb-1.5"></div>

          <label className="flex items-center gap-2.5 w-fit text-xs text-[#8b8070] cursor-pointer">
            <input type="checkbox" className="size-4 accent-[#d4821a]" />
            Keep me signed in
          </label>

          <div className="pt-2">
            <Button className="w-full  cursor-pointer bg-[#d4821a] hover:bg-[#f0a83a] text-[#1a1814] font-semibold text-sm rounded py-4 transition-colors">
              Sign in Dashboard
            </Button>

            <p className="text-center text-[#4a4740] text-xs mt-4">
              New to BookFlow?{" "}
              <a
                href="/signup"
                className="text-[#d4821a] hover:text-[#f0a83a] transition-colors underline underline-offset-2"
              >
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
