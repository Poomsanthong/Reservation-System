import { supabaseServer } from "@/lib/server/supabaseServer";
import { headers } from "next/headers";
type RestaurantSummary = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
};

export async function getCurrentUserRestaurant() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, restaurant: null };
  }
  const tenantSlug = (await headers()).get("x-tenant-slug"); // injected by middleware

  let query = supabase
    .from("restaurants")
    .select("id, name, slug, logo_url")
    .eq("owner_id", user.id);

  if (tenantSlug) {
    query = query.eq("slug", tenantSlug);
  } else {
    query = query.limit(1);
  }

  const { data: restaurant } = await query.maybeSingle<RestaurantSummary>();

  return { supabase, user, restaurant: restaurant ?? null };
}
