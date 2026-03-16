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

export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;

  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

  return date.toLocaleDateString();
};
