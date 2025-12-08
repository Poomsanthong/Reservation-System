"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getDailyBookings } from "@/lib/server/getBooking";

const DailyBooking: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedDate = new Date();
  const sqlDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getDailyBookings(sqlDate);
        setBookings(data);
      } catch (err) {
        console.error("Failed to load daily bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [sqlDate]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Daily Bookings</CardTitle>
          <CardDescription>
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </CardDescription>
        </div>
        <div className="text-sm font-medium">
          Total: {bookings.length} Reservations
        </div>
      </CardHeader>

      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        {bookings.map((b, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between p-3 border rounded-lg border-gray-200"
          >
            <span className="font-medium">{b.name}</span>
            <span className="text-gray-600 text-sm">
              {b.reservation_time} | Party: {b.partySize} | Tel: {b.phone}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyBooking;
