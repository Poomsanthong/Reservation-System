import { supabaseServer } from "@/lib/supabaseServer";
import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function DELETE(req: Request) {
  try {
    const { table, id } = await req.json();

    requireFields({ table, id }, ["table", "id"]);
    validateTable(table);

    const { error } = await supabaseServer.from(table).delete().eq("id", id);

    if (error) throw new Error(error.message);

    return success({ deleted: id });
  } catch (error) {
    return fail(error);
  }
}
