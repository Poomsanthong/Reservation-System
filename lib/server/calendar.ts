"use server";

import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function addBlackoutDate(
  date: string,
  reason: string = "",
  slug: string,
) {
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    throw new Error("Valid restaurant slug is required at addBlackoutDate");
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("blackout_dates")
    .insert({ date, reason, restaurant_id: restaurant.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBlackoutDates(slug: string) {
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    throw new Error("Valid restaurant slug is required at getBlackoutDates");
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("blackout_dates")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function unblockDate(date: string, slug: string) {
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    throw new Error("Valid restaurant slug is required at unblockDate");
  }

  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("blackout_dates")
    .delete()
    .eq("date", date)
    .eq("restaurant_id", restaurant.id);

  if (error) throw error;

  return { success: true };
}
