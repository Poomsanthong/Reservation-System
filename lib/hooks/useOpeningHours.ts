import { useState } from "react";
import { Day, Hours, DAYS, DAY_TO_NUMBER } from "../types";

const buildDefaultHours = (): Hours =>
  DAYS.map((day, index) => ({
    dayOfWeek: DAY_TO_NUMBER[day],
    open: index < 5,
    openTime: "09:00",
    closeTime: "22:00",
  }));

export function useOpeningHours() {
  const [hours, setHours] = useState<Hours>(buildDefaultHours);

  const toggleDay = (day: Day) => {
    const dayOfWeek = DAY_TO_NUMBER[day];

    setHours((current) =>
      current.map((hour) =>
        hour.dayOfWeek === dayOfWeek ? { ...hour, open: !hour.open } : hour,
      ),
    );
  };

  const setTime = (
    day: Day,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    const dayOfWeek = DAY_TO_NUMBER[day];
    setHours((current) =>
      current.map((hour) =>
        hour.dayOfWeek === dayOfWeek ? { ...hour, [field]: value } : hour,
      ),
    );
  };

  return {
    hours,
    toggleDay,
    setTime,
  };
}
