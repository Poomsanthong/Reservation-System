import { redirect } from "next/navigation";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";

export default async function AdminIndexPage() {
  const { user, restaurant } = await getCurrentUserRestaurant();

  if (!user) {
    redirect("/login");
  }

  if (!restaurant?.slug) {
    redirect("/login");
  }

  redirect(`/admin/${restaurant.slug}`);
}
