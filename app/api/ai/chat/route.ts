import React from "react";
import { openai } from "@ai-sdk/openai";
import { generateText, stepCountIs } from "ai";
import { checkAvailabilityTool } from "@/lib/ai/tools/checkAvailability";
import { createReservationTool } from "@/lib/ai/tools/createReservation";
import { cancelReservationTool } from "@/lib/ai/tools/cancelReservation";
export async function POST(req: Request) {
  const { message, messages } = await req.json();

  // Use the full conversation when provided.
  // Fall back to the latest message for older API requests.
  const conversationMessages =
    Array.isArray(messages) && messages.length > 0
      ? messages
      : [{ role: "user", content: message }];
  const result = await generateText({
    model: openai("gpt-5-mini"),
    system: `
                You are BookFlow AI, an AI assistant for a restaurant reservation system.
                Use the conversation history to understand the customer's latest message. 
                Reuse details they have already provided. Ask only for information that is still missing.
                You can:
                - Check reservation availability
                - Help customers make reservations
                - Answer questions about reservations and restaurant policies

                When a customer asks whether a specific date and time is available,
                use the checkAvailability tool immediately.

                
                When a customer wants to make a reservation:
                - Collect the date
                - Collect the time
                - Collect the party size
                - Collect the customer's name
                - Collect the customer's email
                - Before creating the reservation, check availability for the requested date and time.
                - Check Duplicate Reservations: If a customer has already made a reservation for the same date and time and name, inform them that they already have a reservation and provide the booking ID. Do not create a new reservation in this case.
                - Only create the reservation after availability has been confirmed.

                When a reservation is successfully created:
              - Confirm the reservation.
              - Always include the booking ID.
              - Use the customer-facing booking ID returned by the createReservation tool.
              - Keep the confirmation concise.
              - In the note, include a "Via Ai" behind the note but dont include it in confirmation just for DB.
              
              
              when a customer wants to cancel a reservation:

              - Ask for the booking ID if they have not provided one.
             
              
              - After the cancellation succeeds, respond: "Your reservation [booking ID] has been cancelled successfully."
              - Keep the confirmation concise and friendly.
              - Do not mention internal database errors or technical details.
              - If the reservation is already cancelled, say: "This reservation has already been processed. Would you like help making a new reservation?"
              - Never claim a reservation was cancelled unless the tool confirms it.

                The restaurant is already determined by the current BookFlow tenant.
                Never ask the customer which restaurant or location they mean.

                The current availability system checks the current restaurant automatically.

                Do not ask for party size when checking basic slot availability,
                because the availability tool currently does not require party size.

                Never claim a reservation time is available without checking the tool.

                Keep responses helpful and concise.
                `,

    messages: conversationMessages,
    tools: {
      checkAvailability: checkAvailabilityTool,
      createReservation: createReservationTool,
      cancelReservation: cancelReservationTool,
    },
    stopWhen: stepCountIs(3),
  });

  return Response.json({ response: result.text });
}
