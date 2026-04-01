import { useEffect, useState } from "react";
import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/lib/server/calendar";
import { toSqlDate } from "@/lib/dateHelper";
import { BlackoutDate } from "@/lib/types";
import { useDateStore } from "@/store/useSelectedData";

export function useBlockoutDates() {
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const { selectedDate, setSelectedDate } = useDateStore();
  const [blockReason, setBlockReason] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBlackouts = async () => {
    try {
      setLoading(true);
      const data = await getBlackoutDates();
      setBlackouts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBlackouts();
  }, []);

  const getBlackoutByDate = (date: Date) => {
    const sql = toSqlDate(date);
    return blackouts.find((b) => b.date === sql);
  };

  const blockDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    try {
      await addBlackoutDate(sqlDate, blockReason);
      await loadBlackouts();
      setBlockReason("");
    } catch (error) {
      console.error("Failed to block date:", error);
    }
  };

  const unblockSelectedDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    const previousBlackouts = blackouts;
    setBlackouts((prev) => prev.filter((b) => b.date !== sqlDate));
    try {
      await unblockDate(sqlDate);
    } catch (error) {
      console.error("Failed to unblock date:", error);
      setBlackouts(previousBlackouts); // Rollback on failure
      // Handle error (e.g., show toast notification)
    }
  };
  return {
    blackouts,
    selectedDate,
    setSelectedDate,
    blockReason,
    setBlockReason,
    blockDate,
    unblockSelectedDate,
    getBlackoutByDate,
    loading,
  };
}
