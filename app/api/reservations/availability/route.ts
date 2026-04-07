import { checkAvailability } from "@/lib/api/reservation/availability";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { availabilitySchema } from "@/shared/api/schemas";
import { fail, success } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { date, time } = availabilitySchema.parse(await req.json());

    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }

    const result = await checkAvailability(date, time, restaurant.id);
    return success(result);
  } catch (error) {
    console.error("Error checking availability:", error);
    return fail(error, 500);
  }
}
