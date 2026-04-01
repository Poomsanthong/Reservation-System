import { getTemplates, updateTemplate } from "@/lib/server/template";
import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return new NextResponse(
        JSON.stringify({ error: "Restaurant not found" }),
        {
          status: 404,
        },
      );
    }

    const templates = await getTemplates(restaurant.id);

    return new NextResponse(JSON.stringify(templates), {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch templates" }),
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const template = await req.json(); // expects { id, subject, html }
    const restaurant = await getRestaurantBySlug();
    if (!restaurant) {
      return new NextResponse(
        JSON.stringify({ error: "Restaurant not found" }),
        {
          status: 404,
        },
      );
    }
    // update in DB
    await updateTemplate(
      template.id,
      template.subject,
      template.html,
      restaurant.id,
    );
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update template" }),
      { status: 500 },
    );
  }
}
