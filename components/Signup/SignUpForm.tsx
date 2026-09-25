"use client";
import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [logo, setLogo] = useState("");
  const [logoName, setLogoName] = useState(" ");
  const [dragging, setDragging] = useState(false);
  const [hours, setHours] = useState<Hours>(buildDefaultHours);

  const fileRef = useRef<HTMLInputElement>(null);

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

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogo(e.target?.result as string);
      setLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

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
            <div className="space-y-2">
              <label className="block text-xs text-muted-foreground mb-1.5">
                Restaurant Logo <br />
              </label>
              <div
                className={`relative border rounded transition-colors cursor-pointer
                ${dragging ? "border-[] bg-[muted-foreground]/5" : "border-[primary] hover:border-[#f5f0e8] "}
                    ${logo ? "p-4" : "p-8"}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
              >
                <Input
                  className="hidden"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                {logo ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={logo}
                      alt="Logo preview"
                      className="w-14 h-14 object-contain rounded bg-[#2e2b25] p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#f5f0e8] text-sm truncate">
                        {logoName}
                      </p>
                      <p className="text-[#8b8070] text-xs mt-0.5">
                        Click to replace
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogo("");
                        setLogoName("");
                      }}
                      className="text-[#4a4740] hover:text-[#f5f0e8] transition-colors p-1"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-10 h-10 rounded border border-[#2e2b25] flex items-center justify-center mx-auto mb-3 bg-[#1a1814]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b8070"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <p className="text-[#f5f0e8] text-sm mb-1">
                      Drop your logo here
                    </p>
                    <p className="text-[#8b8070] text-xs">
                      PNG, JPG, SVG — up to 5 MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Opening Hours */}
            <fieldset>
              <legend className="text-[10px] uppercase tracking-[0.15em] text-[muted-foreground] mb-4 block">
                Operating hours
              </legend>

              <div className="space-y-2">
                {DAYS.map((day, i) => (
                  <div
                    key={day}
                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors
                      ${hours[day].open ? "bg-[#111009]" : "bg-transparent opacity-60"}`}
                  >
                    {/* Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`relative w-9 h-5 rounded-full transition-colors shrink-0
                        ${hours[day].open ? "bg-[#d4821a]" : "bg-[#2e2b25]"}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform
                        ${hours[day].open ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>

                    {/* Day label */}
                    <span className="text-xs text-[#f5f0e8] w-8 shrink-0 font-medium">
                      {FULL_DAYS[i].slice(0, 3)}
                    </span>

                    {hours[day].open ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={hours[day].from}
                          onChange={(e) => setTime(day, "from", e.target.value)}
                          className="bg-[#1a1814] border border-[#2e2b25] rounded text-[#f5f0e8] text-xs px-2 py-1.5 focus:border-[#d4821a] transition-colors flex-1"
                        />
                        <span className="text-[#4a4740] text-xs shrink-0">
                          –
                        </span>
                        <Input
                          type="time"
                          value={hours[day].to}
                          onChange={(e) => setTime(day, "to", e.target.value)}
                          className="bg-[#1a1814] border border-[#2e2b25] rounded text-[#f5f0e8]  px-2 py-1.5 focus:border-[#d4821a] transition-colors flex-1"
                        />
                      </div>
                    ) : (
                      <Input
                        type="text"
                        value="Closed"
                        readOnly
                        className="bg-[#1a1814] border border-[#2e2b25] rounded text-[#f5f0e8]  px-2 py-1.5 focus:border-[#d4821a] transition-colors flex-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

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
      </div>
    </div>
  );
}
