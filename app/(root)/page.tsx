"use client";

import { useEffect } from "react";
import BookingHero from "@/components/BookingPage/BookingHero";
import BookingForm from "@/components/BookingPage/BookingForm";
import BookingSummary from "@/components/BookingPage/BookingSummary";
import { get } from "@/lib/api/funtions";
import { useBookingForm } from "@/lib/hooks/useBookingForm";
import MerchantCard from "@/components/BookingPage/MechantCard";

export default function BookingPage() {
  const form = useBookingForm();

  useEffect(() => {
    get("reservations").then(console.log).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <BookingHero />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MerchantCard />
          <BookingForm form={form} />
        </div>

        <BookingSummary form={form} />
      </div>
    </div>
  );
}
