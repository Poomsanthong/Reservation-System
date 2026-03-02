"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/store/useSelectedData";
import { getBookings } from "@/lib/server/getBooking";
const DailyBooking = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const { selectedDate, setSelectedDate } = useDateStore();

  if (!selectedDate) return null;
  const sqlDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch(`/api/reservations/schedule?date=${sqlDate}`);
        if (!res.ok) throw new Error("Failed to fetch schedule");
        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [selectedDate]);

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg sm:text-xl">Daily Bookings</CardTitle>
            <CardDescription className="text-sm">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </CardDescription>
          </div>

          <div className="text-sm font-medium text-primary-700">
            Reservations:{" "}
            {schedule.reduce((total, slot) => total + slot.booked, 0)}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 p-3 bg-primary-50 rounded-lg text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Filling Up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Fully Booked</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {schedule.map((slot, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-xl border-gray-200"
          >
            {/* Time + Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-semibold text-base">
                {slot.displayTime ?? slot.time}
              </span>
              <span className="text-primary-600 text-sm">
                {slot.booked} / {slot.capacity} tables
              </span>
            </div>

            {/* Status + Action */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <Badge
                className={
                  slot.status === "available"
                    ? "bg-green-500 text-white"
                    : slot.status === "filling"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                }
              >
                {slot.status}
              </Badge>

              {/* <Button
                size="sm"
                variant="ghost"
                className="text-primary-600 hover:text-primary-800"
              >
                Edit
              </Button> */}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DailyBooking;
