import { createClientInstance } from "@/lib/supabaseClient";
import { error } from "console";

const MAX_TABLES = 8;
export async function checkAvailability(date: string, time: string) {
  const supabase = createClientInstance();
  const { data, error } = await supabase
    .from("reservations")
    .select("id")
    .eq("reservation_date", date)
    .eq("reservation_time", time)
    .eq("reservation_status", "confirmed");

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
