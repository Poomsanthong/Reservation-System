// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";

// // export async function POST(req: Request) {
// //   const body = await req.json();

// //   const { error } = await supabaseServer.from("reservations").insert(body);

// //   if (error) return NextResponse.json({ error }, { status: 400 });

// //   return NextResponse.json({ success: true }, { status: 201 });
// // }

// export async function GET() {
//   const { data, error } = await supabaseServer
//     .from("reservations")
//     .select("*")
//     .order("reservation_date", { ascending: true });

//   if (error) return NextResponse.json({ error }, { status: 400 });

//   return NextResponse.json(data);
// }
