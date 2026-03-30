import { NextResponse } from "next/server";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { supabaseServer } from "@/lib/server/supabaseServer";

export async function POST(req: Request) {
  try {
    const { date, time, name, slug } = await req.json();

    if (!date || !time || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = await supabaseServer(); // Initialize Supabase  on the server
    let query = supabase
      .from("reservations")
      .select("*")
      .eq("reservation_date", date)
      .eq("reservation_time", time)
      .ilike("name", name);

    if (slug) {
      const restaurant = await getRestaurantBySlug(slug);
      if (!restaurant) {
        return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
      }
      query = query.eq("restaurant_id", restaurant.id);
    }

    const { data, error } = await query; // case-insensitive match
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      exists: data.length > 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
