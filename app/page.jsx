import "./globals.css";
import DailyForm from "@/components/DailyForm";
import { getPreview } from "@/lib/api";

export default async function Page() {
  // Fetch server-side once to render KPIs fast
  let preview = { open_csp_count: 0, cash_deployed_pct: 0, any_over_50pct_returned: false };
  try { preview = await getPreview(); } catch(_) {}

  return (
    <div className="container">
      <h1>Daily Options Tracker</h1>

      <div className="row" style={{margin:"16px 0"}}>
        <div className="kpi"><b>Open CSP</b><div>{preview.open_csp_count ?? 0}</div></div>
        <div className="kpi"><b>Cash deployed %</b><div>{preview.cash_deployed_pct ?? 0}</div></div>
        <div className="kpi"><b>Any ≥50% returned?</b><div>{String(preview.any_over_50pct_returned)}</div></div>
      </div>

      <DailyForm />
    </div>
  );
}
