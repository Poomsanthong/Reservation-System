// Centralized API functions for frontend components to interact with backend routes.
// This file serves as a single source of truth for all API interactions, making it easier to maintain and update endpoints as needed.

export async function get(table: string, slug?: string) {
  const searchParams = new URLSearchParams({ table });
  if (slug) {
    searchParams.set("slug", slug);
  }

  const res = await fetch(`/api/crud/get?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function create(data: any, slug?: string) {
  const res = await fetch("/api/crud/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "reservations",
      data,
      slug,
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
  slug?: string,
) {
  const res = await fetch("/api/reservations/check-duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, name, slug }),
  });
  return res.json();
}

export async function checkAvailability(
  date: string,
  time: string,
  slug?: string,
) {
  const res = await fetch("/api/reservations/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, slug }),
  });
  if (!res.ok) throw new Error("Failed to check availability");
  return res.json();
}

export async function getSchedule(date: string, slug?: string) {
  const searchParams = new URLSearchParams({ date });
  if (slug) {
    searchParams.set("slug", slug);
  }

  const res = await fetch(
    "/api/reservations/schedule?" + searchParams.toString(),
  );

  if (!res.ok) {
    throw new Error("Failed to load schedule");
  }

  return res.json();
}

export async function getMessageStats(slug?: string) {
  const searchParams = new URLSearchParams();
  if (slug) {
    searchParams.set("slug", slug);
  }
  const res = await fetch(
    "/api/messages/message-stats?" + searchParams.toString(),
  );
  if (!res.ok) {
    throw new Error("Failed to load message stats");
  }
  return res.json();
}

export async function getRecentMessages(slug?: string) {
  const searchParams = new URLSearchParams();
  if (slug) {
    searchParams.set("slug", slug);
  }

  const res = await fetch("/api/messages?" + searchParams.toString());
  if (!res.ok) {
    throw new Error("Failed to load recent messages");
  }
  return res.json();
}

export async function getTemplates(slug?: string) {
  const searchParams = new URLSearchParams();
  if (slug) {
    searchParams.set("slug", slug);
  }

  const res = await fetch("/api/templates?" + searchParams.toString());
  if (!res.ok) {
    throw new Error("Failed to load templates");
  }
  return res.json();
}
