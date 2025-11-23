import { create } from "zustand";

interface ModalStore {
  open: boolean;
  type: null | "view" | "edit" | "cancel";
  payload: any;

  openModal: (type: ModalStore["type"], payload?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: false,
  type: null,
  payload: null,

  openModal: (type, payload = null) =>
    set({
      open: true,
      type,
      payload,
    }),

  closeModal: () =>
    set({
      open: false,
      type: null,
      payload: null,
    }),
}));
