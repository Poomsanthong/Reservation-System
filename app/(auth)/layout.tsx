import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-gray-400 ">
      <div className="container mx-auto ">{children}</div>
    </div>
  );
}
