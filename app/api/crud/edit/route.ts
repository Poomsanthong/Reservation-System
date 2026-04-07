import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { success, fail, validateTable } from "@/lib/utils";
import { crudEditSchema } from "@/shared/api/schemas";

export async function PATCH(req: Request) {
  try {
    const { table, id, data } = crudEditSchema.parse(await req.json());
    validateTable(table);

    const supabase = await supabaseServer();
    let query = supabase.from(table).update(data).eq("id", id);

    if (table === "reservations" || table === "email_templates") {
      const restaurant = await getRestaurantBySlug();
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      query = query.eq("restaurant_id", restaurant.id);
    }

    const { data: updated, error } = await query.select();

    if (error) throw new Error(error.message);
    return success(updated);
  } catch (error) {
    return fail(error);
  }
}
