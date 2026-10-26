import "server-only";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { inngest } from "../inngest";
import { NonRetriableError } from "inngest"; // NON Retry error
import { resend, FROM_EMAIL } from "@/lib/email/client";
import { loadTemplate, buildValues, render } from "@/lib/email/templates";
import { recordMessage } from "@/lib/email/messages";

// ---------- Customer confirmation ----------
export const sendconfirmation = inngest.createFunction(
  {
    id: "send-confirmation-email",
    triggers: { event: "reservation.created" },
    onFailure: async ({ event }) => {
      const d = event.data.event.data;
      await recordMessage(d.booking_id, d.restaurant_id, "confirmation", false);
    },
  },

  async ({ event, step }) => {
    const { email, booking_id, restaurant_id } = event.data;
    if (!email) throw new NonRetriableError("Event is missing customer email");

    const template = await step.run("load-template", () =>
      loadTemplate(restaurant_id, "confirmation"),
    );

    await step.run("send-email", async () => {
      const values = buildValues(event.data);
      const { error } = await resend.emails.send(
        {
          from: FROM_EMAIL,
          to: email,
          subject: render(template.subject, values, { escape: false }),
          html: render(template.html ?? "", values, { escape: true }),
        },
        {
          idempotencyKey: `customer-confirmation-${restaurant_id}-${booking_id}`,
        },
      );
      if (error) throw new Error(`Customer email failed: ${error.message}`);
    });

    await step.run("record-message", () =>
      recordMessage(booking_id, restaurant_id, "confirmation", true),
    );
    return { success: true };
  },
);
// ---------- Restaurant notification ----------
export const sendRestaurantNotification = inngest.createFunction(
  {
    id: "send-restaurant-notification-email",
    triggers: { event: "reservation.created" },
    onFailure: async ({ event }) => {
      const d = event.data.event.data;
      await recordMessage(
        d.booking_id,
        d.restaurant_id,
        "restaurant_notification",
        false,
      );
    },
  },

  async ({ event, step }) => {
    const { booking_id, restaurant_id } = event.data;
    // get the restaurant email
    const notificationEmail = await step.run(
      "load-notification-email",
      async () => {
        const { data, error } = await supabaseAdmin
          .from("restaurants")
          .select("notification_email")
          .eq("id", restaurant_id)
          .maybeSingle();

        if (error) throw new Error(error.message);
        return data?.notification_email ?? null;
      },
    );
    if (!notificationEmail) {
      return { skipped: true, reason: "No notification email configured" };
    }

    const template = await step.run("load-template", () =>
      loadTemplate(restaurant_id, "restaurant_notification"),
    );

    await step.run("send-email", async () => {
      const values = buildValues(event.data);
      const { error } = await resend.emails.send(
        {
          from: FROM_EMAIL,
          to: "poom.santhong10@gmail.com",
          subject: render(template.subject, values, { escape: false }),
          html: render(template.html ?? "", values, { escape: true }),
        },
        {
          idempotencyKey: `restaurant-notification-${restaurant_id}-${booking_id}`,
        },
      );
      if (error) throw new Error(`Restaurant email failed: ${error.message}`);
    });
    await step.run("record-message", () =>
      recordMessage(booking_id, restaurant_id, "restaurant_notification", true),
    );
    return { success: true };
  },
);
