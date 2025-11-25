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
  const [autoAccept, setAutoAccept] = useState(true);
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>
                Configure availability and booking rules
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Accept Bookings</Label>
                  <p className="text-sm text-slate-600">
                    Automatically confirm reservations
                  </p>
                </div>
                <Switch checked={autoAccept} onCheckedChange={setAutoAccept} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Waitlist</Label>
                  <p className="text-sm text-slate-600">
                    Allow guests to join waitlist
                  </p>
                </div>
                <Switch
                  checked={waitlistEnabled}
                  onCheckedChange={setWaitlistEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label>Default Table Capacity</Label>
                <Select defaultValue="8">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Tables</SelectItem>
                    <SelectItem value="6">6 Tables</SelectItem>
                    <SelectItem value="8">8 Tables</SelectItem>
                    <SelectItem value="10">10 Tables</SelectItem>
                    <SelectItem value="12">12 Tables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timing Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Window</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days ahead</SelectItem>
                    <SelectItem value="14">14 days ahead</SelectItem>
                    <SelectItem value="30">30 days ahead</SelectItem>
                    <SelectItem value="60">60 days ahead</SelectItem>
                    <SelectItem value="90">90 days ahead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Minimum Notice</Label>
                <Select defaultValue="2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Average Table Duration</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="75">75 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>View schedule for specific date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Block Time Slot
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Clock className="w-4 h-4" />
                Set Special Hours
              </Button>
            </div>
          </CardContent>
        </Card>

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
