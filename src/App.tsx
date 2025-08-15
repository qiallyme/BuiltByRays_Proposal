import { useMemo, useState } from "react";
import HeroVideo from "./components/HeroVideo";
import ProposalStats from "./components/ProposalStats";
import ConfigPanel from "./components/ConfigPanel";
import ScheduleTable from "./components/ScheduleTable";
import NextSteps from "./components/NextSteps";
import ZohoFormEmbed from "./components/ZohoFormEmbed";
import PaymentEmbed from "./components/PaymentEmbed";
import Footer from "./components/Footer";
import { DEFAULTS } from "./config";
import { computeSchedule } from "./lib/calculations";

export default function App() {
  const [cfg, setCfg] = useState(DEFAULTS);

  const { weeks, totals, EB18_total } = useMemo(() => computeSchedule(cfg), [cfg]);
  const expectedReturn = EB18_total + 150000;

  return (
    <div className="min-h-screen overflow-x-hidden swipe-container">
      <HeroVideo />

                    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
         <section className="glass rounded-xl p-4 sm:p-5 card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           <h3 className="font-semibold text-base sm:text-lg mb-2">Cody's Accessibility & Work Style</h3>
           <div className="space-y-3 text-sm sm:text-base text-slate-200">
             <p>
               I want to be transparent about my disabilities that affect my ability to maintain socially accepted schedules. 
               I may oversleep, miss calls, or need to reschedule meetings unexpectedly. I can also experience episodes where 
               I pass out or need to step away.
             </p>
             <p>
               But here's what I bring to compensate: I work very late hours and have intense bursts of productivity where 
               I can deliver months of work in just days. When I'm "on," I'm incredibly focused and efficient.
             </p>
             <p className="text-slate-300 font-medium">
               If you can meet me halfway with some grace for missed calls or deadlines, you'll get 10x more value in return. 
               My deliverables are milestone-based, not chatter-based—you get results, not inbox noise.
             </p>
           </div>
         </section>

         <section className="glass rounded-xl p-4 sm:p-5 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <h3 className="font-semibold text-base sm:text-lg mb-2">Compensation & Payment Terms</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
             <div className="p-3 sm:p-4 glass rounded-lg sm:rounded-xl card-hover">
               <div className="text-slate-300 text-xs sm:text-sm">Base Retainer (BR)</div>
               <div className="text-base sm:text-lg font-semibold">${cfg.baseRetainerWeekly}/wk</div>
             </div>
             <div className="p-3 sm:p-4 glass rounded-lg sm:rounded-xl card-hover">
               <div className="text-slate-300 text-xs sm:text-sm">Inflation Rule</div>
               <div className="text-base sm:text-lg font-semibold">
                 {cfg.inflationMode === "CPI+2" ? `CPI (${(cfg.cpiRate * 100).toFixed(1)}%) + 2%` : "Flat 5%"}
               </div>
             </div>
             <div className="p-3 sm:p-4 glass rounded-lg sm:rounded-xl card-hover">
               <div className="text-slate-300 text-xs sm:text-sm">Buffer (BUF)</div>
               <div className="text-base sm:text-lg font-semibold">${cfg.bufferWeekly}/wk until ${cfg.bufferTargetMonthly} reserve</div>
             </div>
             <div className="p-3 sm:p-4 glass rounded-lg sm:rounded-xl card-hover">
               <div className="text-slate-300 text-xs sm:text-sm">EB18 Spread</div>
               <div className="text-base sm:text-lg font-semibold">Based on growth, savings, intangibles</div>
             </div>
           </div>
           <p className="text-slate-200 text-xs sm:text-sm mt-3">
             Bonuses: 5% of revenue above baseline, 20% of verified direct savings, 15% of assigned intangible value
             paid over 2–5 years. Quarterly true-up adjusts future weeks.
           </p>
           
           {/* ROI Section inside Compensation & Payment Terms */}
           <div className="mt-4 p-4 glass rounded-lg border border-white/10">
             <h4 className="font-semibold text-sm mb-2">ROI Projection (estimate)</h4>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
               <div>
                 <div className="text-slate-300">Total paid (proj.)</div>
                 <div className="font-semibold text-white">${totals.paid.toLocaleString()}</div>
               </div>
               <div>
                 <div className="text-slate-300">Expected value (proj.)</div>
                 <div className="font-semibold text-white">${expectedReturn.toLocaleString()}</div>
               </div>
               <div>
                 <div className="text-slate-300">Value multiple (proj.)</div>
                 <div className="font-semibold text-white">{(expectedReturn / totals.paid).toFixed(2)}x</div>
               </div>
             </div>
             <p className="text-xs text-slate-400 mt-2">Estimates, not guarantees. Adjusted quarterly with actuals.</p>
           </div>
         </section>

         <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           <ConfigPanel config={cfg} setConfig={(u) => setCfg(u)} />
         </div>
         <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
           <ScheduleTable rows={weeks} />
         </div>

         <ZohoFormEmbed />
         <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
           <NextSteps />
         </div>
         <div data-section="payment">
           <PaymentEmbed />
         </div>
       </main>

      <Footer />
    </div>
  );
}
