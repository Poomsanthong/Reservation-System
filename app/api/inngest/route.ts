import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/inngest";
import { sendconfirmation } from "@/lib/inngest/functions/send-confirmation";
import { reminderFunction } from "@/lib/inngest/functions/reminder";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendconfirmation, reminderFunction],
});
