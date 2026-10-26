import { request } from "@/shared/api/client";
import type {
  BlackoutDate,
  OpeningData,
  RestaurantSettings,
  UpdateRestaurantSettingsInput,
} from "@/features/restaurants/types";

export function getBlackoutDates() {
  return request<BlackoutDate[]>("/api/restaurants/blackout-dates");
}

export function addBlackoutDate(date: string, reason: string = "") {
  return request<BlackoutDate>("/api/restaurants/blackout-dates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, reason }),
  });
}

export function unblockDate(date: string) {
  return request<{ success: true }>("/api/restaurants/blackout-dates", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
}

export function getOpeningData() {
  return request<OpeningData[]>("/api/restaurants/opening-hours");
}

export function loadSettings() {
  return request<RestaurantSettings | null>("/api/restaurants/settings");
}

export function updateSettings(payload: UpdateRestaurantSettingsInput) {
  return request<RestaurantSettings>("/api/restaurants/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
