import { SupabaseClient } from "@supabase/supabase-js";

export async function getTimeDistribution(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("reservations")
    .select("reservation_time");

  if (error) throw error;

  const buckets = {
    lunch: 0, // 11:00–14:00
    afternoon: 0, // 14:00–17:00
    dinner: 0, // 17:00–21:00
    lateNight: 0, // 21:00–23:00
  };

  data.forEach((row) => {
    const time = row.reservation_time; // "18:30:00"
    const [hour] = time.split(":").map(Number);

    if (hour >= 11 && hour < 14) buckets.lunch++;
    else if (hour >= 14 && hour < 17) buckets.afternoon++;
    else if (hour >= 17 && hour < 21) buckets.dinner++;
    else buckets.lateNight++;
  });

  // return WITH COLORS
  return [
    {
      time: "Lunch (11-14)",
      value: buckets.lunch,
      color: "#3b82f6", // blue
    },
    {
      time: "Afternoon (14-17)",
      value: buckets.afternoon,
      color: "#10b981", // green
    },
    {
      time: "Dinner (17-21)",
      value: buckets.dinner,
      color: "#f59e0b", // amber
    },
    {
      time: "Late Night (21-23)",
      value: buckets.lateNight,
      color: "#ef4444", // red
    },
  ];
}
