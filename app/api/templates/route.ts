import { getTemplates, updateTemplate } from "@/lib/server/template";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurant_id = searchParams.get("restaurantId") ?? undefined;

    const templates = await getTemplates(restaurant_id); // fetch from DB with restaurantId filter

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
    // update in DB
    await updateTemplate(
      template.id,
      template.subject,
      template.html,
      template.restaurantId,
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
