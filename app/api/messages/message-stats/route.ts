import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { fail, success } from "@/lib/utils";
import type {
  MessageStatsBreakdown,
  MessageType,
} from "@/features/messages/types";

async function getMessageStats(
  type: MessageType,
  restaurantId?: string,
): Promise<MessageStatsBreakdown> {
  const supabase = await supabaseServer();

  let query = supabase
    .from("messages")
    .select("delivered, opened")
    .eq("type", type);

  if (restaurantId) {
    query = query.eq("restaurant_id", restaurantId);
  }

  const { data, error } = await query;

  if (error) throw error;

  const total = data.length;
  const delivered = data.filter((m) => m.delivered).length;
  const opened = data.filter((m) => m.opened).length;

  return {
    total,
    delivered,
    opened,
    deliveredPercentage: total ? Math.round((delivered / total) * 100) : 0,
    openedPercentage: total ? Math.round((opened / total) * 100) : 0,
  };
}

export async function GET(req: Request) {
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    return fail(new Error("Restaurant not found"), 404);
  }

  try {
    const confirmations = await getMessageStats("confirmation", restaurant.id);
    const reminders = await getMessageStats("reminder", restaurant.id);

    return success({
      confirmations,
      reminders,
    });
  } catch (error) {
    return fail(error, 500);
  }
}
