"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  MapPin,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import { get } from "@/lib/api/funtions";
import { useBookingForm } from "@/lib/hooks/useBookingForm";

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

export default function BookingPage() {
  const form = useBookingForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  async function loadBookings() {
    try {
      const data = await get("reservations");
      console.log("Loaded bookings:", data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleSubmit() {
    setSubmitError("");
    if (submitLoading) return;
    setSubmitLoading(true);
    try {
      // form.submit should throw on error (see lib/api/funtions.ts improvements)
      await form.submit();
      // success state is handled inside the hook (form.showConfirmation)
    } catch (err: any) {
      // surface a readable message
      const msg =
        typeof err === "string"
          ? err
          : err?.message ||
            (err && typeof err === "object"
              ? JSON.stringify(err)
              : "Unknown error");
      console.error("Booking failed:", err);
      setSubmitError(msg);
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700">
            AI-Powered Smart Booking
          </span>
        </div>
        <h2 className="text-slate-900 mb-2">Reserve Your Table</h2>
        <p className="text-slate-600">
          Find the perfect time with AI recommendations
        </p>
      </div>

      {form.showConfirmation && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-900">Booking confirmed!</p>
            <p className="text-sm text-green-700">
              Confirmation sent to your email.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* FORM */}
        <div className="lg:col-span-2 space-y-6">
          {/* Restaurant Card */}
          <Card>
            <CardContent className="p-6 flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-slate-900 mb-1">The Gourmet Kitchen</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      Downtown Manhattan, NY
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-slate-900">4.8</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3">
                  Contemporary cuisine with seasonal ingredients.
                </p>

                <div className="flex gap-2">
                  <Badge variant="secondary">Fine Dining</Badge>
                  <Badge variant="secondary">Romantic</Badge>
                  <Badge variant="secondary">Live Music</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your reservation details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Party Size */}
              <div className="space-y-2">
                <Label>Party Size</Label>
                <Select
                  value={form.fields.partySize}
                  onValueChange={(value) =>
                    form.updateField("partySize", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar */}
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="border rounded-lg p-4 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={form.fields.date}
                    onSelect={(d) => form.updateField("date", d)}
                    disabled={(d) => d < new Date()}
                    className="rounded-md w-full max-w-md"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <Label>Available Times</Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        form.fields.selectedTime === slot.time
                          ? "default"
                          : "outline"
                      }
                      disabled={!slot.available}
                      onClick={() =>
                        form.updateField("selectedTime", slot.time)
                      }
                      className="text-xs"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={form.fields.name}
                    onChange={(e) => form.updateField("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.fields.email}
                    onChange={(e) => form.updateField("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.fields.phone}
                    onChange={(e) => form.updateField("phone", e.target.value)}
                    placeholder="+1 555 000 0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Special Requests</Label>
                  <Input
                    id="note"
                    placeholder="Window seat, birthday..."
                    value={form.fields.note}
                    onChange={(e) => form.updateField("note", e.target.value)}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={
                  !form.fields.selectedTime ||
                  !form.fields.date ||
                  !form.fields.name ||
                  !form.fields.email ||
                  submitLoading
                }
                onClick={handleSubmit}
              >
                {submitLoading ? "Booking..." : "Confirm Reservation"}
              </Button>

              {submitError && (
                <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                  {submitError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Date</span>
                <span className="text-slate-900">
                  {form.fields.date
                    ? form.fields.date.toLocaleDateString()
                    : "Not selected"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Time</span>
                <span className="text-slate-900">
                  {form.fields.selectedTime || "Not selected"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Guests</span>
                <span className="text-slate-900">{form.fields.partySize}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
