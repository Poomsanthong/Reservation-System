"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { NUMBER_TO_DAY } from "@/features/openingsHours/types";
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

export async function getOpeningData() {
  // Fetch all opening days and hours
  const restaurant = await getRestaurantBySlug();
  const supabase = await supabaseServer();

  const { data: openingData, error } = await supabase
    .from("opening_hours")
    .select("day_of_week , open_time , close_time , open ")
    .eq("restaurant_id", restaurant?.id)
    .order("day_of_week");

  if (error) {
    console.error("Failed to fetch restaurant open data:", error);
    throw new Error("Failed to fetch restaurant open data");
  }
  return openingData;
}
