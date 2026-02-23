import { serve } from "inngest/next";
import { inngest } from "./inngest";
import { sendconfirmation } from "./functions/send-confirmation";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendconfirmation],
});
