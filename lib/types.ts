export {};

declare global {
  type Reservation = {
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

  type OpeningHour = {
    id?: string;
    day_of_week: number; // 0..6
    open_time: string; // HH:MM:SS
    close_time: string; // HH:MM:SS
  };

  type BlackoutDate = {
    id?: string;
    date: string; // YYYY-MM-DD
    reason?: string | null;
  };

  type Setting = {
    id?: string;
    key: string;
    value: string;
  };

  type ViewDetailsModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Reservation | null;
  };

  type EditModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Reservation | null;
    onSubmit: (payload: Reservation) => Promise<void>;
  };

  type CancelModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Reservation | null;
    onSubmit: (status: string, payload: Reservation) => void;
  };

  type statsDataType = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
  };
}
