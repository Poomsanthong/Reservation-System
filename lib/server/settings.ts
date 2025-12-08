"use server";

import { supabaseServer } from "@/lib/server/supabaseServer";

// --- Load Settings ---
export async function loadSettings() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("restaurant_settings")
    .select("*")
    .single();

  if (error) return null;
  return data;
}

// --- Update Settings ---
export async function updateSettings(payload: Partial<any>) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("restaurant_settings")
    .update(payload)
    .eq("id", payload.id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
