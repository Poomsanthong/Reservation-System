export type DayHours = {
  id?: string;
  open: boolean;
  from: string;
  to: string;
};

export type Hours = Record<string, DayHours>;
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Day = (typeof DAYS)[number];

export type OpeningHoursProps = {
  hours: Hours;
  onToggleDay: (day: Day) => void;
  onSetTime: (day: Day, field: "from" | "to", value: string) => void;
};
