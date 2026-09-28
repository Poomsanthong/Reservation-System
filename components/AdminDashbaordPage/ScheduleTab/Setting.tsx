"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Settings, Save } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/lib/hooks/useSettings";
const Setting = () => {
  const { settings, loading, save } = useSettings();

  // Initialize state variables with default values from restaurantSettings or fallback values
  const [autoAccept, setAutoAccept] = useState<boolean>(
    settings?.auto_accept || false,
  );
  const [waitlistEnabled, setWaitlistEnabled] = useState<boolean>(
    settings?.waitlist_enabled ?? true,
  );
  const [default_capacity, setDefault_capacity] = useState(
    settings?.default_capacity?.toString() ?? "8",
  );

  const [bookingWindow, setBookingWindow] = useState(
    settings?.booking_window?.toString() ?? "60",
  );

  const [minNoticeHours, setMinNoticeHours] = useState(
    settings?.min_notice_hours?.toString() ?? "2",
  );

  const [reservationDuration, setReservationDuration] = useState(
    settings?.avg_table_duration?.toString() ?? "90",
  );

  const handleSaveChanges = async () => {
    await save({
      auto_accept: autoAccept,
      waitlist_enabled: waitlistEnabled,
      default_capacity: parseInt(default_capacity, 10),
      booking_window: parseInt(bookingWindow, 10),
      min_notice_hours: parseInt(minNoticeHours, 10),
      avg_table_duration: parseInt(reservationDuration, 10),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
                <Switch
                  checked={autoAccept}
                  onCheckedChange={setAutoAccept}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-400"
                />
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
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label>Default Reservation Capacity</Label>
                <Select
                  defaultValue={default_capacity}
                  onValueChange={setDefault_capacity}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                    <SelectItem value="8">8 Guests</SelectItem>
                    <SelectItem value="10">10 Guests</SelectItem>
                    <SelectItem value="12">12 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timing Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Window</Label>
                <Select
                  defaultValue={bookingWindow}
                  onValueChange={setBookingWindow}
                >
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
                <Select
                  defaultValue={minNoticeHours}
                  onValueChange={setMinNoticeHours}
                >
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
                <Label>Average Reservation Duration</Label>
                <Select
                  defaultValue={reservationDuration}
                  onValueChange={setReservationDuration}
                >
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
          <Button
            onClick={handleSaveChanges}
            variant="outline"
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
