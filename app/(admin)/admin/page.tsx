import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/DashBoard";

export default async function AdminPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("AdminPage - user:", user);
  if (!user) redirect("/admin/login");
  const { data: bookings } = await supabase.from("reservations").select("*");

  return <AdminDashboardClient bookings={bookings || []} />;
}
