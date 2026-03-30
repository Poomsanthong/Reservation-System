"use client";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
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
    <div className="flex flex-col max-w-sm mx-auto gap-6 pt-20">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Sign Up Form</h1>
        <p className="text-sm text-muted-foreground">
          Create an admin account.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        {/* email */}
        <div className="space-y-2">
          <label className="text-xs font-medium">Email</label>
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
          <label className="text-xs font-medium">Password</label>
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
        {/* organization */}
        <div className="space-y-2">
          <label className="text-xs font-medium">Organization Name</label>
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
        {/* restaurant logo */}
        <div className="space-y-2">
          <label className="text-xs font-medium ">
            Restaurant Logo <br />
          </label>
          <input
            className="bg-white text-accent rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm file:bg-transparent file:border-0 file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 "
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
            disabled={loading}
          />
        </div>
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
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email || !password || !organization}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
}
