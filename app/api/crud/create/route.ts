import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table");

  if (!table) {
    return NextResponse.json(
      { error: "Missing table parameter" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const { error } = await supabaseServer.from(table).insert(body);

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ success: true });
}
