"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { tr } from "date-fns/locale";

export async function getBookings(supabase: SupabaseClient) {
  // Fetch all bookings ordered by creation date
  const { data: bookingsData } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: true });
  return bookingsData;
}
