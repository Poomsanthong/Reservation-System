import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { inngest } from "../inngest";
import { Resend } from "resend";
import { MessageType } from "@/features/messages/types";
import { NonRetriableError, step } from "inngest"; // NON Retry error
import build from "next/dist/build";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "NoReply@bookflow.poomsan.site";
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);

function render(
  text: string,
  values: Record<string, string>,
  { escape }: { escape: boolean },
) {
  return text.replace(/{{\s*(\w+)\s*}}/g, (match, key) =>
    key in values ? (escape ? escapeHtml(values[key]) : values[key]) : match,
  );
}

// Load Template function
async function loadTemplate(restaurantId: string, type: MessageType) {
  const { data, error } = await supabaseAdmin
    .from("email_templates")
    .select("subject, html")
    .eq("type", type)
    .eq("restaurant_id", restaurantId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message); // transient: retry
  if (!data) {
    throw new NonRetriableError(
      `No "${type}" template for restaurant ${restaurantId}`,
    );
  }
  return data;
}

function buildValues(data: Record<string, unknown>): Record<string, string> {
  const convertToString = (value: unknown): string => String(value ?? "");

  return {
    name: convertToString(data.name),
    email: convertToString(data.email),
    restaurant_name: convertToString(data.restaurant_name),
    booking_id: convertToString(data.booking_id),
    display_id: convertToString(data.display_id),
    reservation_date: convertToString(data.reservation_date),
    reservation_time: convertToString(data.reservation_time),
    partysize: convertToString(data.partysize),
  };
}

async function recordMessage(
  booking_id: string,
  restaurant_id: string,
  type: MessageType,
  delivered: boolean,
) {
  const { error } = await supabaseAdmin.from("messages").upsert(
    {
      booking_id,
      restaurant_id,
      type,
      delivered,
      reminder_state: delivered ? "delivered" : "failed",
    },
    {
      onConflict: "restaurant_id,booking_id,type",
    },
  );
  if (error) throw new Error(error.message);
}
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
