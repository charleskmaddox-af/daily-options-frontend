import DailyForm from "@/components/DailyForm";
import { getPreview } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";   // ✅ use the server import here

export default async function Page() {
  const { userId } = auth(); // works server-side with the above import

  // Optional: redirect unauthenticated users
  if (!userId) {
    return (
      <div className="container">
        <h1>Please sign in to access your dashboard.</h1>
        <p><a href="/sign-in">Go to Sign In</a></p>
      </div>
    );
  }

  // Fetch server-side once to render KPIs fast
  let preview = { open_csp_count: 0, cash_deployed_pct: 0, any_over_50pct_returned: false };
  try {
    preview = await getPreview();
  } catch (_) {
    console.warn("Could not load metrics preview");
  }

  return (
    <div className="container">
      <h1>Daily Options Tracker</h1>

      <div className="row" style={{ margin: "16px 0" }}>
        <div className="kpi"><b>Open CSP</b><div>{preview.open_csp_count ?? 0}</div></div>
        <div className="kpi"><b>Cash deployed %</b><div>{preview.cash_deployed_pct ?? 0}</div></div>
        <div className="kpi"><b>Any ≥50% returned?</b><div>{String(preview.any_over_50pct_returned)}</div></div>
      </div>

      <DailyForm />
    </div>
  );
}
