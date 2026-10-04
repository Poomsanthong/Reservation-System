"use server";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function getBookings(restaurantId: string) {
  // Fetch all bookings ordered by creation date
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  const bookings = data.map((booking) => ({
    ...booking,
    display_id: `BK-${booking.booking_number.toString().padStart(4, "0")}`,
  }));

  return bookings;
}

export async function getDailyBookings(date: string, restaurantId: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("reservation_date", date)
    .eq("status", "confirmed"); // Only count confirmed bookings

  if (error) throw error;

  return data;
}
