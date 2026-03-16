import { supabaseServer } from "@/lib/server/supabaseServer";
import { NextResponse } from "next/server";
async function getMessageStats(type: "confirmation" | "reminder") {
  // Total messages
  const supabase = await supabaseServer(); // Initialize Supabase on the server
  const { count: totalCount } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("type", type);

  // Delivered
  const { count: deliveredCount } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("type", type)
    .eq("delivered", true);

  // Opened
  const { count: openedCount } = await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("type", type)
    .eq("opened", true);

  return {
    total: totalCount || 0,
    delivered: deliveredCount || 0,
    opened: openedCount || 0,
    deliveredPercentage: totalCount
      ? Math.round((deliveredCount! / totalCount) * 100)
      : 0,
    openedPercentage: totalCount
      ? Math.round((openedCount! / totalCount) * 100)
      : 0,
  };
}

export async function GET() {
  const confirmations = await getMessageStats("confirmation");
  const reminders = await getMessageStats("reminder");

  return NextResponse.json({
    confirmations,
    reminders,
  });
}
