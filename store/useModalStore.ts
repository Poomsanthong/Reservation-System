// /store/useModalStore.ts
// This store manages the state of the booking modals, ensuring that only one modal can be open at a time and that the payload is correctly typed based on the modal type.
import { create } from "zustand";
import type { BookingModalType, Reservation } from "@/features/bookings/types";

type ClosedModalState = {
  open: false;
  type: null;
  payload: null;
};

type OpenModalState = {
  open: true;
  type: BookingModalType;
  payload: Reservation;
};

// Discriminated modal state keeps the payload typed whenever a modal is open.
type ModalState = ClosedModalState | OpenModalState;

type ModalStore = ModalState & {
  openModal: (type: BookingModalType, payload: Reservation) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  type: null,
  payload: null,

  openModal: (type, payload) => set({ open: true, type, payload }),

  closeModal: () => set({ open: false, type: null, payload: null }),
}));
