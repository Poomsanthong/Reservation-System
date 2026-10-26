"use client";

import { createClientInstance } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    await createClientInstance().auth.signOut();

    window.location.replace("/login");
  }
}
