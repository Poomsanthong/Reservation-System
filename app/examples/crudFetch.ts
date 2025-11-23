// create
await fetch("/api/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

// read list
const list = await fetch("/api/reservations").then((r) => r.json());

// read one
const one = await fetch(`/api/reservations/${id}`).then((r) => r.json());

// update
await fetch(`/api/reservations/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "confirmed" }),
});

// delete
await fetch(`/api/reservations/${id}`, { method: "DELETE" });
