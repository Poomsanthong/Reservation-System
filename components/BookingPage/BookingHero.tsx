import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useBookingForm } from "@/lib/hooks/useBookingForm";
const BookingHero = () => {
  const form = useBookingForm();
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700">
            AI-Powered Smart Bookings
          </span>
        </div>
        <h2 className="text-slate-900 mb-2">Reserve Your Table</h2>
        <p className="text-slate-600">
          Find the perfect time with AI recommendations
        </p>
      </div>

      {/* Confirmation Message */}
      {form.showConfirmation && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-900">Booking confirmed!</p>
            <p className="text-sm text-green-700">
              Confirmation sent to your email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHero;
