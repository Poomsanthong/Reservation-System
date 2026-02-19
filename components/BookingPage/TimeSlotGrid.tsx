import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Label } from "../ui/label";

// Data for demo purposes - in a real app, this would come from the backend based on the selected date and restaurant
// todo: integrate with backend to fetch real availability based on selected date and restaurant
const timeSlots = [
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "6:00 PM", available: true },
  { time: "6:30 PM", available: true },
  { time: "7:00 PM", available: true },
  { time: "7:30 PM", available: false },
];

export default function TimeSlotGrid({ form }: { form: any }) {
  return (
    <div>
      {/* Time Slots */}
      <div className="space-y-2">
        <Label>Available Times</Label>
        <div className="grid grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <Button
              key={slot.time}
              variant={
                form.fields.selectedTime === slot.time ? "default" : "outline"
              }
              disabled={!slot.available}
              onClick={() => form.updateField("selectedTime", slot.time)}
              className="text-xs"
            >
              <Clock className="w-4 h-4 mr-1" />
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
