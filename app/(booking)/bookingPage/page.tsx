import { redirect } from "next/navigation";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

export default async function ClientIndexPage() {
  const { user, restaurant } = await getCurrentUserRestaurant();

  // If no user  is found, redirect to a default booking page (e.g., demo restaurant)
  if (!user) {
    redirect("/bookingPage/demo-restaurant");
  }
  // If the restaurant doesn't have a slug, redirect to a default booking page
  if (!restaurant?.slug) {
    redirect("/bookingPage/demo-restaurant");
  }

  // Redirect to the restaurant's booking page using its slug if everything is valid
  redirect(`/bookingPage/${restaurant.slug}`);
}
