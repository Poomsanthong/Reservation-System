"use server";
import { getDailyBookings } from "@/lib/server/getBooking";

const TIMESLOTS = [
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
];
const CAPACITY = 8;

export async function getSchedule(date: string) {
  const bookings = await getDailyBookings(date);
  return TIMESLOTS.map((time) => {
    const booked = bookings.filter((b) => b.reservation_time === time).length;
    let status: "available" | "filling" | "full" = "available";
    if (booked >= CAPACITY) status = "full";
    else if (booked >= CAPACITY - 2) status = "filling";
    console.log(
      "DB booking times:",
      bookings.map((b) => b.reservation_date + " " + b.reservation_time),
    );
    return {
      time, // "HH:MM:SS" format for backend
      displayTime: formatTo12Hour(time), // "h:mm AM/PM" for frontend
      booked,
      capacity: CAPACITY,
      status,
      available: status !== "full",
    };
  });
}

function formatTo12Hour(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
