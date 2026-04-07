import { getSchedule } from "@/lib/server/getSchedule";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { success, fail } from "@/lib/utils";
import { availabilitySchema } from "@/shared/api/schemas";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const { date } = availabilitySchema.parse({
      date: searchParams.get("date"),
      time: "00:00:00",
    });
    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }
    const schedule = await getSchedule(date, restaurant.id);
    return success(schedule);
  } catch (err) {
    console.error("Error loading schedule:", err);
    return fail(err, 500);
  }
}
