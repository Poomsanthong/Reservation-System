import { supabaseServer } from "./supabaseServer";

// Get all templates
export const getTemplates = async () => {
  const supabase = await supabaseServer();
  const { data, error } = await (await supabase)
    .from("email_templates")
    .select("*");

  if (error) {
    console.error("Supabase fetch error:", error);
    throw error;
  }
  console.log("Fetched templates:", data);
  return data;
};

// Update template
export const updateTemplate = async (
  id: string,
  subject: string,
  html: string,
) => {
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("email_templates")
    .update({ subject, html, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  return true;
};
