import { Resend } from "resend";
import { inngest } from "../inngest";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { error } from "console";
import { toast } from "sonner";

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
      partysize,
      reminderTime,
      restaurant_id,
    } = event.data;

    const { data: template, error: templateError } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .eq("type", "reminder")
      .eq("restaurant_id", restaurant_id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (templateError || !template) {
      throw new Error(templateError?.message || "Reminder email template not found");
    }

    let emailContent = template?.html || "";
    emailContent = emailContent
      .replace("{{name}}", name)
      .replace("{{reservation_date}}", reservation_date)
      .replace("{{reservation_time}}", reservation_time)
      .replace("{{booking_id}}", booking_id)
      .replace("{{partysize}}", partysize.toString());

    console.log("Reminder Time is " + reminderTime);
    // await step.sleep("30s", 3000); // Initial sleep to ensure the database record is created , Test with 30s, then change to sleepUntil with the actual reminder time
    await step.sleepUntil("waiting for reminder time", new Date(reminderTime));

    try {
      await step.run("send-email", async () => {
        return resend.emails.send({
          from: "NoReply@bookflow.poomsan.site",
          to: email,
          subject: template.subject,
          html: emailContent,
        });
      });

      // console.log("Reminder email sent result:", booking_id);

      await step.run("update-message", async () => {
        await supabaseAdmin
          .from("messages")
          .update({
            reminder_state: "delivered",
            delivered: true,
          })
          .eq("booking_id", booking_id)
          .eq("type", "reminder");
      });
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
