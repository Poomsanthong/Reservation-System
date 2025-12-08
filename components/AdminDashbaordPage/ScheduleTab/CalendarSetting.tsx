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
    const data = await getBlackoutDates();
    setBlackouts(data);
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Manage blocked days</CardDescription>
        </CardHeader>

        <CardContent>
          <Calendar
            mode="single"
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

          <div className="mt-4">
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
