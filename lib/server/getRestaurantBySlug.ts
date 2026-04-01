import { supabaseServer } from "@/lib/server/supabaseServer";
import { headers } from "next/headers";

export async function getRestaurantBySlug() {
  // Get the tenant slug from the request headers
  const headerStore = await headers();
  const tenantSlug = headerStore.get("x-tenant-slug");

  if (!tenantSlug) {
    return null;
  }

  // Fetch the restaurant from the database using the tenant slug
  const supabase = await supabaseServer();
  let query = supabase.from("restaurants").select("id, name, slug, logo_url");

  if (tenantSlug) {
    query = query.eq("slug", tenantSlug);
  }

  const { data: restaurant, error } = await query.maybeSingle();

  if (error) {
    throw error;
  }

  return restaurant ?? null;
}
