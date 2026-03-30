// lib/server/stats.ts
import { SupabaseClient } from "@supabase/supabase-js";

export async function getStats(supabase: SupabaseClient, restaurantId: string) {
  // Total bookings
  const { count: totalBookings } = await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .eq("restaurant_id", restaurantId);

  // Total guests
  const { data: guestsData } = await supabase
    .from("reservations")
    .select("partysize, created_at")
    .eq("restaurant_id", restaurantId);
  const totalGuests =
    guestsData?.reduce((sum, r) => sum + (r.partysize || 0), 0) ?? 0;

  // Previous week bookings for trend
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;
  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - diffToMonday);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

  const { count: previousTotalBookings } = await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .gte("created_at", startOfLastWeek)
    .lt("created_at", startOfThisWeek);

  const previousTotalGuests =
    guestsData
      ?.filter((r) => {
        const createdAt = new Date(r.created_at);
        return createdAt >= startOfLastWeek && createdAt < startOfThisWeek;
      })
      .reduce((sum, r) => sum + (r.partysize || 0), 0) ?? 0;

  return {
    totalBookings,
    totalGuests,
    previousTotalBookings,
    previousTotalGuests,
  };
}
