"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/lib/server/calendar";

import { toLocalDate, toSqlDate } from "@/lib/dateHelper";

const CalendarSetting = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);

  const [blockReason, setBlockReason] = useState("");

  const [openBlock, setOpenBlock] = useState(false);
  const [openUnblock, setOpenUnblock] = useState(false);

  const sqlDate = toSqlDate(selectedDate);

  // -----------------------------------------
  // Load blackout dates
  // -----------------------------------------
  const loadBlackouts = async () => {
    try {
      const data = await getBlackoutDates();
      setBlackouts(data);
    } catch (error) {
      console.error("Failed to load blackout dates:", error);
    }
  };

  useEffect(() => {
    loadBlackouts();
  }, []);

  // -----------------------------------------
  // Date click handler
  // -----------------------------------------
  const handleDateClick = (date?: Date) => {
    if (!date) return;

    setSelectedDate(date);

    const sql = toSqlDate(date);
    const exists = blackouts.find((b) => b.date === sql);

    if (exists) {
      setBlockReason(exists.reason || "");
      setOpenUnblock(true);
    }
  };

  // -----------------------------------------
  // Block a date
  // -----------------------------------------
  const handleBlock = async () => {
    await addBlackoutDate(sqlDate, blockReason);
    setBlockReason("");
    setOpenBlock(false);
    loadBlackouts();
  };

  // -----------------------------------------
  // Unblock a date
  // -----------------------------------------
  const handleUnblock = async () => {
    await unblockDate(sqlDate);
    setBlackouts((prev) => prev.filter((b) => b.date !== sqlDate));
    setOpenUnblock(false);
    loadBlackouts();
  };

  const [showAll, setShowAll] = useState(false);

  const displayedBlackouts = showAll ? blackouts : blackouts.slice(0, 5);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Manage blocked days</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 flex flex-col items-center">
          <Calendar
            mode="single"
            fixedWeeks
            selected={selectedDate}
            onSelect={handleDateClick}
            modifiers={{
              blackout: blackouts.map((b) => toLocalDate(b.date)),
            }}
            modifiersStyles={{
              blackout: {
                backgroundColor: "rgba(255, 0, 0, 0.3)",
                borderRadius: "8px",
              },
            }}
          />

          {/* List of blocked dates */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto mt-4 w-full">
            {displayedBlackouts.map((b, i) => (
              <div
                key={b.date}
                className="flex flex-col sm:flex-row justify-between p-3 border rounded-lg  border-gray-200 "
              >
                <span className="font-medium">{b.date}</span>
                <span className="text-primary-600 text-sm">
                  {b.reason || "No reason provided"}
                </span>
              </div>
            ))}
          </div>

          {/* // Show "See All" if there are more than 5 blackouts */}
          {blackouts.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showAll ? "See Less" : `See All (${blackouts.length})`}
              </button>
            </div>
          )}

          <div className="w-full">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setOpenBlock(true)}
            >
              <Plus className="w-4 h-4" />
              Block Date
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Block Modal */}
      <Dialog open={openBlock} onOpenChange={setOpenBlock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Entire Day</DialogTitle>
          </DialogHeader>

          <Label>Reason (optional)</Label>
          <Input
            placeholder="Holiday, maintenance, etc."
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
          />

          <DialogFooter>
            <Button onClick={handleBlock}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unblock Modal */}
      <Dialog open={openUnblock} onOpenChange={setOpenUnblock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Date is Blocked</DialogTitle>
            <p>{blockReason || "No reason provided"}</p>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" onClick={handleUnblock}>
              Unblock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarSetting;
