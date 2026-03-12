import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { inngest } from "@/lib/inngest/inngest";
import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { table, data } = await req.json();
    console.log("Create Request Data:", { table, data });

    requireFields({ table, data }, ["table", "data"]);
    validateTable(table);

    const supabase = await supabaseServer(); // 👈 call the function
    const { data: created, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single(); //  add .single() to get the created record directly

    if (error) throw new Error(error.message);

    // Trigger  Inngest event after successful creation
    if (table === "reservations") {
      // Trigger the reservation.created event for other functions to listen to
      try {
        await inngest.send({
          name: "reservation.created",
          data: {
            email: created.email,
            booking_id: created.id,
            name: created.name,
            reservation_date: created.reservation_date,
            reservation_time: created.reservation_time,
            partySize: created.partySize,
          },
        });

        console.log(
          "Inngest event 'reservation.created' sent with data:",
          created,
        );
      } catch (err) {
        console.error("send email failed:", err);
      }

      try {
        // trigger the reminder function to schedule a reminder email
        const bookingTime = new Date(
          created.reservation_date + "T" + created.reservation_time,
        );

        const reminderTime = new Date(bookingTime);

        // TEST MODE:30 seconds from now ,
        // reminderTime.setSeconds(reminderTime.getSeconds() + 30);

        reminderTime.setHours(reminderTime.getHours() - 6); // Schedule reminder 6 hours before the booking time

        console.log("Scheduling reminder for:" + reminderTime.toISOString());
        console.log("Booking time:" + bookingTime.toISOString());

        await supabase.from("messages").insert({
          booking_id: created.id,
          type: "reminder",
          reminder_state: "scheduled",
          delivered: false,
        });

        await inngest.send({
          name: "reservation/reminder.scheduled",
          data: {
            booking_id: created.id,
            email: created.email,
            name: created.name,
            reservation_date: created.reservation_date,
            reservation_time: created.reservation_time,
            partySize: created.partySize,
            reminderTime: reminderTime.toISOString(),
          },
        });
      } catch (err) {
        console.error("reminder failed:", err);
      }
    }

    return success(created);
  } catch (error: any) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
