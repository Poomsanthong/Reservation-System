import { getTemplates, updateTemplate } from "@/lib/server/template";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const templates = await getTemplates(); // fetch from DB

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
    await updateTemplate(template.id, template.subject, template.html);

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update template" }),
      { status: 500 },
    );
  }
}
