import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const BookingSummary = ({ form }: { form: any }) => {
  const { date, selectedTime, partysize } = form.fields;

  return (
    <div className="flex justify-center w-full">
      {" "}
      {/* Summary */}
      <Card className="w-full max-w-lg">
        {" "}
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Date</span>
            <span className="text-primary-900">
              {date
                ? date.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })
                : "Not selected"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Time</span>
            <span className="text-primary-900">
              {selectedTime || "Not selected"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-primary-600">Guests</span>
            <span className="text-primary-900">{partysize}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;
