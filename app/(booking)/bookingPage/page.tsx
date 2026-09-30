import { redirect } from "next/navigation";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

export default async function ClientIndexPage() {
  const { user, restaurant } = await getCurrentUserRestaurant();

  // If the restaurant doesn't have a slug, redirect to a default booking page
  // If no user  is found,redirect to a default booking page (e.g., bookflow-system)
  if (!user || !restaurant?.slug) {
    redirect("/bookingPage/bookflow-system");
  }

  // Redirect to the restaurant's booking page using its slug if everything is valid
  redirect(`/bookingPage/${restaurant.slug}`);
}
