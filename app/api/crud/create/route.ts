import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabaseServer";
import { inngest } from "@/lib/inngest/inngest"; // 👈 add this

import { success, fail, validateTable, requireFields } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { table, data } = await req.json();
    console.log("Create Request Data:", { table, data });

    requireFields({ table, data }, ["table", "data"]);
    validateTable(table);

    const supabase = await supabaseServer(); // 👈 call the function
    const { data: created, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single(); //  add .single() to get the created record directly

    if (error) throw new Error(error.message);

    // Trigger an Inngest event after successful creation
    if (table === "reservations") {
      await inngest.send({
        name: "reservation.created",
        data: created,
      });
      console.log(
        "Inngest event 'reservation.created' sent with data:",
        created,
      );
    }

    return success(created);
  } catch (error: any) {
    console.error("Error in CREATE route:", error);
    return fail(error);
  }
}
