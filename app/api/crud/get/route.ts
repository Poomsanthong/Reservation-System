import { supabaseServer } from "@/lib/server/supabaseServer";
import { success, fail, validateTable } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");
    const restaurantId = searchParams.get("restaurantId");

    validateTable(table);

    console.log(
      `Fetching data from table: ${table} for restaurantId: ${restaurantId}`,
    );
    const supabase = await supabaseServer();
    let query = supabase.from(table!).select("*");

    if (table === "reservations" && restaurantId) {
      query = query.eq("restaurant_id", restaurantId);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return success(data);
  } catch (error) {
    return fail(error);
  }
}
