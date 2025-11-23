// /store/useToastStore.ts
import { create } from "zustand";
import { toast } from "sonner";

interface ToastStore {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

export const useToastStore = create<ToastStore>(() => ({
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
}));
