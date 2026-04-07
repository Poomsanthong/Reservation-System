import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { getSchedule } from "@/lib/api/functions";
import type {
  BookingFormController,
  ScheduleSlot,
} from "@/features/bookings/types";

type TimeSlotGridProps = {
  form: BookingFormController;
};

export default function TimeSlotGrid({ form }: TimeSlotGridProps) {
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const sqlDate = form.fields.date?.toISOString().split("T")[0];
  if (!form.fields.date) return null;

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const data = await getSchedule(sqlDate);
        setSchedule(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
      }
    }

    fetchSchedule();
  }, [form.fields.date, sqlDate]);

  return (
    <div>
      <div className="space-y-2">
        <Label>Available Times</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {schedule.map((slot) => (
            <Button
              key={slot.time}
              variant={
                form.fields.selectedTime === slot.time ? "default" : "outline"
              }
              disabled={!slot.available}
              onClick={() => form.updateField("selectedTime", slot.time)}
              className="text-xs sm:text-sm flex items-center justify-center w-full"
            >
              <Clock className="w-4 h-4 mr-1" />
              {slot.displayTime}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
