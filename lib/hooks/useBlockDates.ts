import { useEffect, useState } from "react";
import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/lib/server/calendar";
import { toSqlDate } from "@/lib/dateHelper";
import { BlackoutDate } from "@/lib/types";
import { useDateStore } from "@/store/useSelectedData";
import { useTenantSlug } from "@/lib/hooks/useTenantSlug";

export function useBlockoutDates() {
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const { selectedDate, setSelectedDate } = useDateStore();
  const [blockReason, setBlockReason] = useState("");
  const [loading, setLoading] = useState(false);
  const slug = useTenantSlug();

  const loadBlackouts = async () => {
    if (!slug) {
      setBlackouts([]);
      return;
    }

    try {
      setLoading(true);
      const data = await getBlackoutDates(slug);
      setBlackouts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBlackouts();
  }, [slug]);

  const getBlackoutByDate = (date: Date) => {
    const sql = toSqlDate(date);
    return blackouts.find((b) => b.date === sql);
  };

  const blockDate = async () => {
    if (!slug) return;

    const sqlDate = toSqlDate(selectedDate);
    await addBlackoutDate(sqlDate, blockReason, slug);
    await loadBlackouts();
    setBlockReason("");
  };

  const unblockSelectedDate = async () => {
    if (!slug) return;

    const sqlDate = toSqlDate(selectedDate);
    await unblockDate(sqlDate, slug);
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
