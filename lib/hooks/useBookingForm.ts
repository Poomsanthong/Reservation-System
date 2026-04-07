// lib/hooks/useBookingForm.ts
"use client";

import { useState } from "react";
import { useToastStore } from "@/store/useToastStore";
import { checkDuplicate, createReservation } from "@/lib/api/functions";
import type {
  BookingFormController,
  BookingFormFields,
  CreateReservationInput,
} from "@/features/bookings/types";

const initialFields = (): BookingFormFields => ({
  date: new Date(),
  selectedTime: "",
  partysize: "2",
  name: "",
  email: "",
  phone: "",
  note: "",
});

export function useBookingForm(): BookingFormController {
  const toastStore = useToastStore();

  const [fields, setFields] = useState<BookingFormFields>(initialFields);

  const [showConfirmation, setShowConfirmation] = useState(false);

  function updateField<K extends keyof BookingFormFields>(
    key: K,
    value: BookingFormFields[K],
  ) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  // Keep basic UX validation in the hook so the page components stay mostly presentational.
  function validate(): boolean {
    if (!fields.name.trim()) {
      toastStore.error("Name is required");
      return false;
    }
    if (!fields.email.trim()) {
      toastStore.error("Email is required");
      return false;
    }
    if (!fields.phone.trim()) {
      toastStore.error("Phone number is required");
      return false;
    }
    if (!fields.selectedTime) {
      toastStore.error("Please select a time");
      return false;
    }
    if (!fields.date) {
      toastStore.error("Please select a date");
      return false;
    }

    return true;
  }

  function buildPayload(): CreateReservationInput {
    return {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      reservation_date: fields.date.toISOString().split("T")[0],
      reservation_time: fields.selectedTime,
      partysize: parseInt(fields.partysize),
      note: fields.note || "",
    };
  }

  async function submit() {
    if (!validate()) return;

    // Prevent accidental double-bookings before we create the reservation.
    const duplicateCheck = await checkDuplicate(
      fields.date.toISOString().split("T")[0],
      fields.selectedTime,
      fields.name,
    );

    if (duplicateCheck.exists) {
      toastStore.error(
        "Duplicate booking detected for this date, time, and name.",
      );
      return;
    }

    try {
      const payload = buildPayload();
      await createReservation(payload);

      toastStore.success("Booking confirmed!");

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000);

      reset();
    } catch (error) {
      toastStore.error(
        error instanceof Error ? error.message : "Unexpected error",
      );
    }
  }

  function reset() {
    setFields(initialFields());
  }

  return {
    fields,
    updateField,
    submit,
    showConfirmation,
  };
}
