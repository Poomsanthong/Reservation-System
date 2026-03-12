import { getTemplates, updateTemplate } from "@/lib/server/template";

export async function GET() {
  try {
    const templates = await getTemplates(); // fetch from DB
    return new Response(JSON.stringify(templates), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch templates" }),
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const template = await req.json(); // expects { id, subject, html }
    await updateTemplate(template.id, template.subject, template.html);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to update template" }),
      { status: 500 },
    );
  }
}
