"use server";

import { SupabaseClient } from "@supabase/supabase-js";

export async function getRecentActivity(supabase: SupabaseClient) {
  // Fetch 10 newest bookings (confirmed/cancelled)
  const { data, error } = await supabase
    .from("reservations")
    .select("name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }

  // Map into the format your component expects
  return data.map((row) => ({
    type: "booking",
    guest: row.name,
    action:
      row.status === "confirmed"
        ? "New booking created"
        : row.status === "cancelled"
        ? "Booking cancelled"
        : "Updated booking",
    time: timeAgo(row.created_at),
    status: row.status,
  }));
}

// Helper: user-friendly time
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
