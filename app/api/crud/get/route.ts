import { supabaseServer } from "@/lib/supabaseServer";
import { success, fail, validateTable } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");

    validateTable(table);

    const supabase = await supabaseServer(); // 👈 call the function
    const { data, error } = await supabase.from("reservations").select("*");

    if (error) throw new Error(error.message);

    return success(data);
  } catch (error) {
    return fail(error);
  }
}
