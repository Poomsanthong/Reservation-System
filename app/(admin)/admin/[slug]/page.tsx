import { supabaseServer } from "@/lib/server/supabaseServer";
import AdminDashboard from "@/components/AdminDashbaordPage/DashBoard";
import { getStats } from "@/lib/server/stats";
import { getBookings } from "@/lib/server/getBooking";
import { redirect } from "next/navigation";
import { getBookingTrends } from "@/lib/server/getBookingTrends";
import { getTimeDistribution } from "@/lib/server/getTimeDistribution";
import { getRecentActivity } from "@/lib/server/getRecentActivity";

export default async function AdminPage({
  params,
}: {
  params: { slug: string };
}) {
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
  //  params is a promise, unwrap it
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .eq("owner_id", user.id)
    .single();

  if (error || !restaurant) {
    redirect("/login");
  }

  // Fetch statistics and bookings from the server
  const stats = await getStats(supabase, restaurant?.id);
  const bookings = await getBookings(supabase, restaurant?.id);
  const bookingTrends = await getBookingTrends(supabase, restaurant?.id);
  const timeDistribution = await getTimeDistribution(supabase, restaurant?.id);
  const recentActivity = await getRecentActivity(supabase, restaurant?.id);

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
      restaurantId={restaurant.id}
    />
  );
}
