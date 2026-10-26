import "server-only";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { MessageType } from "@/features/messages/types";
import { NonRetriableError } from "inngest"; // NON Retry error

export const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c]);

export function render(
  text: string,
  values: Record<string, string>,
  { escape }: { escape: boolean },
) {
  return text.replace(/{{\s*(\w+)\s*}}/g, (match, key) =>
    key in values ? (escape ? escapeHtml(values[key]) : values[key]) : match,
  );
}

// Load Template function
export async function loadTemplate(restaurantId: string, type: MessageType) {
  const { data, error } = await supabaseAdmin
    .from("email_templates")
    .select("subject, html")
    .eq("type", type)
    .eq("restaurant_id", restaurantId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message); // transient: retry
  if (!data) {
    throw new NonRetriableError(
      `No "${type}" template for restaurant ${restaurantId}`,
    );
  }
  return data;
}

export function buildValues(
  data: Record<string, unknown>,
): Record<string, string> {
  const convertToString = (value: unknown): string => String(value ?? "");

  return {
    name: convertToString(data.name),
    email: convertToString(data.email),
    restaurant_name: convertToString(data.restaurant_name),
    booking_id: convertToString(data.booking_id),
    display_id: convertToString(data.display_id),
    reservation_date: convertToString(data.reservation_date),
    reservation_time: convertToString(data.reservation_time),
    partysize: convertToString(data.partysize),
  };
}
