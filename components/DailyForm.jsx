"use client";

import { useEffect, useState } from "react";
import { getPreview, getToday, submitChecklist } from "@/lib/api";

export default function DailyForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const todayStr = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    trade_date: todayStr,
    open_csp_count: "",
    positions_rolled_count: "",
    cash_deployed_pct: "",
    high_impact_event: false,
    qqq_rsi_over70: false,
    notes: ""
  });

  useEffect(() => {
    (async () => {
      try {
        const [preview, today] = await Promise.all([getPreview(), getToday()]);
        setForm(f => ({
          ...f,
          open_csp_count: today?.open_csp_count ?? preview.open_csp_count ?? "",
          positions_rolled_count: today?.positions_rolled_count ?? "",
          cash_deployed_pct: today?.cash_deployed_pct ?? preview.cash_deployed_pct ?? "",
          high_impact_event: today?.high_impact_event ?? false,
          qqq_rsi_over70: today?.qqq_rsi_over70 ?? false,
          notes: today?.notes ?? ""
        }));
      } catch (e) {
        console.error(e);
        setMsg("Could not prefill metrics.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    // coerce number fields
    const payload = {
      ...form,
      open_csp_count: form.open_csp_count === "" ? null : Number(form.open_csp_count),
      positions_rolled_count: form.positions_rolled_count === "" ? null : Number(form.positions_rolled_count),
      cash_deployed_pct: form.cash_deployed_pct === "" ? null : Number(form.cash_deployed_pct)
    };
    try {
      const res = await submitChecklist(payload);
      setMsg(`Saved for ${res.trade_date} (id ${res.id}).`);
    } catch (e) {
      console.error(e);
      setMsg("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card">Loading…</div>;

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Daily Options Checklist</h2>
      <p className="small">API: {process.env.NEXT_PUBLIC_API_BASE}</p>

      <div className="grid">
        <div>
          <label className="label">Trade date</label>
          <input className="input" type="date" name="trade_date" value={form.trade_date} onChange={onChange} />
        </div>

        <div>
          <label className="label">Open CSP count</label>
          <input className="input" type="number" name="open_csp_count" value={form.open_csp_count} onChange={onChange} />
        </div>

        <div>
          <label className="label">Positions rolled</label>
          <input className="input" type="number" name="positions_rolled_count" value={form.positions_rolled_count} onChange={onChange} />
        </div>

        <div>
          <label className="label">Cash deployed %</label>
          <input className="input" type="number" step="0.1" name="cash_deployed_pct" value={form.cash_deployed_pct} onChange={onChange} />
        </div>
      </div>

      <div className="row" style={{marginTop:12}}>
        <label><input type="checkbox" name="high_impact_event" checked={form.high_impact_event} onChange={onChange} /> High-impact event this week</label>
      </div>
      <div className="row">
        <label><input type="checkbox" name="qqq_rsi_over70" checked={form.qqq_rsi_over70} onChange={onChange} /> QQQ weekly RSI &gt; 70</label>
      </div>

      <div style={{marginTop:12}}>
        <label className="label">Notes</label>
        <textarea className="textarea" name="notes" rows={4} value={form.notes} onChange={onChange} />
      </div>

      <div style={{marginTop:16, display:"flex", gap:12, alignItems:"center"}}>
        <button className="btn" disabled={saving}>{saving ? "Saving…" : "Save daily entry"}</button>
        <span className="small">{msg}</span>
      </div>
    </form>
  );
}
