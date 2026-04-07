export type {
  AvailabilityResponse,
  BookingFormController,
  BookingFormFields,
  BookingModalType,
  BookingStatus,
  CreateReservationInput,
  DuplicateCheckResponse,
  Reservation,
  ScheduleSlot,
  UpdateReservationInput,
} from "@/features/bookings/types";

export type { MessageStatsResponse, MessageTemplate, RecentMessage } from "@/features/messages/types";

export type { RestaurantSettings, UpdateRestaurantSettingsInput } from "@/features/settings/types";

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
