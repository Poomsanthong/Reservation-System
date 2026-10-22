import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/inngest";
import {
  sendconfirmation,
  sendRestaurantNotification,
} from "@/lib/inngest/functions/send-confirmation";
import { sendReminder } from "@/lib/inngest/functions/send-reminder";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendconfirmation, sendRestaurantNotification, sendReminder],
});
