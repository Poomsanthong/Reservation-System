import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { getSchedule } from "@/lib/api/functions";

export default function TimeSlotGrid({ form }: { form: any }) {
  const [schedule, setSchedule] = useState<any[]>([]);
  const sqlDate = form.fields.date?.toISOString().split("T")[0];
  const [loading, setLoading] = useState(true);
  if (!form.fields.date) return null;
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const data = await getSchedule(sqlDate);
        setSchedule(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, [form.fields.date]);
  return (
    <div>
      {/* Time Slots */}
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
