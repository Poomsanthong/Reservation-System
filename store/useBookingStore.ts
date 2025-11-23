import { create } from "zustand";

interface BookingState {
  selected: any | null;
  setSelected: (data: any | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selected: null,
  setSelected: (data) => set({ selected: data }),
}));
