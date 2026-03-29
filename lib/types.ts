export type Reservation = {
  id?: string;
  restaurant_id?: string;
  name: string;
  phone: string;
  email?: string | null;
  reservation_date: string; // YYYY-MM-DD
  reservation_time: string; // HH:MM:SS
  partysize: number;
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
  date: string;
  reason: string | null;
  created_at: string;
};

export type Setting = {
  id?: string;
  key: string;
  value: string;
};

export type ViewDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Reservation | null;
};

export type EditModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Reservation | null;
  onSubmit: (payload: Reservation) => Promise<void>;
};

export type CancelModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Reservation | null;
  onSubmit: (status: string, payload: Reservation) => void;
};

export type statsDataType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  change: string;
  trend: string;
};
export type StatsCardPropsType = {
  totalBookings: number | null;
  totalGuests: number | null;
  previousTotalBookings: number | null;
  previousTotalGuests: number | null;
};
export type ScheduleSlot = {
  time: string;
  booked: number;
  capacity: number;
  status: "available" | "filling" | "full";
  waitlist?: number;
};
