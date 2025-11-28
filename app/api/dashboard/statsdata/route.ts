// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";

// export async function GET(req: Request) {
//   const supabase = await supabaseServer();

//   // compute week ranges
//   const today = new Date();
//   const day = today.getDay(); // 0 = Sun
//   const diffToMonday = (day + 6) % 7;
//   const startOfThisWeek = new Date(today);
//   startOfThisWeek.setDate(today.getDate() - diffToMonday);
//   startOfThisWeek.setHours(0, 0, 0, 0);

//   const startOfLastWeek = new Date(startOfThisWeek);
//   startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
//   startOfLastWeek.setHours(0, 0, 0, 0);

//   // Total bookings this week
//   const { count: totalBookings } = await supabase
//     .from("reservations")
//     .select("*", { count: "exact" })
//     .gte("created_at", startOfThisWeek);

//   // Total bookings last week
//   const { count: prevBookings } = await supabase
//     .from("reservations")
//     .select("*", { count: "exact" })
//     .gte("created_at", startOfLastWeek)
//     .lt("created_at", startOfThisWeek);

//   // Total guests (all time)
//   const { data: guestsData } = await supabase
//     .from("reservations")
//     .select("partySize");

//   const totalGuests =
//     guestsData?.reduce((sum, row) => sum + (row.partySize || 0), 0) ?? 0;

//   return NextResponse.json({
//     totalBookings: totalBookings ?? 0,
//     prevBookings: prevBookings ?? 0,
//     totalGuests,
//   });
// }
