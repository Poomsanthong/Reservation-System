export async function get() {
  const res = await fetch("/api/crud/get?table=reservations");
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
  alert("Reservation saved!");
  return res.json();
}

export async function updateBooking(id: any, updates: any) {
  const res = await fetch("/api/crud/update", {
    method: "PATCH",
    body: JSON.stringify({
      table: "reservations",
      id,
      data: updates,
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
