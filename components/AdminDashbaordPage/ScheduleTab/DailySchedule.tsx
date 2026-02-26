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
const DailyBooking = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<any[]>([]);
  const { selectedDate, setSelectedDate } = useDateStore();
  const sqlDate = selectedDate.toISOString().split("T")[0];
  if (!selectedDate) return null;

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
          Reservations:{" "}
          {schedule.reduce((total, slot) => total + slot.booked, 0)}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        {schedule.map((slot, i) => (
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
                className={
                  slot.status === "available"
                    ? "bg-green-500 text-white"
                    : slot.status === "filling"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                }
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
