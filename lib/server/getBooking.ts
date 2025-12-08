"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function getBookings(supabase: SupabaseClient) {
  // Fetch all bookings ordered by creation date
  const { data: bookingsData } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: true });
  return bookingsData;
}

export async function getDailyBookings(date: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("reservation_date", date);

  if (error) throw error;

  return data;
}
