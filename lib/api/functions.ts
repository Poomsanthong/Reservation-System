import type {
  AvailabilityResponse,
  CreateReservationInput,
  DuplicateCheckResponse,
  Reservation,
  ScheduleSlot,
  UpdateReservationInput,
} from "@/features/bookings/types";
import type {
  MessageStatsResponse,
  MessageTemplate,
  RecentMessage,
} from "@/features/messages/types";
import { request } from "@/shared/api/client";

type CrudTable = "reservations" | "bookings" | "users" | "email_templates";

export async function get<T>(table: CrudTable) {
  const searchParams = new URLSearchParams({ table });
  return request<T>(`/api/crud/get?${searchParams.toString()}`);
}

export async function createReservation(data: CreateReservationInput) {
  return request<Reservation>("/api/crud/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "reservations",
      data,
    }),
  });
}

export async function updateBooking(
  id: Reservation["id"],
  updates: UpdateReservationInput,
) {
  return request<Reservation[]>("/api/crud/edit", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "reservations",
      id,
      data: updates,
    }),
  });
}

export async function updateTemplate(
  id: MessageTemplate["id"],
  updates: Pick<MessageTemplate, "subject" | "html">,
) {
  return request<{ success: true }>("/api/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });
}

export async function cancelBooking(
  id: Reservation["id"],
  status: Reservation["status"] = "cancelled",
) {
  return request<Reservation[]>("/api/crud/edit", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "reservations",
      id,
      data: { status },
    }),
  });
}

export async function deleteBooking(id: Reservation["id"]) {
  return request<{ deleted: Reservation["id"] }>("/api/crud/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "reservations",
      id,
    }),
  });
}

export async function checkDuplicate(date: string, time: string, name: string) {
  return request<DuplicateCheckResponse>("/api/reservations/check-duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, name }),
  });
}

export async function checkAvailability(date: string, time: string) {
  return request<AvailabilityResponse>("/api/reservations/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time }),
  });
}

export async function getSchedule(date: string) {
  const searchParams = new URLSearchParams({ date });
  return request<ScheduleSlot[]>(
    "/api/reservations/schedule?" + searchParams.toString(),
  );
}

export async function getMessageStats() {
  return request<MessageStatsResponse>("/api/messages/message-stats");
}

export async function getRecentMessages() {
  return request<RecentMessage[]>("/api/messages");
}

export async function getTemplates() {
  return request<MessageTemplate[]>("/api/templates");
}
