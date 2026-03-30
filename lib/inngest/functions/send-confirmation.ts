import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { inngest } from "../inngest";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendconfirmation = inngest.createFunction(
  { id: "send-confirmation-email" },
  { event: "reservation.created" }, // match exactly what you send
  async ({ event }) => {
    const {
      email,
      booking_id,
      name,
      reservation_date,
      reservation_time,
      partysize,
      restaurant_id,
    } = event.data;

    const { data: template } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .eq("type", "confirmation")
      .single();

    let emailContent = template?.html || "";
    emailContent = emailContent
      .replace("{{name}}", name)
      .replace("{{reservation_date}}", reservation_date)
      .replace("{{reservation_time}}", reservation_time)
      .replace("{{booking_id}}", booking_id)
      .replace("{{partysize}}", partysize.toString());

    try {
      const result = await resend.emails.send({
        from: "NoReply@bookflow.poomsan.site", // replace with your verified sender , this is just an example and tested with resend's onboarding email
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
