import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table");
  const id = searchParams.get("id");

  if (!table || !id) {
    return NextResponse.json(
      { error: "Missing table or id parameter" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer.from(table).delete().eq("id", id);

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ success: true });
}
