"use server";
import { supabaseServer } from "@/lib/server/supabaseServer";
import AdminDashboard from "@/components/AdminDashbaordPage/DashBoard";
import { getStats } from "@/lib/server/stats";
import { get } from "http";
import { getBookings } from "@/lib/server/getBooking";
export default async function AdminPage() {
  const supabase = await supabaseServer();

  const stats = await getStats(supabase);
  const bookings = await getBookings(supabase);
  return (
    <AdminDashboard
      totalBookings={stats.totalBookings ?? 0}
      totalGuests={stats.totalGuests ?? 0}
      previousTotalBookings={stats.previousTotalBookings ?? 0}
      previousTotalGuests={stats.previousTotalGuests ?? 0}
      bookings={bookings ?? []}
    />
  );
}
