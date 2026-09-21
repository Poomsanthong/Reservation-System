"use server";

import { supabaseServer } from "@/lib/server/supabaseServer";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

import type {
  RestaurantSettings,
  UpdateRestaurantSettingsInput,
} from "@/features/settings/types";
// --- Load Settings ---
export async function loadSettings() {
  const supabase = await supabaseServer();
  const restaurant = await getCurrentUserRestaurant();

  const { data, error } = await supabase
    .from("restaurant_settings")
    .select("*")
    .eq("restaurant_id", restaurant.restaurant?.id)
    .single();

  if (error) {
    console.error("LOAD SETTINGS ERROR:", restaurant.restaurant?.id, error);
    return null;
  }
  return data as RestaurantSettings;
}

// --- Update Settings ---
export async function updateSettings(payload: UpdateRestaurantSettingsInput) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("restaurant_settings")
    .update(payload)
    .eq("id", payload.id)
    .select("*")
    .single();

  if (error) throw error;
  return data as RestaurantSettings;
}
