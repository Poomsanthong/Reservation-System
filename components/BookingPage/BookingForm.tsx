import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TimeSlotGrid from "@/components/BookingPage/TimeSlotGrid";
import GuestDetails from "@/components/BookingPage/GuestDetails";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PartysizeTab from "./PartySizeTab";
import { useBlockoutDates } from "@/lib/hooks/useBlockDates";

export default function BookingForm({ form }: { form: any }) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const { blackouts } = useBlockoutDates(); // to disable blocked dates on calendar;
  async function handleSubmit() {
    setSubmitError("");
    if (submitLoading) return;
    setSubmitLoading(true);
    try {
      // form.submit should throw on error (see lib/api/functions.ts improvements)
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
    <Card className="w-full max-w-md mx-auto">
      <PartysizeTab form={form} />
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Calendar */}
        <div className="space-y-2">
          <Label>Date</Label>
          <div className="border rounded-lg p-4 flex justify-center">
            <Calendar
              mode="single"
              fixedWeeks
              selected={form.fields.date}
              onSelect={(d) => form.updateField("date", d)}
              disabled={(d) =>
                d < new Date() ||
                blackouts.some(
                  (b) => new Date(b.date).toDateString() === d.toDateString(),
                )
              }
              className="rounded-md w-full max-w-md"
            />
          </div>
        </div>
        <TimeSlotGrid form={form} />
        <GuestDetails form={form} />
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
  );
}
