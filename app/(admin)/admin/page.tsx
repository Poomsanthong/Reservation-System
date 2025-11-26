import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/AdminDashbaordPage/DashBoard";
export default async function AdminPage() {
  const supabase = await supabaseServer();
  const { data: bookings, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: true });

  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;
  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - diffToMonday);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
  startOfLastWeek.setHours(0, 0, 0, 0);

  const { count: totalBookings } = await supabase
    .from("reservations")
    .select("*", { count: "exact" });

  const { count: prevBookings } = await supabase
    .from("reservations")
    .select("*", { count: "exact" })
    .gte("created_at", startOfLastWeek)
    .lt("created_at", startOfThisWeek);

  const { data: guestsData } = await supabase
    .from("reservations")
    .select("partySize");

  const totalGuests =
    guestsData?.reduce((sum, row) => sum + (row.partySize || 0), 0) ?? 0;

  return (
    <AdminDashboardClient
      bookings={bookings || []}
      totalBookings={totalBookings || null}
      totalGuests={totalGuests || null}
    />
  );
}
