"use client";

import { useEffect, useState } from "react";
import BookingForm from "@/components/BookingPage/BookingForm";
import BookingSummary from "@/components/BookingPage/BookingSummary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MapPin, Sparkles, Star } from "lucide-react";
import { useBookingForm } from "@/lib/hooks/useBookingForm";

type Restaurant = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  location?: string | null;
  cuisine?: string | null;
  logo_url?: string | null;
  rating?: number | string | null;
};

function getFallbackLocation(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function BookingPageClient({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const [mounted, setMounted] = useState(false);
  const form = useBookingForm({ restaurantId: restaurant.id });
  const rating = restaurant.rating
    ? Number(restaurant.rating).toFixed(1)
    : "4.8";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700">
            Reserve at {restaurant.name}
          </span>
        </div>
        <p className="text-primary-600">
          Choose your date, time, and party size to book a table in minutes.
        </p>
      </div>

      {form.showConfirmation && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-900">Booking confirmed!</p>
            <p className="text-sm text-green-700">
              Your reservation for {restaurant.name} has been received.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="flex gap-4 p-4 sm:flex-row sm:items-start sm:p-6">
              <img
                src={restaurant.logo_url || "/Logo.jpg"}
                alt={restaurant.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <h1 className="text-primary-900 text-base sm:text-lg md:text-xl font-semibold mb-1 truncate">
                      {restaurant.name}
                    </h1>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-600 truncate">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {restaurant.location ||
                          getFallbackLocation(restaurant.slug)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-primary-900 text-sm sm:text-base">
                      {rating}
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-primary-600 break-words">
                  {restaurant.description ||
                    "Book your table online and enjoy a smooth restaurant reservation experience."}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {restaurant.cuisine || "Restaurant"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    Online Booking
                  </Badge>
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    Instant Confirmation
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {mounted ? (
            <>
              <BookingForm form={form} />
              <BookingSummary form={form} />
            </>
          ) : (
            <div className="space-y-6">
              <div className="w-full max-w-md mx-auto rounded-lg border bg-card min-h-[640px]" />
              <div className="w-full max-w-lg mx-auto rounded-lg border bg-card min-h-[180px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
