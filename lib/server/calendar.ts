"use server";

import { supabaseServer } from "@/lib/server/supabaseServer";

export async function addBlackoutDate(date: string, reason: string = "") {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("blackout_dates")
    .insert({ date, reason })
    .select();

  if (error) throw error;
  return data;
}

export async function getBlackoutDates() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.from("blackout_dates").select("*");

  if (error) throw error;
  return data;
}

export async function unblockDate(date: string) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("blackout_dates")
    .delete()
    .eq("date", date);

  if (error) throw error;

  return { success: true };
}
