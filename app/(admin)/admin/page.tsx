"use server";
import { supabaseServer } from "@/lib/server/supabaseServer";
import AdminDashboard from "@/components/AdminDashbaordPage/DashBoard";
import { getStats } from "@/lib/server/stats";
import { getBookings } from "@/lib/server/getBooking";
import { redirect } from "next/navigation";
import { getBookingTrends } from "@/lib/server/getBookingTrends";
import { getTimeDistribution } from "@/lib/server/getTimeDistribution";
export default async function AdminPage() {
  // Initialize Supabase client for server-side operations
  const supabase = await supabaseServer();

  // Server-side auth check (optional if middleware/proxy already protects /admin)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // If no user, redirect to login
  if (!user) {
    redirect("/login");
  }
  // Fetch statistics and bookings from the server
  const stats = await getStats(supabase);
  const bookings = await getBookings(supabase);
  const bookingTrends = await getBookingTrends(supabase);
  const timeDistribution = await getTimeDistribution(supabase);
  console.log("Time Distribution:", timeDistribution);
  return (
    <AdminDashboard
      userEmail={user.email ?? null}
      totalBookings={stats.totalBookings ?? 0}
      totalGuests={stats.totalGuests ?? 0}
      previousTotalBookings={stats.previousTotalBookings ?? 0}
      previousTotalGuests={stats.previousTotalGuests ?? 0}
      bookings={bookings ?? []}
      bookingTrends={bookingTrends ?? []}
      timeDistribution={timeDistribution ?? []}
    />
  );
}
