import { BRAND, MEDIA } from "../config";
import { useState } from "react";

export default function HeroVideo() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4 animate-fade-in-up">
        {/* Header - Compact and Mobile Optimized */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <img 
            src={BRAND.logo} 
            alt="logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-contain flex-shrink-0" 
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {BRAND.companyName}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              {BRAND.proposalTitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Interactive, receipt-ready, and mercifully clear.
            </p>
          </div>
        </div>

        {/* Video Container - Responsive and Compact */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/20 card-hover">
          <video
            className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] object-cover"
            src={MEDIA.introVideo}
            controls
            playsInline
            poster="/logo.png"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Mobile-friendly video controls overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Listen to More Accordion */}
        <div className="mt-4">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="btn-touch w-full bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-between"
          >
            <span>Listen to More</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isAccordionOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
                     {isAccordionOpen && (
             <div className="mt-3 space-y-3 animate-fade-in-up">
               <div className="glass rounded-lg p-3 card-hover">
                 <h4 className="font-medium text-white mb-2">How Fractional C-Suite Power Unlocks Lasting Value</h4>
                 <audio
                   controls
                   className="w-full"
                   preload="metadata"
                 >
                   <source src="/BuiltByRays__How_Fractional_C-Suite_Power_Unlocks_Lasting_Value_and_Savings_for_Construction_Busines.mp3" type="audio/mpeg" />
                   Your browser does not support the audio element.
                 </audio>
               </div>
               
               <div className="glass rounded-lg p-3 card-hover">
                 <h4 className="font-medium text-white mb-2">Executive Growth Partnership Overview</h4>
                 <video
                   className="w-full h-auto max-h-[200px] object-cover rounded"
                   controls
                   playsInline
                   preload="metadata"
                 >
                   <source src="/intro.mp4" type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               </div>
             </div>
           )}
        </div>
      </div>
    </section>
  );
}
