import { LINKS } from "../config";

export default function NextSteps() {
  return (
    <div className="glass rounded-xl p-4 sm:p-5 card-hover">
      <div className="font-semibold mb-2">Next Steps</div>
      <p className="text-slate-300 mb-2">
        Need a deeper explanation? Read the{" "}
        <a className="underline hover:no-underline" href="/clarification-blanca.html" target="_blank" rel="noopener">
          Clarification for Blanca
        </a>.
      </p>

      <p className="text-slate-200 text-sm sm:text-base">
        Choose an option to move forward. Deposit is fully credited toward your first four weeks
        ($250 retainer + $250 buffer).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <a
          className="btn-touch block text-center bg-brand-500 hover:bg-brand-600 font-semibold"
          href={LINKS.paymentSite}
          target="_blank" rel="noopener"
        >
          Other payment methods
        </a>
        <a
          className="btn-touch block text-center bg-purple-700 hover:bg-purple-600 font-semibold"
          href={LINKS.signUrl}
          target="_blank" rel="noopener"
        >
          Sign the agreement
        </a>
      </div>
    </div>
  );
}
