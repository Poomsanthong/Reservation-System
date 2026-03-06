import { inngest } from "../inngest";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendconfirmation = inngest.createFunction(
  { id: "send-confirmation-email" },
  { event: "reservation.created" }, // match exactly what you send
  async ({ event }) => {
    const { email, name, reservation_date, reservation_time, partySize } =
      event.data;

    console.log("FUNCTION TRIGGERED", event.data);

    try {
      const result = await resend.emails.send({
        from: "NoReply@bookflow.poomsan.site", // replace with your verified sender , this is just an example and tested with resend's onboarding email
        to: email,
        subject: "Your Reservation Confirmation",
        html: `<h1>Hello ${name}</h1>
               <p>Your reservation has been confirmed:</p>
               <ul>
                 <li>Date: ${reservation_date}</li>
                 <li>Time: ${reservation_time}</li>
                 <li>Party Size: ${partySize}</li>
               </ul>
               <p>We look forward to serving you!</p>`,
      });

      console.log("Email sent result:", result);
      return { success: true };
    } catch (err) {
      console.error("Email failed:", err);
      throw err;
    }
  },
);
