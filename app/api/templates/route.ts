import { getTemplates, updateTemplate } from "@/lib/server/template";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { fail, success } from "@/lib/utils";
import { updateTemplateSchema } from "@/shared/api/schemas";

export async function GET() {
  try {
    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }

    const templates = await getTemplates(restaurant.id);

    return success(templates);
  } catch (err) {
    console.error(err);
    return fail(err, 500);
  }
}

export async function POST(req: Request) {
  try {
    const template = updateTemplateSchema.parse(await req.json());
    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return fail(new Error("Restaurant not found"), 404);
    }
    await updateTemplate(
      template.id,
      template.subject,
      template.html,
      restaurant.id,
    );
    return success({ success: true as const });
  } catch (err) {
    console.error(err);
    return fail(err, 500);
  }
}
