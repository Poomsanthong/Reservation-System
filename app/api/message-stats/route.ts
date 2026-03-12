import { supabaseServer } from "@/lib/server/supabaseServer";

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

  console.log(
    `Stats for ${type}: Total=${totalCount}, Delivered=${deliveredCount}, Opened=${openedCount}`,
  );
  return {
    total: totalCount || 0,
    delivered: deliveredCount || 0,
    opened: openedCount || 0,
    deliveredPercent: totalCount
      ? Math.round((deliveredCount! / totalCount) * 100)
      : 0,
    openedPercent: totalCount
      ? Math.round((openedCount! / totalCount) * 100)
      : 0,
  };
}

export async function GET() {
  const confirmations = await getMessageStats("confirmation");
  const reminders = await getMessageStats("reminder");

  return new Response(JSON.stringify({ confirmations, reminders }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
