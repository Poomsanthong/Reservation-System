import { NextResponse } from "next/server";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { duplicateCheckSchema } from "@/shared/api/schemas";
import { fail, success } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { date, time, name } = duplicateCheckSchema.parse(await req.json());

    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }

    const supabase = await supabaseServer();
    const query = supabase
      .from("reservations")
      .select("*")
      .eq("reservation_date", date)
      .eq("reservation_time", time)
      .ilike("name", name)
      .eq("restaurant_id", restaurant.id);

    const { data, error } = await query; // case-insensitive match
    if (error) {
      return fail(new Error(error.message), 500);
    }

    return success({
      exists: data.length > 0,
    });
  } catch (error) {
    return fail(error, 500);
  }
}
