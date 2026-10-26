export type RestaurantSettings = {
  id: string;
  restaurant_id: string;
  auto_accept: boolean;
  waitlist_enabled: boolean;
  default_capacity: number;
  booking_interval: number;
  booking_window: number;
  min_notice_hours: number;
  avg_table_duration: number;
  max_daily_capacity: number | null;
  max_slot_capacity: number | null;
  created_at: string;
  updated_at: string;
};

export type UpdateRestaurantSettingsInput = Partial<RestaurantSettings> & {
  id: string;
};

export type BlackoutDate = {
  id?: string;
  date: string;
  reason: string | null;
  created_at: string;
};

export type OpeningData = {
  day_of_week: number;
  open_time: string;
  close_time: string;
  open: boolean;
};

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
