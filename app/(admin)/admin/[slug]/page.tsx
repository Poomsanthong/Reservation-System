import AdminDashboard from "@/components/AdminDashbaordPage/DashBoard";
import { getStats } from "@/lib/server/stats";
import { getBookings } from "@/lib/server/getBooking";
import { redirect } from "next/navigation";
import { getBookingTrends } from "@/lib/server/getBookingTrends";
import { getTimeDistribution } from "@/lib/server/getTimeDistribution";
import { getRecentActivity } from "@/lib/server/getRecentActivity";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

export default async function AdminPage() {
  const { supabase, user, restaurant } = await getCurrentUserRestaurant();

  if (!user) {
    redirect("/login");
  }

  if (!restaurant) {
    redirect("/login");
  }

  const stats = await getStats(supabase, restaurant.id);
  const bookings = await getBookings(supabase, restaurant.id);
  const bookingTrends = await getBookingTrends(supabase, restaurant.id);
  const timeDistribution = await getTimeDistribution(supabase, restaurant.id);
  const recentActivity = await getRecentActivity(supabase, restaurant.id);

  return (
    <AdminDashboard
      userEmail={user.email ?? null}
      organizationName={restaurant.name}
      totalBookings={stats.totalBookings ?? 0}
      totalGuests={stats.totalGuests ?? 0}
      previousTotalBookings={stats.previousTotalBookings ?? 0}
      previousTotalGuests={stats.previousTotalGuests ?? 0}
      bookings={bookings ?? []}
      bookingTrends={bookingTrends ?? []}
      timeDistribution={timeDistribution ?? []}
      recentActivity={recentActivity ?? []}
    />
  );
}
