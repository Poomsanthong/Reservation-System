import { supabaseServer } from "@/lib/server/supabaseServer";
import { notFound } from "next/navigation";
import BookingPageClient from "./BookingPageClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RestaurantBookingPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await supabaseServer();

  const { data: restaurant, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !restaurant) {
    notFound();
  }

  return <BookingPageClient restaurant={restaurant} />;
}
