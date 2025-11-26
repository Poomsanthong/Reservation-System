// lib/hooks/useBookingForm.ts
"use client";

import { useState } from "react";
import { useToastStore } from "@/store/useToastStore";
import { checkDuplicate, create, get } from "@/lib/api/funtions";

export function useBookingForm() {
  const toastStore = useToastStore();

  // ---- FORM STATE ----
  const [fields, setFields] = useState({
    date: new Date(),
    selectedTime: "",
    partySize: "2",
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  // ---- UPDATE HELPERS ----
  function updateField(key: string, value: any) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  // ---- VALIDATION ----
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

  // ---- BUILD PAYLOAD ----
  function buildPayload(): Reservation {
    return {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      reservation_date: fields.date.toISOString().split("T")[0],
      reservation_time: fields.selectedTime,
      partySize: parseInt(fields.partySize),
      note: fields.note || "",
    };
  }

  // ---- SUBMIT HANDLER ----
  async function submit() {
    // 1.VALIDATE
    if (!validate()) return;

    // 2. CHECK DUPLICATES
    const duplicateCheck = await checkDuplicate(
      fields.date.toISOString().split("T")[0],
      fields.selectedTime,
      fields.name
    );

    // handle API load failure
    if (duplicateCheck.error) {
      toastStore.error(
        duplicateCheck.error || "Failed to check duplicate bookings."
      );
      return;
    }

    // is duplicate?
    if (duplicateCheck.exists) {
      toastStore.error(
        "Duplicate booking detected for this date, time, and name."
      );
      return;
    } // 3.BUILD PAYLOAD & SUBMIT
    try {
      const payload = buildPayload();
      const { error } = await create(payload);

      if (error) {
        toastStore.error(error.message || "Booking failed");
        return;
      }

      toastStore.success("Booking confirmed!");

      await get("reservations"); // optional: reload bookings

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000);

      reset();
    } catch (err: any) {
      toastStore.error(err?.message || "Unexpected error");
    }
  }

  // ---- RESET FORM ----
  function reset() {
    setFields({
      date: new Date(),
      selectedTime: "",
      partySize: "2",
      name: "",
      email: "",
      phone: "",
      note: "",
    });
  }

  return {
    fields,
    updateField,
    submit,
    showConfirmation,
  };
}
