import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { success, fail, validateTable } from "@/lib/utils";
import { crudGetQuerySchema } from "@/shared/api/schemas";
import { getBookings } from "@/lib/server/getBooking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { table } = crudGetQuerySchema.parse({
      table: searchParams.get("table"),
    });

    validateTable(table);
    const supabase = await supabaseServer();
    let query = supabase.from(table).select("*");

    if (table === "reservations") {
      const restaurant = await getRestaurantBySlug();
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      const bookings = await getBookings(restaurant.id);

      return success(bookings);
    }

    if (table === "email_templates") {
      const restaurant = await getRestaurantBySlug();
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      query = query.eq("restaurant_id", restaurant.id);
      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return success(data);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return success(data);
  } catch (error) {
    return fail(error);
  }
}
