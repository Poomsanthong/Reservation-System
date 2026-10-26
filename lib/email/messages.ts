import { MessageType } from "@/features/messages/types";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function recordMessage(
  booking_id: string,
  restaurant_id: string,
  type: MessageType,
  delivered: boolean,
) {
  const { error } = await supabaseAdmin.from("messages").upsert(
    {
      booking_id,
      restaurant_id,
      type,
      delivered,
      reminder_state: delivered ? "delivered" : "failed",
    },
    {
      onConflict: "restaurant_id,booking_id,type",
    },
  );
  if (error) throw new Error(error.message);
}
