import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { table, data } = await req.json();

    requireFields({ table, data }, ["table", "data"]);
    validateTable(table);

    const { data: created, error } = await supabaseServer
      .from(table)
      .insert(data)
      .select();

    if (error) throw new Error(error.message);

    return success(created);
  } catch (error: any) {
    return fail(error);
  }
}
