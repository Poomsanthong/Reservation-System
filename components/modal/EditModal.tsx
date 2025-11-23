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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Reservation } from "@/lib/types";
import { EditModalProps } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

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

const EditModal: React.FC<EditModalProps> = ({
  open,
  onOpenChange,
  booking,
  onSubmit,
}) => {
  const [form, setForm] = useState<Reservation>({} as Reservation);

  useEffect(() => {
    if (booking) {
      setForm(booking);
    }
  }, [booking]);

  if (!booking) return null;

  const handleChange = (key: keyof Reservation, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Reservation</DialogTitle>
          <DialogDescription className="text-xs">
            ID: {booking.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Guest Name">
              <Input
                value={form.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Field>

            <Field label="Email">
              <Input
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Field>

            <Field label="Phone">
              <Input
                value={form.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Field>

            <Field label="Party Size">
              <Input
                value={form.partySize?.toString() || ""}
                type="number"
                onChange={(e) =>
                  handleChange("partySize", parseInt(e.target.value))
                }
              />
            </Field>

            <Field label="Date">
              <Input
                value={form.reservation_date || ""}
                type="date"
                onChange={(e) =>
                  handleChange("reservation_date", e.target.value)
                }
              />
            </Field>

            <Field label="Time">
              <Input
                value={form.reservation_time?.slice(0, 5) || ""}
                type="time"
                onChange={(e) =>
                  handleChange("reservation_time", e.target.value)
                }
              />
            </Field>

            <Field label="Status">
              <Select
                value={form.status || "pending"}
                onValueChange={(val) => handleChange("status", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Notes">
              <Input
                value={form.note || ""}
                onChange={(e) => handleChange("note", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
