import { useEffect, useState } from "react";
import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/lib/server/calendar";
import { toSqlDate } from "@/lib/dateHelper";
import { BlackoutDate } from "@/lib/types";

export function useBlockoutDates() {
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
    loadBlackouts();
  }, []);

  const getBlackoutByDate = (date: Date) => {
    const sql = toSqlDate(date);
    return blackouts.find((b) => b.date === sql);
  };

  const blockDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    await addBlackoutDate(sqlDate, blockReason);
    await loadBlackouts();
    setBlockReason("");
  };

  const unblockSelectedDate = async () => {
    const sqlDate = toSqlDate(selectedDate);
    await unblockDate(sqlDate);
    setBlackouts((prev) => prev.filter((b) => b.date !== sqlDate));
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
