import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { ArrowLeft, Star, Clock, CheckCircle2, ShieldCheck, ChevronDown, ChevronUp, Share2, Bookmark, Info, ArrowRight, X } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem;
  onBack: () => void;
  onProceedToBooking: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onBack,
  onProceedToBooking,
}) => {
  const [showExclusions, setShowExclusions] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8ff] overflow-y-auto pb-28 animate-in slide-in-from-right duration-200">
      <div className="max-w-lg mx-auto min-h-screen bg-[#faf8ff] flex flex-col">
        {/* Top Header Navigation */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/60 shadow-xs">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#003426] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Standard Certified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: service.title, url: window.location.href });
                }
              }}
              aria-label="Share"
              className="w-9 h-9 rounded-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual Stage */}
        <div className="p-4 pb-2">
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-md bg-slate-100">
            <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-[#003426]">Available Today in 90 Mins</span>
            </div>

            {/* Bottom Metas */}
            <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-[#fea619] fill-current" />
                  <span>{service.rating}</span>
                  <span className="text-white/80 font-normal">({service.reviewsCount}+ reviews)</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#b4efd6]" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Pricing Strip */}
        <div className="px-4 py-2 flex flex-col gap-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div>
              <h1 className="font-display font-extrabold text-xl text-slate-900 leading-tight">
                {service.title}
              </h1>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.description}</p>
            </div>

            {/* Pricing block */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-[#003426]">₹{service.price}</span>
                <span className="text-xs text-slate-400 line-through">₹{service.originalPrice}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  {service.discountPercentage}% OFF
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>No hidden fees</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                <span className="text-base">🧪</span>
                <span className="text-[11px] font-bold text-slate-800">Eco Chemicals</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                <span className="text-base">👮</span>
                <span className="text-[11px] font-bold text-slate-800">Police Verified</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1">
                <span className="text-base">✨</span>
                <span className="text-[11px] font-bold text-slate-800">Mess Free</span>
              </div>
            </div>
          </div>

          {/* Helping Hand Assurance */}
          <div className="bg-[#003426] text-white rounded-2xl p-4 shadow-md relative overflow-hidden flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#b4efd6] text-[#003426] flex items-center justify-center font-bold text-xs">
                🛡️
              </div>
              <div>
                <h3 className="font-display font-bold text-xs text-white">Helping Hand Assurance</h3>
                <span className="text-[10px] text-[#b4efd6] font-semibold">100% Worry-Free Protection</span>
              </div>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Not satisfied with the outcome? Request a free rework or instant 100% refund within 24 hours. Every single
              booking is insured up to ₹10,000 for incidental damage.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-[#b4efd6] font-bold">
              <span>✓ Free rework</span>
              <span>•</span>
              <span>₹10k Insured</span>
            </div>
          </div>

          {/* What is Included Section */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#003426]" />
                <span>What is Included</span>
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#003426] text-[10px] font-bold border border-emerald-100">
                {service.inclusions.length} Core Zones
              </span>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              {service.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#003426] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <span className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusions Collapsible */}
            <div className="mt-1 pt-1 border-t border-slate-100">
              <button
                onClick={() => setShowExclusions(!showExclusions)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>What is NOT Included ({service.exclusions.length} Exclusions)</span>
                {showExclusions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showExclusions && (
                <div className="mt-2 flex flex-col gap-2 p-1 animate-in fade-in duration-150">
                  {service.exclusions.map((ex, idx) => (
                    <div key={idx} className="text-xs text-rose-800 bg-rose-50 border border-rose-100 rounded-xl p-2.5 flex items-start gap-2">
                      <span className="font-bold text-rose-600">✕</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* How It Works (Timeline) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <h2 className="font-display font-bold text-sm text-slate-900">How It Works</h2>
            <div className="flex flex-col gap-3 relative pl-2">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200" />
              {[
                { step: '1', title: 'Uniformed Pros Arrive', desc: 'Arrives equipped with industrial vacuum, micro-fiber kits, and eco-certified chemicals.' },
                { step: '2', title: 'Pre-Service Inspection', desc: '360° walk-through with you to identify stubborn stains and heavy grease zones.' },
                { step: '3', title: 'Multi-Zone Deep Treatment', desc: 'Simultaneous two-person thorough execution across living zones, kitchen, and washrooms.' },
                { step: '4', title: 'Sign-off with Security PIN', desc: 'Complete final inspection. Share your 4-digit OTP only once you are 100% satisfied.' }
              ].map((st) => (
                <div key={st.step} className="flex items-start gap-3 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#003426] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {st.step}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{st.title}</span>
                    <span className="text-[11px] text-slate-500 leading-snug">{st.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Site Requirement */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-900">Customer Site Requirement</span>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">{service.requirements}</p>
            </div>
          </div>

          {/* Customer Testimonial Snippet */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xs text-slate-900">Customer Testimonial</h3>
              <span className="text-[11px] text-emerald-700 font-semibold">1,248 Verified</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs">
                    PM
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Pooja M.</span>
                    <span className="text-[10px] text-slate-400">Verified Resident • Indiranagar</span>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                “Extremely thorough! Arrived right on time with heavy industrial gear and removed year-old grease stains. House smells pristine!”
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Tray */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-xl text-[#003426]">₹{service.price}</span>
                <span className="text-xs text-slate-400 line-through">₹{service.originalPrice}</span>
              </div>
              <button
                onClick={() => setShowPriceBreakdown(true)}
                className="text-[11px] font-bold text-emerald-700 underline text-left hover:text-emerald-900"
              >
                View price breakdown
              </button>
            </div>

            <button
              onClick={() => onProceedToBooking(service)}
              className="flex-1 max-w-[220px] h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <span>Select Date & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price Breakdown Micro Bottom Sheet */}
        {showPriceBreakdown && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0">
            <div className="w-full max-w-lg bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200">
              <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto" />
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900">Payment Breakdown</h3>
                <button
                  onClick={() => setShowPriceBreakdown(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Service Price</span>
                  <span className="font-semibold text-slate-800">₹{service.originalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Helping Hand Promotional Discount</span>
                  <span>- ₹{service.originalPrice - service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety & Equipment Consumables</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Doorstep Taxes & Insurance</span>
                  <span className="font-medium text-slate-700">Included</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-display font-black text-sm text-[#003426]">
                  <span>Total Payable</span>
                  <span>₹{service.price}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowPriceBreakdown(false);
                  onProceedToBooking(service);
                }}
                className="w-full h-11 bg-[#003426] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 mt-1"
              >
                Proceed with ₹{service.price}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
