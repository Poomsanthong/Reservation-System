"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function getBookings(
  supabase: SupabaseClient,
  restaurantId: string,
) {
  // Fetch all bookings ordered by creation date
  const { data: bookingsData } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: true });
  return bookingsData;
}

export async function getDailyBookings(date: string, restaurantId: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId) // Replace with actual restaurant ID
    .eq("reservation_date", date)
    .eq("status", "confirmed"); // Only count confirmed bookings

  if (error) throw error;

  return data;
}
