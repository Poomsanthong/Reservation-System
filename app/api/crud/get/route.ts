import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { success, fail, validateTable } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");
    const slug = searchParams.get("slug") || undefined;

    validateTable(table);
    const supabase = await supabaseServer();
    let query = supabase.from(table!).select("*");

    if (table === "reservations" && slug) {
      const restaurant = await getRestaurantBySlug(slug);
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      query = query.eq("restaurant_id", restaurant.id);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return success(data);
  } catch (error) {
    return fail(error);
  }
}
