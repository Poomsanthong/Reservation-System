import { NextResponse } from "next/server";
import { getSchedule } from "@/lib/server/getSchedule";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const slug = searchParams.get("slug") || undefined;
  if (!date)
    return NextResponse.json({ error: "Missing date" }, { status: 400 });

  try {
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }
    const schedule = await getSchedule(date, restaurant.id);
    return NextResponse.json(schedule);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load schedule" },
      { status: 500 },
    );
  }
}
