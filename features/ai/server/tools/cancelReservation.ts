import "server-only";
import { tool } from "ai";
import { z } from "zod";

import { cancelReservation } from "@/features/bookings/server/cancelReservation";

export const cancelReservationTool = tool({
  description:
    "Cancel an existing restaurant reservation using its reservation ID or display ID.",
  inputSchema: z.object({
    reservationId: z
      .string()
      .describe(
        "The reservation ID or display ID, such as BK-0007. always Capitalise the id",
      ),
  }),
  execute: async ({ reservationId }) => {
    const reservation = await cancelReservation(reservationId);
    return {
      success: true,
      reservation,
    };
  },
});
