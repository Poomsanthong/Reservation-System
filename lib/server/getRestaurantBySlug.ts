import { supabaseServer } from "@/lib/server/supabaseServer";

export async function getRestaurantBySlug(slug?: string) {
  if (!slug) {
    return null;
  }

  const supabase = await supabaseServer();
  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("id, name, slug, logo_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }
  console.log("getRestaurantBySlug result:", restaurant);
  return restaurant ?? null;
}
