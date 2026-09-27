import { useState } from "react";
import { DayHours } from "../types";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Hours = Record<string, DayHours>;

const buildDefaultHours = (): Hours =>
  Object.fromEntries(
    DAYS.map((day, index) => [
      day,
      {
        open: index < 5,
        from: "09:00",
        to: "22:00",
      },
    ]),
  );

export function useOpeningHours() {
  const [hours, setHours] = useState<Hours>(buildDefaultHours);

  const toggleDay = (day: string) => {
    setHours((current) => ({
      ...current,
      [day]: {
        ...current[day],
        open: !current[day].open,
      },
    }));
  };

  const setTime = (day: string, field: "from" | "to", value: string) => {
    setHours((current) => ({
      ...current,
      [day]: {
        ...current[day],
        [field]: value,
      },
    }));
  };

  return {
    hours,
    toggleDay,
    setTime,
  };
}
