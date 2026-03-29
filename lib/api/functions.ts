export async function get(table: string) {
  const res = await fetch(`/api/crud/get?table=${table}`);

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

  if (!res.ok) {
    throw new Error("Failed to check availability");
  }

  return res.json();
}

export async function getSchedule(date: string, restaurantId?: string) {
  const searchParams = new URLSearchParams({ date });
  if (restaurantId) {
    searchParams.set("restaurantId", restaurantId);
  }

  const res = await fetch("/api/reservations/schedule?" + searchParams);

  if (!res.ok) {
    throw new Error("Failed to load schedule");
  }

  return res.json();
}

export async function getMessageStats() {
  const res = await fetch("/api/messages/message-stats");
  if (!res.ok) {
    throw new Error("Failed to load message stats");
  }
  return res.json();
}

export async function getRecentMessages() {
  const res = await fetch("/api/messages");
  if (!res.ok) {
    throw new Error("Failed to load recent messages");
  }

  return res.json();
}
