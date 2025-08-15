import { LINKS } from "../config";

export default function ZohoFormEmbed() {
  return (
    <section className="glass rounded-xl p-4 sm:p-5 card-hover animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <div className="font-semibold mb-2">Feedback or Adjustments</div>
      <p className="text-slate-300 mb-3">
        Ask questions, request changes, or approve. The form opens below.
      </p>
      <div className="relative w-full" style={{ paddingTop: "120%" }}>
        <iframe
          src={LINKS.feedbackFormEmbed}
          title="Feedback Form"
          className="absolute inset-0 w-full h-full rounded-xl border-0"
          allow="clipboard-write; encrypted-media"
        ></iframe>
      </div>
    </section>
  );
}
