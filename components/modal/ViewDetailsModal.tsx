"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ViewDetailsModalProps } from "@/lib/types";

const labelCls =
  "text-xs font-medium uppercase tracking-wide text-muted-foreground";
const valueCls = "text-sm font-medium text-slate-900";

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="space-y-1">
    <div className={labelCls}>{label}</div>
    <div className={valueCls}>{children}</div>
  </div>
);

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  open,
  onOpenChange,
  booking,
}) => {
  if (!booking) return null;

  const formattedDate = (() => {
    try {
      return new Date(booking.reservation_date).toLocaleDateString();
    } catch {
      return booking.reservation_date;
    }
  })();

  const formattedTime = booking.reservation_time
    ? booking.reservation_time.slice(0, 5)
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
          <DialogDescription className="text-xs">
            ID: {booking.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6   ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Guest Name">{booking.name}</Field>
            <Field label="Email">{booking.email}</Field>
            <Field label="Phone">{booking.phone}</Field>
            <Field label="Party Size">{booking.partySize} guests</Field>
            <Field label="Date">{formattedDate}</Field>
            <Field label="Time">{formattedTime}</Field>
            <Field label="Status">
              <Badge>{booking.status}</Badge>
            </Field>
            <Field label="Notes">
              {booking.note ? (
                booking.note
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
            </Field>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
