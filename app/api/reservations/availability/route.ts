import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/api/reservation/availability";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";

export async function POST(req: Request) {
  try {
    const { date, time, slug } = await req.json();
    if (!date || !time) {
      return NextResponse.json(
        { error: "Missing date or time" },
        { status: 400 },
      );
    }

    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const result = await checkAvailability(date, time, restaurant.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 },
    );
  }
}
