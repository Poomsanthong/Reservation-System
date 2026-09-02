import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { inngest } from "../inngest";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendconfirmation = inngest.createFunction(
  {
    id: "send-confirmation-email",
    triggers: { event: "reservation.created" },
  },
  async ({ event }) => {
    // match exactly what you send

    const {
      email,
      booking_id,
      name,
      restaurant_name,
      reservation_date,
      reservation_time,
      partysize,
      restaurant_id,
    } = event.data;

    const { data: template, error: templateError } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .eq("type", "confirmation")
      .eq("restaurant_id", restaurant_id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (templateError || !template) {
      throw new Error(
        templateError?.message || "Confirmation email template not found",
      );
    }

    let emailContent = template?.html || "";
    emailContent = emailContent
      .replace("{{name}}", name)
      .replace("{{reservation_date}}", reservation_date)
      .replace("{{reservation_time}}", reservation_time)
      .replace("{{booking_id}}", booking_id)
      .replace("{{partysize}}", partysize.toString())
      .replace("{{restaurant_name}}", restaurant_name);

    try {
      const result = await resend.emails.send({
        from: "NoReply@bookflow.poomsan.site", // verify this sender in Resend dashboard
        to: email,
        subject: template.subject,
        html: emailContent,
      });

      // insert message record with delivered: true if email sent successfully
      const { error: messageError } = await supabaseAdmin
        .from("messages")
        .insert({
          booking_id,
          type: "confirmation",
          delivered: true,
          reminder_state: "delivered",
          restaurant_id,
        });

      if (messageError) {
        throw new Error(messageError.message);
      }

      return { success: true };
    } catch (err) {
      console.error("Email failed:", err);
      const { error: messageError } = await supabaseAdmin
        .from("messages")
        .insert({
          booking_id,
          type: "confirmation",
          delivered: false,
          restaurant_id,
        });

      if (messageError) {
        console.error("Failed to save confirmation message:", messageError);
      }

      throw err;
    }
  },
);
