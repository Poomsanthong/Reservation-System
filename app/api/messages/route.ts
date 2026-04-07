import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { fail, success } from "@/lib/utils";

export async function GET() {
  const supabase = await supabaseServer();
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    return fail(new Error("Restaurant not found"), 404);
  }
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      type,
      created_at,
      reminder_state,
      booking_id (
        name,
        email
        )
        `,
    )
    .eq("restaurant_id", restaurant.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return fail(error, 500);
  }

  return success(data);
}
