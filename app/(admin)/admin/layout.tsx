import Header from "@/components/Header";
import { getCurrentUserRestaurant } from "@/lib/server/getCurrentUserRestaurant";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { restaurant } = await getCurrentUserRestaurant();
  const restaurantLogo = restaurant?.logo_url ?? undefined;
  return (
    <div>
      <Header restaurant_logo={restaurantLogo} />

      <div className="min-h-screen text-primary-400">
        <div className="container mx-auto overflow-auto">{children}</div>
      </div>
    </div>
  );
}
