// import { supabaseServer } from "@/lib/server/supabaseServer";
// import { getRestaurantBySlug } from "@/lib/server/getRestaurantBySlug";
// import { success, fail, validateTable } from "@/lib/utils";
// import { crudCancelSchema } from "@/shared/api/schemas";

// export async function PATCH(req: Request) {
//   try {
//     const { id } = crudCancelSchema.parse(await req.json());

//     const supabase = await supabaseServer();

//     const restaurant = await getRestaurantBySlug();

//     if (!restaurant) {
//       throw new Error("Restaurant not found");
//     }

//     const { data, error } = await supabase
//       .from("reservations")
//       .update({
//         status: "cancelled",
//       })
//       .eq("id", id)
//       .eq("restaurant_id", restaurant.id)
//       .select()
//       .single();

//     if (error) {
//       throw new Error(error.message);
//     }
//     console.log("Reservation cancelled:", data);
//     return success(data);
//   } catch (error) {
//     return fail(error);
//   }
// }

// FILE CURRENTLY NOT IN USE. DO NOT DELETE. MAY BE USED IN THE FUTURE.
