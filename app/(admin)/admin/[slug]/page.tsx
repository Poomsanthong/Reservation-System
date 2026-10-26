import AdminDashboard from "@/features/dashboard/components/AdminDashbaordPage/DashBoard";
import { getStats } from "@/features/dashboard/server/stats";
import { getBookings } from "@/features/bookings/server/getBooking";
import { redirect } from "next/navigation";
import { getBookingTrends } from "@/features/dashboard/server/getBookingTrends";
import { getTimeDistribution } from "@/features/dashboard/server/getTimeDistribution";
import { getRecentActivity } from "@/features/dashboard/server/getRecentActivity";
import { getRestaurantSettings } from "@/features/restaurants/server/getRestaurantSettings";
import { getCurrentUserRestaurant } from "@/features/restaurants/server/getCurrentUserRestaurant";
export default async function AdminPage() {
  const { supabase, user, restaurant } = await getCurrentUserRestaurant();

  if (!user) {
    redirect("/login");
  }

  if (!restaurant) {
    redirect("/login");
  }

  const stats = await getStats(supabase, restaurant.id);
  const bookings = await getBookings(restaurant.id);
  const bookingTrends = await getBookingTrends(supabase, restaurant.id);
  const timeDistribution = await getTimeDistribution(supabase, restaurant.id);
  const recentActivity = await getRecentActivity(supabase, restaurant.id);
  const restaurantSettings = await getRestaurantSettings(
    supabase,
    restaurant.id,
  );

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
      restaurantSettings={restaurantSettings ?? null}
    />
  );
}
