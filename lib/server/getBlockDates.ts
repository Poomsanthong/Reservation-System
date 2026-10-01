"use server";

import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function addBlackoutDate(date: string, reason: string = "") {
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    throw new Error("Tenant context is required at addBlackoutDate");
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

export async function getBlackoutDates() {
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    throw new Error("Tenant context is required at getBlackoutDates");
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

export async function unblockDate(date: string) {
  const restaurant = await getRestaurantBySlug();
  if (!restaurant) {
    throw new Error("Tenant context is required at unblockDate");
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
