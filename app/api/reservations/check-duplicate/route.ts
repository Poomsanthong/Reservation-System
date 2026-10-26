import { getRestaurantBySlug } from "@/features/restaurants/server/getRestaurantBySlug";
import { duplicateCheckSchema } from "@/shared/api/schemas";
import { checkDuplicate } from "@/features/bookings/server/checkDuplicate";
import { fail, success } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { date, time, name } = duplicateCheckSchema.parse(await req.json());

    const restaurant = await getRestaurantBySlug();

    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }

    const exists = await checkDuplicate({
      date,
      time,
      name,
      restaurantId: restaurant.id,
    });

    return success({
      exists: !!exists,
      BookingId: exists?.display_id || null,
    });
  } catch (error) {
    return fail(error, 500);
  }
}
