// lib/stats/dateHelpers.ts

export function getWeekRanges() {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;

  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - diffToMonday);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
  startOfLastWeek.setHours(0, 0, 0, 0);

  return { startOfThisWeek, startOfLastWeek };
}

export const toLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d); // <-- local date, no timezone issues
};

export const toSqlDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
