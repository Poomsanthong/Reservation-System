import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/api/reservation/availability";

export async function POST(req: Request) {
  try {
    const { date, time, restaurantId } = await req.json();
    if (!date || !time) {
      return NextResponse.json(
        { error: "Missing date or time" },
        { status: 400 },
      );
    }

    const result = await checkAvailability(date, time, restaurantId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 },
    );
  }
}
