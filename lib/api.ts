export async function handleClick(action: string, table: string, payload: any) {
  const url = `/api/crud/${action}`; // points to the correct action folder

  const body = { table, ...payload }; // include table name in payload

  const res = await fetch(url, {
    method: "POST", // all dynamic action routes accept POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}
