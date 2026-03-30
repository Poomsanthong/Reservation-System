import { supabaseServer } from "@/lib/server/supabaseServer";
import { inngest } from "@/lib/inngest/inngest";
import { success, fail, validateTable, requireFields } from "@/lib/utils";

type ReservationRecord = {
  email: string;
  id: string;
  name: string;
  partysize: number;
  reservation_date: string;
  reservation_time: string;
  restaurant_id: string;
};

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

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
        reminderTime: reminderTime.toISOString(),
      },
    });
  } catch (err) {
    console.error("reminder failed:", err);
  }
}

export async function POST(req: Request) {
  try {
    const { table, data } = await req.json();
    console.log("Create Request Data:", { table, data });

    requireFields({ table, data }, ["table", "data"]);
    validateTable(table);

    const supabase = await supabaseServer();
    const { data: created, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (table === "reservations") {
      const reservation = created as ReservationRecord;
      await sendReservationCreatedEvent(reservation);
      await scheduleReservationReminder(supabase, reservation);
    }

    return success(created);
  } catch (error: any) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
