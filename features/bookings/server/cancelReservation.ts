import "server-only";
import type { Reservation } from "@/features/bookings/types";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function cancelReservation(
  displayId: Reservation["display_id"],
  status: Reservation["status"] = "cancelled",
) {
  console.log("Cancelling reservation:", displayId);

  // 1. Resolve the current restaurant
  const headerStore = await headers();
  const tenantSlug = headerStore.get("x-tenant-slug");

  if (!tenantSlug) {
    throw new Error("Missing restaurant tenant");
  }

  // 2. Find the restaurant using the admin client
  const { data: restaurant, error: restaurantError } = await supabaseAdmin
    .from("restaurants")
    .select("id, slug")
    .eq("slug", tenantSlug)
    .maybeSingle();

  if (restaurantError) {
    throw new Error(`Failed to find restaurant: ${restaurantError.message}`);
  }

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // 3. Find the reservation within this restaurant
  const { data: reservation, error: findError } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("display_id", displayId.trim())
    .eq("restaurant_id", restaurant.id)
    .maybeSingle();

  if (findError) {
    throw new Error(`Failed to find reservation: ${findError.message}`);
  }

  if (!reservation) {
    throw new Error(`Reservation ${displayId} not found in this restaurant`);
  }

  // 4. Check whether it is already cancelled
  if (reservation.status === "cancelled") {
    throw new Error(
      `Reservation ${reservation.display_id} is already cancelled`,
    );
  }

  // 5. Update only this restaurant's reservation
  const { data: updatedReservation, error: updateError } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", reservation.id)
    .eq("restaurant_id", restaurant.id)
    .neq("status", "cancelled")
    .select("*")
    .maybeSingle();

  if (updateError) {
    throw new Error(`Failed to cancel reservation: ${updateError.message}`);
  }

  if (!updatedReservation) {
    throw new Error(`Reservation ${displayId} was not updated`);
  }

  return updatedReservation;
}
