import { LINKS } from "../config";

export default function PaymentEmbed() {
  return (
    <section className="glass rounded-xl p-4 sm:p-5 card-hover animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
      <div className="font-semibold mb-2">Payment Options (embedded)</div>
      <p className="text-slate-300 mb-3">
        Preferred is Zelle to <b>(317) 205-4383</b> for <b>Cody Rice-Velasquez</b>.
        If you need alternatives, use the embedded page below.
      </p>
      <div className="relative w-full" style={{ paddingTop: "75%" }}>
        <iframe
          src={LINKS.paymentSite}
          title="Payment Options"
          className="absolute inset-0 w-full h-full rounded-xl border-0"
        ></iframe>
      </div>
    </section>
  );
}
