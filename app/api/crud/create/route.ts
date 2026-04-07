import { supabaseServer } from "@/lib/server/supabaseServer";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { inngest } from "@/lib/inngest/inngest";
import { success, fail, validateTable } from "@/lib/utils";
import type { Reservation } from "@/features/bookings/types";
import { crudCreateSchema } from "@/shared/api/schemas";

type ReservationRecord = Pick<
  Reservation,
  | "email"
  | "id"
  | "name"
  | "partysize"
  | "reservation_date"
  | "reservation_time"
  | "restaurant_id"
>;

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

// Fire the background confirmation workflow after a reservation is saved.
async function sendReservationCreatedEvent(created: ReservationRecord) {
  try {
    await inngest.send({
      name: "reservation.created",
      data: {
        email: created.email,
        booking_id: created.id,
        name: created.name,
        reservation_date: created.reservation_date,
        reservation_time: created.reservation_time,
        partysize: created.partysize,
        restaurant_id: created.restaurant_id,
      },
    });

    console.log("Inngest event 'reservation.created' sent with data:", created);
  } catch (err) {
    console.error("send email failed:", err);
  }
}

// Reminder messages are scheduled relative to the reservation time.
function getReminderTime(created: ReservationRecord) {
  const bookingTime = new Date(
    `${created.reservation_date}T${created.reservation_time}`,
  );
  const reminderTime = new Date(bookingTime);
  const now = new Date();

  reminderTime.setHours(reminderTime.getHours() - 6);

  // If the reminder time is in the past or within the next 6 hours, set it to 5 minutes from now
  if (reminderTime <= now) {
    reminderTime.setMinutes(now.getMinutes() + 5, 0, 0);
  }

  console.log("Scheduling reminder for:" + reminderTime.toISOString());
  console.log("Booking time:" + bookingTime.toISOString());

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
        email: created.email,
        name: created.name,
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

export async function POST(req: Request) {
  try {
    // Validate the request body up front before touching the database.
    const { table, data } = crudCreateSchema.parse(await req.json());
    validateTable(table);

    const supabase = await supabaseServer();
    let insertData = data;

    // Reservation rows always inherit the current restaurant on the server.
    if (table === "reservations") {
      const restaurant = await getRestaurantBySlug();
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      insertData = {
        ...data,
        restaurant_id: restaurant.id,
      };
    }

    const { data: created, error } = await supabase
      .from(table)
      .insert(insertData)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Only reservation inserts trigger follow-up messaging workflows.
    if (table === "reservations") {
      const reservation = created as ReservationRecord;
      await sendReservationCreatedEvent(reservation);
      await scheduleReservationReminder(supabase, reservation);
    }

    return success(created);
  } catch (error) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
