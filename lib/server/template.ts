import { supabaseServer } from "./supabaseServer";

// Fetch all email templates for a given restaurant
export async function getTemplates(restaurantId?: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("email_templates")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("updated_at", { ascending: false });

  console.log("Fetched templates for restaurantId", restaurantId, ":", data); // Debug log to verify fetched templates

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }

  const latestTemplatesByType = new Map<string, (typeof data)[number]>();

  for (const template of data ?? []) {
    if (!latestTemplatesByType.has(template.type)) {
      latestTemplatesByType.set(template.type, template);
    }
  }

  return Array.from(latestTemplatesByType.values());
}

// Update a single email template for a restaurant
export const updateTemplate = async (
  id: string,
  subject: string,
  html: string,
  restaurantId: string,
) => {
  const supabase = await supabaseServer();
  const { data: existingTemplate, error: fetchError } = await supabase
    .from("email_templates")
    .select("type")
    .eq("id", id)
    .eq("restaurant_id", restaurantId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!existingTemplate) {
    throw new Error("Template not found");
  }

  const { error } = await supabase
    .from("email_templates")
    .update({ subject, html, updated_at: new Date().toISOString() })
    .eq("restaurant_id", restaurantId)
    .eq("type", existingTemplate.type);
  if (error) throw error;
  return true;
};
