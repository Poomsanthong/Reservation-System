import { supabaseServer } from "./supabaseServer";

// Fetch all email templates for a given restaurant
export async function getTemplates(restaurantId?: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("email_templates")
    .select("*")
    .eq("restaurant_id", restaurantId);

  console.log("Fetched templates for restaurantId", restaurantId, ":", data); // Debug log to verify fetched templates

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  return data;
}

// Update a single email template for a restaurant
export const updateTemplate = async (
  id: string,
  subject: string,
  html: string,
  restaurantId: string,
) => {
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("email_templates")
    .update({ subject, html, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("restaurant_id", restaurantId);
  if (error) throw error;
  return true;
};
