import { getOpeningData } from "@/features/restaurants/server/getRestaurantSettings";
import { fail, success } from "@/lib/utils";

export async function GET() {
  try {
    return success(await getOpeningData());
  } catch (error) {
    console.error("Error loading restaurant opening hours:", error);
    return fail(error, 500);
  }
}
