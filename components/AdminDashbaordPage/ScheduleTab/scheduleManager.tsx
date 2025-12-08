import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, Plus, Settings, AlertCircle } from "lucide-react";
import Setting from "./Setting";
import CalendarSetting from "./CalendarSetting";
const timeSlots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

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

export function ScheduleManager() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [waitlistEnabled, setWaitlistEnabled] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "filling":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "full":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Card */}
      <Setting />
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <CalendarSetting />

        {/* Daily Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daily Schedule</CardTitle>
                <CardDescription>
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="gap-1">
                  <Users className="w-3 h-3" />
                  45 Total Bookings
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="flex gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-600">Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-slate-600">Filling Up</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-slate-600">Fully Booked</span>
              </div>
            </div>

            {/* Schedule Grid */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {mockSchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(
                    slot.status
                  )}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20">
                      <p className="text-sm">{slot.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {slot.booked}/{slot.capacity} tables
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {slot.status === "full" && waitlistEnabled && (
                      <Badge variant="outline" className="text-xs">
                        Waitlist: 3
                      </Badge>
                    )}
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
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Capacity</p>
                <p className="text-xl text-slate-900">112 guests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Avg Table Turn</p>
                <p className="text-xl text-slate-900">85 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Peak Hours</p>
                <p className="text-xl text-slate-900">6-8 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
