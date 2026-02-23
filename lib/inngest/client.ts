import { serve } from "inngest/next";
import { inngest } from "./inngest";
import { sendconfirmation as sendConfirmationEmail } from "./functions/send-confirmation";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendConfirmationEmail],
});
