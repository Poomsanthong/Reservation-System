export function groupBookingsByTime(bookings: any[]): ScheduleSlot[] {
  // group bookings by time slot
  const map = new Map<string, ScheduleSlot>();

  bookings.forEach((b) => {
    if (!map.has(b.time)) {
      map.set(b.time, {
        time: b.time,
        booked: 0,
        capacity: b.capacity,
        status: "available",
        waitlist: b.waitlist || 0,
      });
    }

    const slot = map.get(b.time)!;
    slot.booked += 1; // or use b.quantity if stored
    // update status
    if (slot.booked >= slot.capacity) slot.status = "full";
    else if (slot.booked >= slot.capacity * 0.7) slot.status = "filling";
  });

  return Array.from(map.values());
}
