import { useEffect, useState } from "react";

import { useBlockoutDates } from "@/lib/hooks/useBlockDates";
import { getOpeningData } from "../server/getRestaurantSettings";
import { NUMBER_TO_DAY } from "@/features/openingsHours/types";
export function useSlotAvailability() {
  const { blackouts } = useBlockoutDates();
  const [openingData, setOpeningData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const loadOpeningData = async () => {
    try {
      setLoading(true);
      const data = await getOpeningData();
      setOpeningData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOpeningData();
  }, []);

  const getOpeningByDay = (dayOfWeek: number) => {
    return openingData.find((day) => day.day_of_week === dayOfWeek);
  };

  const isRestaurantOpen = (date: Date) => {
    const dayOfWeek = date.getDay();
    const opening = getOpeningByDay(dayOfWeek);
    return !!opening?.open;
  };

  const getOpeningHours = (date: Date) => {
    const dayOfWeek = date.getDay();
    const opening = getOpeningByDay(dayOfWeek);
    const dayName = NUMBER_TO_DAY[dayOfWeek];
    if (opening) {
      return {
        openTime: opening.open_time,
        closeTime: opening.close_time,
        isOpen: opening.open,
        dayName: dayName,
      };
    }
    return null;
  };

  const isBlocked = (date: Date) => {
    const sqlDate = date.toISOString().split("T")[0];
    return blackouts.some((b) => b.date === sqlDate);
  };

  const isSlotAvailable = (date: Date) => {
    return isRestaurantOpen(date) && !isBlocked(date);
  };

  return {
    isSlotAvailable,
  };
}
