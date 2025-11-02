const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getPreview() {
  const r = await fetch(`${API_BASE}/metrics/preview`, { cache: "no-store" });
  if (!r.ok) throw new Error("preview failed");
  return r.json();
}

export async function getToday() {
  const r = await fetch(`${API_BASE}/checklist/today`, { cache: "no-store" });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error("today failed");
  return r.json();
}

export async function submitChecklist(payload) {
  const r = await fetch(`${API_BASE}/checklist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error("submit failed");
  return r.json();
}
