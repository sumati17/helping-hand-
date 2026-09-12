import React, { useState } from 'react';
import { Booking } from '../../types';
import { CheckCircle2, ShieldCheck, Copy, Check, Navigation, Star, Phone, ArrowRight, Home } from 'lucide-react';

interface BookingConfirmationViewProps {
  booking: Booking;
  onTrack: (booking: Booking) => void;
  onGoHome: () => void;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({
  booking,
  onTrack,
  onGoHome,
}) => {
  const [copied, setCopied] = useState(false);

  const copyBookingId = () => {
    navigator.clipboard?.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const provider = booking.provider;

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Celebration Header */}
      <div className="flex flex-col items-center text-center my-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-[#003426] text-[#b4efd6] flex items-center justify-center shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#fea619] flex items-center justify-center text-white text-xs font-black shadow-sm animate-bounce">
            ★
          </span>
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#003426]">Payment Secured</span>
        <h1 className="font-display font-black text-2xl text-slate-900 mt-1">Booking Confirmed!</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">Booking ID:</span>
          <button
            onClick={copyBookingId}
            className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md"
          >
            <span>#{booking.id}</span>
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* SafeStart OTP Code Highlight Card */}
      <div className="bg-gradient-to-br from-[#003426] to-[#0f4c3a] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden mb-4 text-center">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#b4efd6]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#b4efd6] font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Doorstep SafeStart OTP</span>
        </div>

        <div className="flex items-center justify-center gap-3 my-2">
          {booking.otpCode.split('').map((digit, idx) => (
            <div
              key={idx}
              className="w-12 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-display font-black text-2xl text-white shadow-inner"
            >
              {digit}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-emerald-100/90 max-w-xs mx-auto mt-2 leading-relaxed">
          Share this 4-digit code with your specialist <strong>only after they arrive</strong> at your doorstep. This
          starts the service timer and safeguards your escrow payment.
        </p>
      </div>

      {/* Assigned Provider Matched Card */}
      {provider && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Matched Specialist
            </span>
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#fea619] fill-current" />
              <span>{provider.rating}</span>
              <span className="text-slate-400 font-normal">({provider.completedJobsCount} jobs)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img src={provider.photoUrl} alt={provider.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-display font-bold text-base text-slate-900">{provider.name}</h3>
              <span className="text-xs text-slate-500">{provider.roleTitle}</span>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600">
                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                  {provider.vehicle}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
            <div className="flex items-center gap-1">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Police Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Background Checked</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Vaccinated</span>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Summary Details */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-2.5 text-xs text-slate-600">
        <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900">Appointment Details</h3>
        <div className="flex justify-between">
          <span className="text-slate-400">Service</span>
          <span className="font-bold text-slate-800">{booking.serviceTitle}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Date & Slot</span>
          <span className="font-bold text-slate-800">
            {booking.date} • {booking.timeSlot}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Address</span>
          <span className="font-bold text-slate-800 max-w-[200px] truncate text-right">
            {booking.address.unit}, {booking.address.area}
          </span>
        </div>
        <div className="flex justify-between pt-1 border-t border-slate-100">
          <span className="text-slate-400">Amount Paid</span>
          <span className="font-display font-black text-sm text-[#003426]">₹{booking.pricing.totalPayable}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => onTrack(booking)}
          className="w-full h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 text-white rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Navigation className="w-4 h-4 text-[#b4efd6]" />
          <span>Track Provider & Live Status</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onGoHome}
          className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Return to Marketplace</span>
        </button>
      </div>
    </div>
  );
};
