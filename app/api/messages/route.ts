import { NextResponse } from "next/server";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function GET(req: Request) {
  const supabase = await supabaseServer(); // Initialize Supabase on the server
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
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
  // console.log("Fetched recent messages from database:", data, error);
  return NextResponse.json(data);
}
