import nodemailer from "nodemailer";
import { inngest } from "../inngest";

export const sendconfirmation = inngest.createFunction(
  { id: "send-confirmation" },
  { event: "app/reservation.created" }, // Listen for the reservation.created event

  async ({ event }) => {
    const { email, name, reservation_date, reservation_time, partySize } =
      event.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Reservation Confirmation",
      html: ` <h1>Reservation Confirmed</h1>
        <p>Hi ${name},</p>
        <p>Your booking is confirmed:</p>
        <ul>
          <li>Date: ${reservation_date}</li>
          <li>Time: ${reservation_time}</li>
          <li>Party Size: ${partySize}</li>
        </ul>
        `,
    });
    return { success: true };
  },
);
