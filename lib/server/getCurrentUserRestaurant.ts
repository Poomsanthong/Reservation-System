import { supabaseServer } from "@/lib/server/supabaseServer";

type RestaurantSummary = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
};

export async function getCurrentUserRestaurant(slug?: string) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, restaurant: null };
  }

  let query = supabase
    .from("restaurants")
    .select("id, name, slug, logo_url")
    .eq("owner_id", user.id);

  if (slug) {
    query = query.eq("slug", slug);
  } else {
    query = query.limit(1);
  }

  const { data: restaurant } = await query.maybeSingle<RestaurantSummary>();

  return { supabase, user, restaurant: restaurant ?? null };
}
