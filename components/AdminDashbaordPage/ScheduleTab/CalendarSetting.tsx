"use client";

import { useState } from "react";
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

import { toLocalDate } from "@/lib/dateHelper";
import { useBlockoutDates } from "@/lib/hooks/useBlockDates";

const CalendarSetting = () => {
  const {
    blackouts,
    selectedDate,
    setSelectedDate,
    blockReason,
    setBlockReason,
    blockDate,
    unblockSelectedDate,
    getBlackoutByDate,
  } = useBlockoutDates();

  const [openBlock, setOpenBlock] = useState(false);
  const [openUnblock, setOpenUnblock] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedBlackouts = showAll ? blackouts : blackouts.slice(0, 5);

  // UI-only logic

  // When a date is clicked on the calendar
  const handleDateClick = (date?: Date) => {
    if (!date) return;

    setSelectedDate(date);

    const existing = getBlackoutByDate(date);

    if (existing) {
      setBlockReason(existing.reason || "");
      setOpenUnblock(true);
    } else {
      setOpenBlock(true);
    }
  };

  // When "Block Date" is confirmed in the modal
  const handleBlock = async () => {
    await blockDate();
    setOpenBlock(false);
  };
  // When "Unblock" is confirmed in the modal
  const handleUnblock = async () => {
    await unblockSelectedDate();
    setOpenUnblock(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Manage blocked days</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col items-center">
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

          {/* Blocked list */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto w-full">
            {displayedBlackouts.map((b) => (
              <div
                key={b.date}
                className="flex flex-col sm:flex-row justify-between p-3 border rounded-lg border-gray-200"
              >
                <span className="font-medium">{b.date}</span>
                <span className="text-primary-600 text-sm">
                  {b.reason || "No reason provided"}
                </span>
              </div>
            ))}
          </div>

          {blackouts.length > 5 && (
            <div className="text-center">
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
            placeholder="Holiday, maintenance..."
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
