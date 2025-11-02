const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// Generic authed fetch (token must be provided)
export async function authedFetch(path, opts = {}, token) {
  const headers = {
    ...(opts.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const r = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!r.ok) throw new Error(`Request failed: ${r.status}`);
  return r.json();
}

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

export async function submitChecklist(payload, token) {
  return authedFetch(
    "/checklist",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    token
  );
}
