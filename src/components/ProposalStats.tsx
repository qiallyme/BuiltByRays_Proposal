import { currency } from "../lib/calculations";

export default function ProposalStats({
  paid,
  expectedReturn
}: { paid: number; expectedReturn: number }) {
  const multiple = paid ? expectedReturn / paid : 0;
  return (
    <div className="glass rounded-xl p-4 sm:p-5 card-hover">
      <div className="font-semibold mb-2">ROI Projection (estimate)</div>
      <ul className="text-slate-200 space-y-1">
        <li>Total paid (proj.): <b>{currency(paid)}</b></li>
        <li>Expected value (proj.): <b>{currency(expectedReturn)}</b></li>
        <li>Value multiple (proj.): <b>{multiple.toFixed(2)}x</b></li>
      </ul>
      <p className="text-xs text-slate-400 mt-2">Estimates, not guarantees. Adjusted quarterly with actuals.</p>
    </div>
  );
}
