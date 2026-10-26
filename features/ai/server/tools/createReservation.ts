import "server-only";
import { tool } from "ai";
import { z } from "zod";
import { createReservation } from "@/features/bookings/server/createReservation";

export const createReservationTool = tool({
  description: "Create a new reservation for the BookFlow restaurant.",

  inputSchema: z.object({
    data: z.string().describe("Reservation date in YYYY-MM-DD format"),

    time: z.string().describe("Reservation time in HH:MM format"),

    partrysize: z
      .number()
      .int()
      .positive()
      .describe("Number of guests for the reservation"),

    name: z
      .string()
      .min(2)
      .max(100)
      .describe("Name of the guest making the reservation"),

    email: z
      .string()
      .email()
      .describe("Email address of the guest making the reservation"),

    phone: z
      .string()
      .min(1)
      .describe("Phone number of the guest making the reservation"),

    note: z
      .string()
      .max(500)
      .optional()
      .describe("Optional note for the reservation"),
  }),

  execute: async ({ data, time, partrysize, name, email, note, phone }) => {
    console.log("AI TOOL CALLED:", {
      data,
      time,
      partrysize,
      name,
      email,
      note,
      phone,
    });

    try {
      const reservation = await createReservation({
        reservation_date: data,
        reservation_time: time,
        partysize: partrysize,
        name,
        email,
        phone,
        note: note || "",
      });

      console.log("RESERVATION CREATED:", reservation);
      return {
        success: true,
        bookingId: reservation.display_id,
        data: reservation.reservation_date,
        time: reservation.reservation_time,
        partysize: reservation.partysize,
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        note: reservation.note,
        restaurantName: reservation.restaurant_name,
      };
    } catch (error) {
      console.error("Ai Error creating reservation:", error);
      throw error;
    }
  },
});
