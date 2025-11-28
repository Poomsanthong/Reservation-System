import React from "react";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check (optional if middleware/proxy already protects /admin)
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen text-gray-400">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
