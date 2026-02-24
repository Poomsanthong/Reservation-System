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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  // Mock schedule data for demonstration purposes only - will be replaced with dynamic data later
  const mockSchedule = [
    { time: "11:00 AM", booked: 0, capacity: 8, status: "available" },
    { time: "11:30 AM", booked: 2, capacity: 8, status: "available" },
    { time: "12:00 PM", booked: 5, capacity: 8, status: "filling" },
    { time: "12:30 PM", booked: 7, capacity: 8, status: "filling" },
    { time: "1:00 PM", booked: 8, capacity: 8, status: "full" },
    { time: "1:30 PM", booked: 6, capacity: 8, status: "filling" },
    { time: "2:00 PM", booked: 3, capacity: 8, status: "available" },
    { time: "2:30 PM", booked: 1, capacity: 8, status: "available" },
    { time: "6:00 PM", booked: 7, capacity: 8, status: "filling" },
    { time: "6:30 PM", booked: 8, capacity: 8, status: "full" },
    { time: "7:00 PM", booked: 8, capacity: 8, status: "full" },
    { time: "7:30 PM", booked: 8, capacity: 8, status: "full" },
    { time: "8:00 PM", booked: 6, capacity: 8, status: "filling" },
    { time: "8:30 PM", booked: 4, capacity: 8, status: "available" },
  ];
  return (
    <Card className="lg:col-span-2 ">
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
        {/* Legend */}
        <div className="flex gap-4 mb-4 p-3 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-primary-600">Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-primary-600">Filling Up</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-primary-600">Fully Booked</span>
          </div>
        </div>
        <div className="text-sm font-medium">
          Total: {bookings.length} Reservations
        </div>
      </CardHeader>

      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        {mockSchedule.map((slot, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between p-3 border rounded-lg border-gray-200"
          >
            {/* Time and Booking Info */}
            <div className="flex items-center gap-3">
              <span className="font-medium">{slot.time}</span>
              <span className="text-primary-600 text-sm">
                {slot.booked} / {slot.capacity} tables
              </span>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  slot.status === "available"
                    ? "default"
                    : slot.status === "filling"
                      ? "secondary"
                      : "destructive"
                }
              >
                {slot.status}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary-600 hover:text-primary-800"
              >
                edit{" "}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyBooking;
