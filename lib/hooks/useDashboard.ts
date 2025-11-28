import { supabaseServer } from "@/lib/server/supabaseServer";
import { getWeekRanges } from "../dateHelper";

// used to calculate percentage change and trend direction
export function calculateChange(
  current: number | null,
  previous: number | null
) {
  if (previous === 0) return { change: "N/A", trend: "up" }; // avoid division by 0

  const diff = (current ?? 0) - (previous ?? 0);
  const change = ((diff / (previous ?? 1)) * 100).toFixed(1) + "%"; // e.g. "12.5%"
  const trend = diff >= 0 ? "up" : "down";

  return { change, trend };
}
