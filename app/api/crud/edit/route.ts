import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json();
  const { table, id, ...updates } = body;

  const { error } = await supabaseServer
    .from(table)
    .update(updates)
    .eq("id", id);
  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ success: true });
}
