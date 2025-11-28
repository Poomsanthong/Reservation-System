import React from "react";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-gray-400">
      <div className="container mx-auto overflow-auto">{children}</div>
    </div>
  );
}
