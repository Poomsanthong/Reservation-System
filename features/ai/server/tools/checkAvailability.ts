import "server-only";
import { tool } from "ai";
import { z } from "zod";

import { checkAvailability } from "@/features/bookings/server/availability";
import { getRestaurantBySlug } from "@/features/restaurants/server/getRestaurantBySlug";

export const checkAvailabilityTool = tool({
  description:
    "Check whether a specific reservation date and time is available at the current restaurant.",

  inputSchema: z.object({
    date: z
      .string()
      .describe("The date for the reservation in YYYY-MM-DD format."),

    time: z.string().describe("The time for the reservation in HH:MM format."),
  }),

  execute: async ({ date, time }) => {
    console.log("AI TOOL CALLED:", { date, time });

    try {
      const restaurant = await getRestaurantBySlug();

      console.log("RESTAURANT:", restaurant);

      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      const result = await checkAvailability(date, time, restaurant.id);

      console.log("AVAILABILITY RESULT:", result);

      return result;
    } catch (error) {
      console.error("AI TOOL ERROR:", error);
      throw error;
    }
  },
});
