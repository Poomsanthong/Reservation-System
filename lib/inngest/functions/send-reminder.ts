import { inngest } from "../inngest";
import { NonRetriableError } from "inngest"; // NON Retry error
import { resend, FROM_EMAIL } from "@/lib/email/client";
import { loadTemplate, buildValues, render } from "@/lib/email/templates";
import { recordMessage } from "@/lib/email/messages";

export const sendReminder = inngest.createFunction(
  {
    id: "send-reminder-email",
    triggers: { event: "reservation/reminder.scheduled" },

    onFailure: async ({ event }) => {
      const d = event.data.event.data;

      await recordMessage(d.booking_id, d.restaurant_id, "reminder", false);
    },
  },

  async ({ event, step }) => {
    const { email, booking_id, restaurant_id, reminderTime } = event.data;

    if (!email) {
      throw new NonRetriableError("Reminder event is missing customer email");
    }

    // Load the reminder template
    const template = await step.run("load-template", () =>
      loadTemplate(restaurant_id, "reminder"),
    );

    //  Wait until the scheduled reminder time
    await step.sleepUntil("wait-for-reminder-time", new Date(reminderTime));

    // Build the email using the shared template helpers
    await step.run("send-email", async () => {
      const values = buildValues(event.data);

      const { error } = await resend.emails.send(
        {
          from: FROM_EMAIL,
          to: email,
          subject: render(template.subject, values, {
            escape: false,
          }),
          html: render(template.html ?? "", values, {
            escape: true,
          }),
        },
        {
          idempotencyKey: `reminder-${restaurant_id}-${booking_id}-${reminderTime}`,
        },
      );

      if (error) {
        throw new Error(`Reminder email failed: ${error.message}`);
      }
    });

    // Record successful delivery
    await step.run("record-message", () =>
      recordMessage(booking_id, restaurant_id, "reminder", true),
    );

    return { success: true };
  },
);
