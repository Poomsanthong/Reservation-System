import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function checkDuplicate({
  date,
  time,
  name,
  restaurantId,
}: {
  date: string;
  time: string;
  name: string;
  restaurantId: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("id, display_id")
    .eq("reservation_date", date)
    .eq("reservation_time", time)
    .ilike("name", name)
    .eq("restaurant_id", restaurantId)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
