import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function DELETE(req: Request) {
  try {
    const { table, id } = await req.json();

    requireFields({ table, id }, ["table", "id"]);
    validateTable(table);

    const supabase = await supabaseServer();
    let query = supabase.from(table).delete().eq("id", id);

    if (table === "reservations" || table === "email_templates") {
      const restaurant = await getRestaurantBySlug();
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      query = query.eq("restaurant_id", restaurant.id);
    }

    const { error } = await query;

    if (error) throw new Error(error.message);

    return success({ deleted: id });
  } catch (error) {
    return fail(error);
  }
}
