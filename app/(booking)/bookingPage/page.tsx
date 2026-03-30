import { redirect } from "next/navigation";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

export default async function ClientIndexPage() {
  const { user, restaurant } = await getCurrentUserRestaurant();

  if (!user) {
    redirect("/login");
  }

  if (!restaurant?.slug) {
    redirect("/login");
  }

  redirect(`/bookingPage/${restaurant.slug}`);
}
