import { Row, currency } from "../lib/calculations";

export default function ScheduleTable({ rows }: { rows: Row[] }) {
  return (
    <div className="glass rounded-xl p-4 sm:p-5 card-hover">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-2">
        <div className="font-semibold">Schedule Preview</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportCSV(rows)}
            className="btn-touch bg-sky-600 hover:bg-sky-500 text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="btn-touch bg-indigo-600 hover:bg-indigo-500 text-sm"
          >
            Print
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-300">
            <tr>
              {["Week","Date","BR","BUF","Projected","Direct One-time","Weekly Total","Cumulative"].map(h=>(
                <th key={h} className="py-2 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 12).map(r=>(
              <tr key={r.week} className="border-t border-white/10">
                <td className="py-2 pr-3">{r.week}</td>
                <td className="py-2 pr-3">{r.date}</td>
                <td className="py-2 pr-3">{currency(r.BR)}</td>
                <td className="py-2 pr-3">{currency(r.BUF)}</td>
                <td className="py-2 pr-3">{currency(r.projectedBonus)}</td>
                <td className="py-2 pr-3">{r.directOneTime ? currency(r.directOneTime) : "—"}</td>
                <td className="py-2 pr-3">{currency(r.total)}</td>
                <td className="py-2 pr-3">{currency(r.cumulative)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-2">Showing first 12 weeks. Export for full 78 weeks.</p>
      </div>
    </div>
  );
}

function exportCSV(rows: Row[]) {
  const headers = [
    "Week","Date","Base Retainer (BR)","Buffer (BUF)",
    "Projected Bonus Spread","Direct One-time","Weekly Total","Cumulative"
  ];
  const body = rows.map(r => [r.week,r.date,r.BR,r.BUF,r.projectedBonus,r.directOneTime,r.total,r.cumulative].join(","));
  const csv = [headers.join(","), ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "BuiltByRays_78wk_Schedule.csv"; a.click();
  URL.revokeObjectURL(url);
}
