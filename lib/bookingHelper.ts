import type { ScheduleSlot } from "@/features/bookings/types";

type BookingLike = Pick<ScheduleSlot, "time" | "capacity"> & {
  waitlist?: number;
};

export function groupBookingsByTime(bookings: BookingLike[]): ScheduleSlot[] {
  const map = new Map<string, ScheduleSlot>();

  bookings.forEach((b) => {
    if (!map.has(b.time)) {
      map.set(b.time, {
        time: b.time,
        displayTime: b.time,
        booked: 0,
        capacity: b.capacity,
        status: "available",
        available: true,
        waitlist: b.waitlist || 0,
      });
    }

    const slot = map.get(b.time)!;
    slot.booked += 1;
    if (slot.booked >= slot.capacity) slot.status = "full";
    else if (slot.booked >= slot.capacity * 0.7) slot.status = "filling";
    slot.available = slot.status !== "full";
  });

  return Array.from(map.values());
}
