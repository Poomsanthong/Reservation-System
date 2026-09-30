"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoUpload from "./LogoUplaod";
import OpeningHours from "./OpeningHours";
import { useOpeningHours } from "@/lib/hooks/useOpeningHours";

export default function SignUpForm() {
  const router = useRouter();
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);

  // useHook
  const { hours, toggleDay, setTime } = useOpeningHours();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("ownerName", ownerName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization", organization);
    formData.append("hours", JSON.stringify(hours));

    if (logo) formData.append("logo", logo);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Failed to create account.");
        return;
      }

      setSuccess("Sign up successful. Redirecting to login...");
      router.push("/login");
    } catch {
      setError("Something went wrong while creating your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#f5f0e8] mb-2">
          Create your account
        </h2>
        <p className="text-[#8b8070] text-sm">
          Get your restaurant dashboard live in under 5 minutes.
        </p>
      </div>

      <div className="w-full min-w-0 max-w-[560px]">
        <form onSubmit={handleSignUp} className="w-full min-w-0 space-y-6">
          {/* Account legend */}
          <legend className="text-[10px] uppercase tracking-[0.15em] text-foreground mb-4 block">
            Account details
          </legend>

          {/* name */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              Your full name
            </label>
            <Input
              placeholder="Elena Marchetti"
              type="text"
              autoComplete="name"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              Email Address
            </label>
            <Input
              placeholder="admin@example.com"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* password */}
          <div className="space-y-2">
            <label className="block text-xs text-muted-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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

          {/* Organization legend */}
          <legend className="text-[10px] uppercase tracking-[0.15em] text-foreground mb-4 block">
            Organization details
          </legend>

          {/* organization */}
          <div className="space-y-2">
            <label className="block text-xs text-muted-foreground mb-1.5">
              Organization Name
            </label>
            <Input
              placeholder="Chargebee Restaurant"
              type="text"
              autoComplete="organization"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              disabled={loading}
            />
          </div>
          {/* restaurant logo upload */}

          <LogoUpload disabled={loading} onChange={setLogo} />

          {/* Opening Hours */}

          <OpeningHours
            hours={hours}
            onToggleDay={toggleDay}
            onSetTime={setTime}
          />

          {/* error */}
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
              {error}
            </p>
          )}
          {/* success */}
          {success && (
            <p className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-1">
              {success}
            </p>
          )}
          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading || !email || !password || !organization}
              className="w-full bg-[#d4821a] hover:bg-[#f0a83a] text-[#1a1814] font-semibold text-sm rounded py-4 transition-colors"
            >
              {loading ? "Signing up..." : "Create restaurant account"}
            </Button>

            <p className="text-center text-[#4a4740] text-xs mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#d4821a] hover:text-[#f0a83a] transition-colors underline underline-offset-2"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
