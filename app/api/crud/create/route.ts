import { supabaseServer } from "@/lib/server/supabaseServer";
import { success, fail, validateTable } from "@/lib/utils";
import { crudCreateSchema } from "@/shared/api/schemas";
import { createReservation } from "@/lib/server/createReservation";

export async function POST(req: Request) {
  try {
    // Validate the request body up front before touching the database.
    const { table, data } = crudCreateSchema.parse(await req.json());
    validateTable(table);

    const supabase = await supabaseServer();
    let insertData = data;

    // Reservation rows always inherit the current restaurant on the server.
    if (table === "reservations") {
      const reservation = await createReservation({
        email: data.email,
        name: data.name,
        partysize: data.partysize,
        reservation_date: data.reservation_date,
        reservation_time: data.reservation_time,
        phone: data.phone,
        note: data.note,
      });

      return success(reservation);
    }

    const { data: created, error } = await supabase
      .from(table)
      .insert(insertData)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return success(created);
  } catch (error) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
