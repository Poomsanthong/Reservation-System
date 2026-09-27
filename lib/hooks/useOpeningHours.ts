import { useState } from "react";
import { Day, Hours, DAYS } from "../types";

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
  ) as Hours;

export function useOpeningHours() {
  const [hours, setHours] = useState<Hours>(buildDefaultHours);

  const toggleDay = (day: Day) => {
    setHours((current) => ({
      ...current,
      [day]: {
        ...current[day],
        open: !current[day].open,
      },
    }));
  };

  const setTime = (day: Day, field: "from" | "to", value: string) => {
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
