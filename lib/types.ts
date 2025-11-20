export type Reservation = {
  id?: string;
  name: string;
  phone: string;
  email?: string | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  people: number;
  status?: "confirmed" | "cancelled";
  notes?: string | null;
  created_at?: string;
};

export type OpeningHour = {
  id?: string;
  day_of_week: number; // 0..6
  open_time: string; // HH:MM:SS
  close_time: string; // HH:MM:SS
};
