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
