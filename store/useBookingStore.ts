import { create } from "zustand";
import type { Reservation } from "@/features/bookings/types";

interface BookingState {
  selected: Reservation | null;
  setSelected: (data: Reservation | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selected: null,
  setSelected: (data) => set({ selected: data }),
}));
