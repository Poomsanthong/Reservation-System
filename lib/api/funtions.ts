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
export async function checkDuplicate(date: string, time: string, name: string) {
  const res = await fetch("/api/reservations/check-duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, name }),
  });
  return res.json();
}
