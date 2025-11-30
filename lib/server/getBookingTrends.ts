"use server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getBookingTrends(supabase: SupabaseClient) {
  // last 6 months
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 5);
  fromDate.setDate(1);

  const { data, error } = await supabase
    .from("reservations")
    .select("created_at")
    .gte("created_at", fromDate.toISOString());

  if (error) throw error;

  // Prepare 6 buckets (Jan → Jun)
  const months = Array.from({ length: 6 }).map((_, idx) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - idx));

    return {
      key: `${date.getFullYear()}-${date.getMonth() + 1}`,
      month: date.toLocaleString("en-US", { month: "short" }),
      bookings: 0,
    };
  });

  data.forEach((row) => {
    const date = new Date(row.created_at);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    const bucket = months.find((m) => m.key === key);
    if (bucket) {
      bucket.bookings++;
    }
  });

  return months;
}
