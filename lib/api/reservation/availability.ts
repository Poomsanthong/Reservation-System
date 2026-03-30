import { createClientInstance } from "@/lib/supabaseClient";

const MAX_TABLES = 8;
export async function checkAvailability(
  date: string,
  time: string,
  restaurantId?: string,
) {
  const supabase = createClientInstance();
  let query = supabase
    .from("reservations")
    .select("id")
    .eq("reservation_date", date)
    .eq("reservation_time", time)
    .eq("status", "confirmed");

  if (restaurantId) {
    query = query.eq("restaurant_id", restaurantId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error checking availability:", error);
    throw new Error("Failed to check availability");
  }

  const bookedCount = data.length;
  const remainingTables = MAX_TABLES - bookedCount;

  return {
    available: bookedCount < MAX_TABLES,
    remainingTables: remainingTables < 0 ? 0 : remainingTables,
    bookedCount,
  };
}
