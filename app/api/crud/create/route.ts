import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabaseServer";

import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { table, data } = await req.json();

    requireFields({ table, data }, ["table", "data"]);
    validateTable(table);

    const supabase = await supabaseServer(); // 👈 call the function
    const { data: created, error } = await supabase
      .from(table)
      .insert(data)
      .select();

    if (error) throw new Error(error.message);

    return success(created);
  } catch (error: any) {
    return fail(error);
  }
}
