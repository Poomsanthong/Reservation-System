"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CancelModalProps } from "@/lib/types";

export default function CancelModal({
  open,
  onOpenChange,
  booking,
  onSubmit,
}: CancelModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Reservation</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this reservation?
            <br />
            <span className="font-medium">Guest: {booking.name}</span>
            <br />
            <span className="text-sm text-muted-foreground">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep Reservation
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              onSubmit((booking.status = "cancelled"), booking);
            }}
          >
            Cancel Reservation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
