export type BookingStatus = "confirmed" | "pending" | "waitlist" | "cancelled";

// Full reservation record as it exists once it comes back from the database/API.
export type Reservation = {
  id: string;
  restaurant_id: string;
  name: string;
  phone: string;
  email: string | null;
  reservation_date: string;
  reservation_time: string;
  restaurant_name: string;

  partysize: number;
  status: BookingStatus;
  note: string | null;
  created_at: string;
};

export type CreateReservationInput = {
  name: string;
  phone: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  partysize: number;
  note: string;
};

export type UpdateReservationInput = Partial<
  Pick<
    Reservation,
    | "name"
    | "phone"
    | "email"
    | "reservation_date"
    | "reservation_time"
    | "partysize"
    | "status"
    | "note"
  >
>;

// Client-side booking form state is intentionally separate from the API payload.
// This lets the UI store rich values like `Date` while the API stays string-based.
export type BookingFormFields = {
  date: Date;
  selectedTime: string;
  partysize: `${number}`;
  name: string;
  email: string;
  phone: string;
  note: string;
};

export type BookingFormController = {
  fields: BookingFormFields;
  updateField: <K extends keyof BookingFormFields>(
    key: K,
    value: BookingFormFields[K],
  ) => void;
  submit: () => Promise<void>;
  showConfirmation: boolean;
};

export type ScheduleSlotStatus = "available" | "filling" | "full";

// Schedule slots are reused by both the public booking page and the admin view.
export type ScheduleSlot = {
  time: string;
  displayTime: string;
  booked: number;
  capacity: number;
  status: ScheduleSlotStatus;
  available: boolean;
  waitlist?: number;
};

export type DuplicateCheckResponse = {
  exists: boolean;
};

export type AvailabilityResponse = {
  available: boolean;
  remainingTables: number;
  bookedCount: number;
};

export type BookingModalType = "view" | "edit" | "cancel";
