// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";

// // Get reservation by ID
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { data, error } = await supabaseServer
//     .from("reservations")
//     .select("*")
//     .eq("id", params.id)
//     .single();

//   if (error) return NextResponse.json({ error }, { status: 400 });

//   return NextResponse.json(data);
// }

// // Update reservation by ID
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json();

//   const { error } = await supabaseServer
//     .from("reservations")
//     .update(body)
//     .eq("id", params.id);

//   if (error) return NextResponse.json({ error }, { status: 400 });

//   return NextResponse.json({ success: true });
// }

// // Delete reservation by ID
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { error } = await supabaseServer
//     .from("reservations")
//     .delete()
//     .eq("id", params.id);

//   if (error) return NextResponse.json({ error }, { status: 400 });

//   return NextResponse.json({ success: true });
// }
