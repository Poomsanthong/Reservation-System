import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get("date");
  const people = Number(searchParams.get("people") || 0);

  if (!date || !people) {
    return NextResponse.json(
      { error: "Missing date or people" },
      { status: 400 }
    );
  }

  // 1. CHECK BLACKOUT DATES
  const blackout = await supabaseServer
    .from("blackout_dates")
    .select("date")
    .eq("date", date)
    .maybeSingle();

  if (blackout.data) {
    return NextResponse.json({
      available: false,
      reason: "Restaurant is closed on this date",
    });
  }

  // 2. GET SETTINGS (capacity + slot length)
  const { data: settingsData } = await supabaseServer
    .from("settings")
    .select("*");

  const settings = Object.fromEntries(
    settingsData?.map((s) => [s.key, s.value]) || []
  );

  const MAX_CAPACITY = Number(settings["max_capacity_per_slot"] || 30);

  // 3. GET EXISTING RESERVATIONS FOR THAT DATE
  const { data: reservations, error } = await supabaseServer
    .from("reservations")
    .select("people")
    .eq("reservation_date", date);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // sum up reserved seats
  const reservedSeats = reservations.reduce((sum, r) => sum + r.people, 0);

  const remaining = MAX_CAPACITY - reservedSeats;

  return NextResponse.json({
    date,
    requested_people: people,
    available: remaining >= people,
    remaining_capacity: remaining,
    reserved_seats: reservedSeats,
    max_capacity: MAX_CAPACITY,
  });
}
