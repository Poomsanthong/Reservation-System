// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// // time helper: returns 'HH:MM:SS'
// function addMinutesToTime(timeStr: string, minutes: number) {
//   const [h, m, s] = timeStr.split(":").map(Number);
//   const base = new Date(1970, 0, 1, h, m, s || 0);
//   base.setMinutes(base.getMinutes() + minutes);
//   return base.toTimeString().slice(0, 8);
// }

// export async function getSettings() {
//   const { data } = await supabase.from("settings").select("*");
//   const map: Record<string, string> = {};
//   data?.forEach((r: any) => (map[r.key] = r.value));
//   return map;
// }

// export function generateSlots(
//   open: string,
//   close: string,
//   slotLengthMins: number
// ) {
//   const slots: string[] = [];
//   let cur = open;
//   // loop protecting infinite
//   for (let i = 0; i < 200; i++) {
//     if (cur >= close) break;
//     slots.push(cur);
//     cur = addMinutesToTime(cur, slotLengthMins);
//   }
//   return slots;
// }

// export async function getAvailableSlots(dateISO: string, people = 1) {
//   // 1) blackout check (full date unavailable if present)
//   const { data: blocked } = await supabase
//     .from("blackout_dates")
//     .select("date")
//     .eq("date", dateISO);
//   if (blocked && blocked.length) return { error: "closed", slots: [] }; // <- unavailable date

//   // 2) opening hours for day (unavailable if none configured)
//   const dow = new Date(dateISO + "T00:00:00").getDay(); // 0..6
//   const { data: oh } = await supabase
//     .from("opening_hours")
//     .select("*")
//     .eq("day_of_week", dow);
//   if (!oh || oh.length === 0) return { error: "no_opening_hours", slots: [] }; // <- unavailable date

//   const settings = await getSettings();
//   const maxCapacity = Number(settings["max_capacity_per_slot"] ?? 30);
//   const slotLength = Number(settings["slot_length_minutes"] ?? 30);

//   const hours = oh[0];
//   const slots = generateSlots(hours.open_time, hours.close_time, slotLength);

//   // 3) fetch reservations for that date
//   const { data: reservations } = await supabase
//     .from("reservations")
//     .select("reservation_time, people")
//     .eq("reservation_date", dateISO)
//     .eq("status", "confirmed");

//   const counts: Record<string, number> = {};
//   (reservations || []).forEach((r: any) => {
//     const t = (r.reservation_time || "").toString().slice(0, 8);
//     counts[t] = (counts[t] || 0) + (r.people || 0);
//   });

//   const available = slots.filter(
//     (slot) => (counts[slot] || 0) + people <= maxCapacity
//   );
//   return { slots: available, maxCapacity, slotLength };
// }
