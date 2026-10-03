export type OpeningHour = {
  id?: string;
  dayOfWeek: number;
  open: boolean;
  openTime: string;
  closeTime: string;
};

export type Hours = OpeningHour[];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Day = (typeof DAYS)[number];

export type OpeningHoursProps = {
  hours: Hours;
  onToggleDay: (day: Day) => void;
  onSetTime: (day: Day, field: "openTime" | "closeTime", value: string) => void;
};

export const DAY_TO_NUMBER: Record<Day, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const NUMBER_TO_DAY: Record<number, Day> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};
