import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/server/getSchedule";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const restaurantId = searchParams.get("restaurantId") || undefined;
  if (!date)
    return NextResponse.json({ error: "Missing date" }, { status: 400 });

  try {
    const schedule = await getSchedule(date, restaurantId);
    // console.log("Schedule for", date, ":", schedule);
    return NextResponse.json(schedule);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load schedule" },
      { status: 500 },
    );
  }
}
