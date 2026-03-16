import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer(); // Initialize Supabase on the server
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      type,
      created_at,
      reminder_state,
      booking_id (
        name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10);
  // console.log("Fetched recent messages from database:", data, error);
  return NextResponse.json(data);
}
