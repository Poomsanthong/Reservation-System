import { useEffect, useState } from "react";
import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/lib/server/calendar";
import { toSqlDate } from "@/lib/dateHelper";

export function useBlackoutDates() {
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [blockReason, setBlockReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Load
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
    loadBlackouts();
  }, []);

  // Block
  const blockDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    await addBlackoutDate(sqlDate, blockReason);
    await loadBlackouts();
    setBlockReason("");
  };

  // Unblock
  const unblockSelectedDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    await unblockDate(sqlDate);
    setBlackouts((prev) => prev.filter((b) => b.date !== sqlDate));
  };

  const isSelectedBlocked = () => {
    const sql = toSqlDate(selectedDate);
    return blackouts.find((b) => b.date === sql);
  };

  return {
    blackouts,
    selectedDate,
    setSelectedDate,
    blockReason,
    setBlockReason,
    blockDate,
    unblockSelectedDate,
    isSelectedBlocked,
    loading,
  };
}
