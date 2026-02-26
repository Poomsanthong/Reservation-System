import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useBookingForm } from "@/lib/hooks/useBookingForm";

const BookingSummary = ({ form }: { form: any }) => {
  return (
    <div>
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Date</span>
            <span className="text-primary-900">
              {form.fields.date
                ? form.fields.date.toLocaleDateString()
                : "Not selected"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Time</span>
            <span className="text-primary-900">
              {form.fields.selectedTime || "Not selected"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Guests</span>
            <span className="text-primary-900">{form.fields.partySize}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
