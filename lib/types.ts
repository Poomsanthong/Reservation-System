export type Reservation = {
  id?: string;
  name: string;
  phone: string;
  email?: string | null;
  reservation_date: string; // YYYY-MM-DD
  reservation_time: string; // HH:MM:SS
  partySize: number;
  status?: "confirmed" | "cancelled";
  note?: string | null;
  created_at?: string;
};

export type OpeningHour = {
  id?: string;
  day_of_week: number; // 0..6
  open_time: string; // HH:MM:SS
  close_time: string; // HH:MM:SS
};

export type BlackoutDate = {
  id?: string;
  date: string; // YYYY-MM-DD
  reason?: string | null;
};

export type Setting = {
  id?: string;
  key: string;
  value: string;
};
