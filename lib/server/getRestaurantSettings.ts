"use server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getRestaurantSettings(
  supabase: SupabaseClient,
  restaurantId: string,
) {
  const { data: settings, error } = await supabase
    .from("restaurant_settings")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch restaurant settings:", error);
    throw new Error("Failed to fetch restaurant settings");
  }

  return settings;
}
