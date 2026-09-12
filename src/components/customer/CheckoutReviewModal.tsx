import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../../types';
import { ArrowLeft, Timer, MapPin, Calendar, Check, ShieldCheck, Tag, FileText, ArrowRight, Sparkles } from 'lucide-react';

interface CheckoutReviewModalProps {
  service: ServiceItem;
  date: string;
  timeSlot: string;
  onBack: () => void;
  onProceedToPayment: (notes: string, couponCode: string) => void;
}

export const CheckoutReviewModal: React.FC<CheckoutReviewModalProps> = ({
  service,
  date,
  timeSlot,
  onBack,
  onProceedToPayment,
}) => {
  const [providerNotes, setProviderNotes] = useState(
    'Please ring doorbell twice, two pet cats inside apartment. Access code #402 at security gate.'
  );
  const [couponCode, setCouponCode] = useState('CLEANFEST');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponMessage, setCouponMessage] = useState('CLEANFEST applied: ₹100 festive savings!');
  const [remainingSeconds, setRemainingSeconds] = useState(518); // 8:38 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Price calculations matching Image 11
  const basePrice = 1899;
  const discount = 400;
  const equipmentFee = 49;
  const gst = 278;
  const couponDiscount = couponApplied ? 100 : 0;
  const totalPayable = basePrice - discount + equipmentFee + gst - couponDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'CLEANFEST' || couponCode.trim().toUpperCase() === 'FIRST50') {
      setCouponApplied(true);
      setCouponMessage(`Code ${couponCode.toUpperCase()} applied! ₹100 off`);
    } else {
      setCouponApplied(false);
      setCouponMessage('Invalid or expired coupon code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8ff] overflow-y-auto pb-28 animate-in slide-in-from-right duration-200">
      <div className="max-w-lg mx-auto min-h-screen bg-[#faf8ff] flex flex-col">
        {/* Top Stepper Bar */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/60 shadow-xs">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 3 of 4</span>
            <span className="font-display font-bold text-xs sm:text-sm text-slate-900">Review Booking Details</span>
          </div>
          <div className="w-9" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Slot Held Timer */}
          <div className="bg-[#fea619]/15 border border-[#fea619]/40 rounded-2xl p-3 flex items-center justify-between text-xs text-[#855300] font-semibold">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-[#fea619] animate-spin" />
              <span>Slot held for your reservation:</span>
            </div>
            <span className="font-display font-black text-sm bg-white px-2 py-0.5 rounded-lg border border-[#fea619]/30 text-[#855300]">
              {formatTimer(remainingSeconds)}
            </span>
          </div>

          {/* Service Summary Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Confirmed Choice</span>
                <h2 className="font-display font-bold text-sm text-slate-900">{service.title}</h2>
                <span className="text-xs text-slate-500">2 Verified Specialists • {service.duration}</span>
              </div>
            </div>
          </div>

          {/* Schedule & Timing Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#003426] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900">Appointment Window</span>
              <span className="text-xs text-slate-700 font-semibold mt-0.5">
                {date} • {timeSlot}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Specialists arrive promptly within a 15-min arrival buffer.
              </span>
            </div>
          </div>

          {/* Service Location Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Service Address (Home)</span>
                <span className="text-[11px] font-bold text-[#003426] hover:underline cursor-pointer">Edit</span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                Flat 402, Green Glen Orchid, 4th Cross, 100ft Road, Indiranagar, Bengaluru - 560038
              </p>
              <span className="text-[11px] text-slate-400 mt-1">Pooja M. • +91 98765 43210</span>
            </div>
          </div>

          {/* Notes for Provider */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Notes for Doorstep Specialists</span>
              </span>
              <span className="text-[10px] text-slate-400">Optional</span>
            </div>
            <textarea
              rows={2}
              value={providerNotes}
              onChange={(e) => setProviderNotes(e.target.value)}
              placeholder="e.g. Ring doorbell twice, pets in apartment, elevator details..."
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003426]/20 transition-all resize-none"
            />
          </div>

          {/* Coupon Code Input */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-700" />
              <span>Offers & Coupons</span>
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold uppercase placeholder:normal-case focus:outline-none"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 rounded-xl bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold transition-all"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <span
                className={`text-[11px] font-semibold ${couponApplied ? 'text-emerald-700' : 'text-rose-600'}`}
              >
                {couponMessage}
              </span>
            )}
          </div>

          {/* Transparent Bill Breakdown */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2.5">
            <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900">Payment Breakdown</h3>

            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Service Price</span>
                <span className="font-semibold text-slate-800">₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Instant Festive Discount</span>
                <span className="font-semibold">- ₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Equipment & Consumables Fee</span>
                <span className="font-semibold text-slate-800">₹{equipmentFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Comprehensive Insurance (GST 18%)</span>
                <span className="font-semibold text-slate-800">₹{gst}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Savings ({couponCode.toUpperCase()})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline font-display font-black text-base text-[#003426]">
                <span>Total Payable</span>
                <span>₹{totalPayable}</span>
              </div>
            </div>
          </div>

          {/* SafeShield Assurance Card */}
          <div className="bg-[#003426] text-white rounded-2xl p-4 shadow-md flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#b4efd6] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white">SafeShield Escrow Protection</span>
              <p className="text-[11px] text-emerald-100 leading-snug">
                Your payment is held safely in escrow. Money is only transferred to the specialist after you share the
                4-digit completion code and verify job satisfaction.
              </p>
            </div>
          </div>

          {/* Cancellation Policy Note */}
          <p className="text-[11px] text-slate-400 text-center px-4 leading-relaxed">
            Free cancellation up to 2 hours before scheduled slot. Post arrival cancellation fee of ₹99 applies.
          </p>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Payable</span>
              <span className="font-display font-black text-xl text-[#003426]">₹{totalPayable}</span>
            </div>

            <button
              onClick={() => onProceedToPayment(providerNotes, couponCode)}
              className="flex-1 max-w-[210px] h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
