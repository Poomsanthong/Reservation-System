import "server-only";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/features/restaurants/server/getRestaurantBySlug";
import { inngest } from "@/lib/inngest/inngest";
import type { Reservation } from "@/features/bookings/types";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { checkDuplicate } from "@/features/bookings/server/checkDuplicate";
type ReservationRecord = Pick<
  Reservation,
  | "email"
  | "id"
  | "display_id"
  | "name"
  | "partysize"
  | "reservation_date"
  | "reservation_time"
  | "restaurant_id"
  | "restaurant_name"
  | "note"
  | "phone"
>;

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

// Fire the background confirmation workflow after a reservation is saved.
async function sendReservationCreatedEvent(created: ReservationRecord) {
  await inngest.send({
    name: "reservation.created",
    data: {
      email: created.email,
      booking_id: created.id,
      display_id: created.display_id,
      name: created.name,
      restaurant_name: created.restaurant_name,
      reservation_date: created.reservation_date,
      reservation_time: created.reservation_time,
      partysize: created.partysize,
      restaurant_id: created.restaurant_id,
    },
  });
}
// Reminder messages are scheduled relative to the reservation time.

function getReminderTime(created: ReservationRecord) {
  const bookingTime = new Date(
    `${created.reservation_date}T${created.reservation_time}`,
  );

  const reminderTime = new Date(bookingTime);
  const now = new Date();

  reminderTime.setHours(reminderTime.getHours() - 6);

  if (reminderTime <= now) {
    reminderTime.setMinutes(now.getMinutes() + 5, 0, 0);
  }

  return reminderTime;
}

async function scheduleReservationReminder(
  supabase: Supabase,
  created: ReservationRecord,
) {
  try {
    const reminderTime = getReminderTime(created);

    await supabase.from("messages").insert({
      booking_id: created.id,
      type: "reminder",
      reminder_state: "scheduled",
      delivered: false,
      restaurant_id: created.restaurant_id,
    });

    await inngest.send({
      name: "reservation/reminder.scheduled",
      data: {
        booking_id: created.id,
        display_id: created.display_id,
        email: created.email,
        name: created.name,
        restaurant_name: created.restaurant_name,
        reservation_date: created.reservation_date,
        reservation_time: created.reservation_time,
        partysize: created.partysize,
        restaurant_id: created.restaurant_id,
        reminderTime: reminderTime.toISOString(),
      },
    });
  } catch (err) {
    console.error("reminder failed:", err);
  }
}

export async function createReservation(data: {
  email: string;
  name: string;
  phone: string;
  note: string;
  partysize: number;
  reservation_date: string;
  reservation_time: string;
}) {
  const restaurant = await getRestaurantBySlug();

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const duplicate = await checkDuplicate({
    date: data.reservation_date,
    time: data.reservation_time,
    name: data.name,
    restaurantId: restaurant.id,
  });

  if (duplicate) {
    throw new Error(
      `Duplicate reservation found for ${duplicate.display_id} at ${data.reservation_time} on ${data.reservation_date}`,
    );
  }

  const supabase = supabaseAdmin;
  const insertData = {
    ...data,
    restaurant_id: restaurant.id,
  };

  const { data: created, error } = await supabase
    .from("reservations")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const reservation = {
    ...created,
    restaurant_name: restaurant.name,
  } as ReservationRecord;

  await sendReservationCreatedEvent(reservation);
  await scheduleReservationReminder(supabase, reservation);

  return reservation;
}
