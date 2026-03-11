import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { inngest } from "@/lib/inngest/inngest"; // 👈 add this

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
      try {
        // trigger the reminder function to schedule a reminder email
        const bookingTime = new Date(
          data.reservation_date + "T" + data.reservation_time,
        );
        const reminderTime = new Date(bookingTime);
        reminderTime.setHours(reminderTime.getHours() - 5); // Set reminder for 5 hours before
        console.log(
          "created time " +
            bookingTime.toISOString() +
            " reminder time " +
            reminderTime.toISOString(),
        );
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
            reminderTime: reminderTime.toISOString(),
          },
        });
      } catch (err) {
        console.error("reminder failed:", err);
      }

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
    }

    return success(created);
  } catch (error: any) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
