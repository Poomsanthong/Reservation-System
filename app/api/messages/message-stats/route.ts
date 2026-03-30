import { supabaseServer } from "@/lib/server/supabaseServer";
import { NextResponse } from "next/server";

async function getMessageStats(
  type: "confirmation" | "reminder",
  restaurantId?: string,
) {
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
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId") || undefined;

  const confirmations = await getMessageStats("confirmation", restaurantId);
  const reminders = await getMessageStats("reminder", restaurantId);

  return NextResponse.json({
    confirmations,
    reminders,
  });
}
