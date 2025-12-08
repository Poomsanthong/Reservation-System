"use server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getBookings(supabase: SupabaseClient) {
  // Fetch all bookings ordered by creation date
  const { data: bookingsData } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: true });
  return bookingsData;
}
