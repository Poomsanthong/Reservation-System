// Centralized API functions for frontend components to interact with backend routes.
// This file serves as a single source of truth for all API interactions, making it easier to maintain and update endpoints as needed.

export async function get(table: string, restaurantId?: string) {
  const searchParams = new URLSearchParams({ table });
  // Include the active restaurant so reservation reads can be filtered server-side.
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }

  const res = await fetch(`/api/crud/get?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function create(data: any) {
  const res = await fetch("/api/crud/create", {
    method: "POST",
    body: JSON.stringify({
      table: "reservations",
      data,
    }),
  });
  return res.json();
}

export async function updateBooking(id: any, updates: any) {
  const res = await fetch("/api/crud/edit", {
    method: "PATCH",
    body: JSON.stringify({
      table: "reservations",
      id,
      data: updates,
    }),
  });
  return res.json();
}

export async function updateTemplate(id: any, updates: any) {
  const res = await fetch("/api/crud/edit", {
    method: "PATCH",
    body: JSON.stringify({
      table: "email_templates",
      id,
      data: updates,
    }),
  });
  return res.json();
}

export async function cancelBooking(id: any, status: string) {
  const res = await fetch("/api/crud/edit", {
    method: "PATCH",
    body: JSON.stringify({
      table: "reservations",
      id,
      data: { status },
    }),
  });
  return res.json();
}

export async function deleteBooking(id: any) {
  const res = await fetch("/api/crud/delete", {
    method: "DELETE",
    body: JSON.stringify({
      table: "reservations",
      id,
    }),
  });
  return res.json();
}
export async function checkDuplicate(
  date: string,
  time: string,
  name: string,
  restaurantId?: string,
) {
  const res = await fetch("/api/reservations/check-duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, name, restaurantId }),
  });
  return res.json();
}

export async function checkAvailability(
  date: string,
  time: string,
  restaurantId?: string,
) {
  const res = await fetch("/api/reservations/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, restaurantId }),
  });
  if (!res.ok) throw new Error("Failed to check availability");
  return res.json();
}

export async function getSchedule(date: string, restaurantId?: string) {
  const searchParams = new URLSearchParams({ date });
  // Schedule data is restaurant-specific, so pass the restaurant when available.
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }

  const res = await fetch(
    "/api/reservations/schedule?" + searchParams.toString(),
  );

  if (!res.ok) {
    throw new Error("Failed to load schedule");
  }

  return res.json();
}

export async function getMessageStats(restaurantId?: string) {
  const searchParams = new URLSearchParams();
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }
  const res = await fetch(
    "/api/messages/message-stats?" + searchParams.toString(),
  );
  if (!res.ok) {
    throw new Error("Failed to load message stats");
  }
  return res.json();
}

export async function getRecentMessages(restaurantId?: string) {
  const searchParams = new URLSearchParams();
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }

  const res = await fetch("/api/messages?" + searchParams.toString());
  if (!res.ok) {
    throw new Error("Failed to load recent messages");
  }
  return res.json();
}

export async function getTemplates(restaurantId?: string) {
  const searchParams = new URLSearchParams();
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }

  const res = await fetch("/api/templates?" + searchParams.toString());
  if (!res.ok) {
    throw new Error("Failed to load templates");
  }
  return res.json();
}
