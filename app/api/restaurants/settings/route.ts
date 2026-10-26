import {
  loadSettings,
  updateSettings,
} from "@/features/restaurants/server/settings";
import { fail, success } from "@/lib/utils";
import { updateRestaurantSettingsSchema } from "@/shared/api/schemas";

export async function GET() {
  try {
    return success(await loadSettings());
  } catch (error) {
    console.error("Error loading restaurant settings:", error);
    return fail(error, 500);
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = updateRestaurantSettingsSchema.parse(await req.json());
    return success(await updateSettings(payload));
  } catch (error) {
    console.error("Error updating restaurant settings:", error);
    return fail(error, 500);
  }
}
