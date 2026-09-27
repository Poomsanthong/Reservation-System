"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoUpload from "./LogoUplaod";
import OpeningHours from "./OpeningHours";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FULL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DayHours = {
  open: boolean;
  from: string;
  to: string;
};

type Hours = Record<string, DayHours>;

function buildDefaultHours() {
  return Object.fromEntries(
    DAYS.map((d, i) => [d, { open: i < 5, from: "09:00", to: "22:00" }]),
  );
}

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

  const [hours, setHours] = useState<Hours>(buildDefaultHours);

  const toggleDay = (day: string) => {
    setHours((h) => ({ ...h, [day]: { ...h[day], open: !h[day].open } }));
  };
  const setTime = (day: string, field: "from" | "to", val: string) => {
    setHours((h) => ({ ...h, [day]: { ...h[day], [field]: val } }));
  };
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("ownerName", ownerName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("organization", organization);
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
    <div className="min-h-screen  flex w-full  text-[foreground] p-12 ">
      {/* left side */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0  p-12 border-r border-[#2e2b25]">
        <div>
          <div className="flex items-center gap-2 mb-16 ">
            <div className="w-16 h-16 rounded  ">
              <img src="BookFlow_favicon.svg" alt="BookFlow Logo" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-lg tracking-tight">
              BookFlow
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] text-[#f5f0e8] mb-6">
            Your restaurant,
            <br />
            <em className="text-[#d4821a]">managed</em>
            <br />
            beautifully.
          </h1>
          <p className="text-[#8b8070] text-sm leading-relaxed max-w-[280px]">
            Set up your dashboard in minutes. Handle reservations, menus, staff,
            and analytics from one place.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { label: "Reservations", val: "1,284" },
            { label: "Avg. cover tonight", val: "42" },
            { label: "Menu items", val: "96" },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="flex items-center justify-between border-t border-[#2e2b25] pt-4"
            >
              <span className="text-[#8b8070] text-xs uppercase tracking-widest">
                {label}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-xl">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* right side */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-[560px]">
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#f5f0e8] mb-2">
              Create your account
            </h2>
            <p className="text-[#8b8070] text-sm">
              Get your restaurant dashboard live in under 5 minutes.
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
            className="w-full max-w-[560px] space-y-6"
          >
            {/* form legend */}
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

            {/* form legend */}
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

            <OpeningHours />

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
                // disabled={loading || !email || !password || !organization}
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
      </div>
    </div>
  );
}
