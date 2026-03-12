import { Resend } from "resend";
import { inngest } from "../inngest";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminder = inngest.createFunction(
  { id: "send-reminder-email" },
  { event: "reservation/reminder.scheduled" },

  async ({ event, step }) => {
    const {
      email,
      booking_id,
      name,
      reservation_date,
      reservation_time,
      partySize,
      reminderTime,
    } = event.data;

    console.log("Reminder Time is " + reminderTime);
    // await step.sleep("30s", 3000); // Initial sleep to ensure the database record is created , Test with 30s, then change to sleepUntil with the actual reminder time
    await step.sleepUntil("waiting for reminder time", new Date(reminderTime));
    try {
      const result = await resend.emails.send({
        from: "NoReply@bookflow.poomsan.site",
        to: email,
        subject: "Reminder: Your Reservation is Approaching",
        html: `
          <p>Hi ${name},</p>
          <p>This is a reminder that your reservation is approaching on ${reservation_date} at ${reservation_time}.</p>
          <p>Party Size: ${partySize}</p>   
          <p>Booking ID: ${booking_id}</p>
        `,
      });

      console.log("Reminder email sent result:", booking_id);

      await supabaseAdmin
        .from("messages")
        .update({
          reminder_state: "delivered",
          delivered: true,
        })
        .eq("booking_id", booking_id)
        .eq("type", "reminder");
    } catch (error) {
      await supabaseAdmin
        .from("messages")
        .update({ reminder_state: "failed" })
        .eq("booking_id", booking_id)
        .eq("type", "reminder");
      console.error("Error sending reminder email:", error);
    }
  },
);
