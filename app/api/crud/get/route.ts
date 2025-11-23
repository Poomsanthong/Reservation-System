import { supabaseServer } from "@/lib/supabaseServer";
import { success, fail, validateTable } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");

    validateTable(table);

    const { data, error } = await supabaseServer.from(table!).select("*");

    if (error) throw new Error(error.message);

    return success(data);
  } catch (error) {
    return fail(error);
  }
}
