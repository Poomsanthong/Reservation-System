import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/server/supabaseServer";

export default async function AdminIndexPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("slug")
    .eq("owner_id", user.id)
    .single();

  if (error || !restaurant?.slug) {
    redirect("/login");
  }

  redirect(`/admin/${restaurant.slug}`);
}
