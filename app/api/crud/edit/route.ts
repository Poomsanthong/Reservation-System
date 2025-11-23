import { supabaseServer } from "@/lib/supabaseServer";
import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function PATCH(req: Request) {
  try {
    const { table, id, data } = await req.json();

    requireFields({ table, id, data }, ["table", "id", "data"]);
    validateTable(table);

    const { data: updated, error } = await supabaseServer
      .from(table)
      .update(data)
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);

    return success(updated);
  } catch (error) {
    return fail(error);
  }
}
