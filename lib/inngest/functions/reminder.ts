import { inngest } from "../inngest";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const reminderFunction = inngest.createFunction(
  { id: "booking-reminder" },
  { event: "reservation/reminder.scheduled" },

  async ({ event, step }) => {
    const { booking_id, reminderTime } = event.data;

    console.log(
      "Reminder Function Triggered for booking_id:",
      booking_id,
      "at",
      reminderTime,
    );

    await step.sleepUntil("waiting for reminder time", new Date(reminderTime));

    await step.run("send reminder email", async () => {
      // send email here

      await supabaseAdmin
        .from("messages")
        .update({
          reminder_state: "sent",
          delivered: true,
        })
        .eq("booking_id", booking_id)
        .eq("type", "reminder");
    });

    console.log("Reminder email sent for booking_id:", booking_id);
  },
);
