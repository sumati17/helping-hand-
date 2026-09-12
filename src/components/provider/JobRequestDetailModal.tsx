import React, { useState, useEffect } from 'react';
import { JobOffer } from '../../types';
import { ArrowLeft, Zap, MapPin, Clock, Star, ShieldCheck, Check, X, AlertTriangle, ArrowRight, User } from 'lucide-react';

interface JobRequestDetailModalProps {
  offer: JobOffer;
  onAccept: (offerId: string) => void;
  onDecline: (offerId: string, reason: string) => void;
  onClose: () => void;
}

export const JobRequestDetailModal: React.FC<JobRequestDetailModalProps> = ({
  offer,
  onAccept,
  onDecline,
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(48);
  const [showDeclineSheet, setShowDeclineSheet] = useState(false);
  const [declineReason, setDeclineReason] = useState('Too far from my current route');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onClose]);

  const handleDeclineConfirm = () => {
    onDecline(offer.id, declineReason);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8ff] overflow-y-auto pb-28 animate-in slide-in-from-bottom duration-200">
      <div className="max-w-lg mx-auto min-h-screen bg-[#faf8ff] flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/60 shadow-xs">
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#855300] uppercase tracking-widest">Instant Offer Radar</span>
            <span className="font-display font-bold text-xs sm:text-sm text-slate-900">Job Assignment Request</span>
          </div>
          {/* Countdown Ring */}
          <div className="w-9 h-9 rounded-full bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs">
            {secondsLeft}s
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Net Payout Hero Card */}
          <div className="bg-[#003426] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col gap-2">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#b4efd6]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b4efd6] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#fea619]" />
                <span>Guaranteed Net Payout</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-semibold">
                Auto Escrow Release
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-1">
              <span className="font-display font-black text-3xl sm:text-4xl text-white">
                ₹{offer.estimatedNetPayout}
              </span>
              {offer.surgeMultiplier && (
                <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-amber-950 text-xs font-black">
                  {offer.surgeMultiplier}x Surge
                </span>
              )}
            </div>

            <p className="text-[11px] text-emerald-100/90 leading-snug">
              Earnings are protected in the Escrow Shield Vault and credited to your linked UPI/Bank immediately upon
              OTP sign-off.
            </p>
          </div>

          {/* Job & Location Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{offer.category}</span>
              <h2 className="font-display font-bold text-base text-slate-900">{offer.serviceTitle}</h2>
              <span className="text-xs text-slate-500">{offer.estimatedDuration} estimated work time</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#003426] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{offer.location}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {offer.distanceKm} km away (~8 mins ride on 2-wheeler)
                </span>
              </div>
            </div>
          </div>

          {/* Customer Summary Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#003426] flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-slate-900">{offer.customerName}</h3>
                  <span className="flex items-center text-xs font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-current text-amber-500 mr-0.5" />
                    {offer.customerRating}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{offer.customerBookingsCount} completed orders on platform</span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified User
            </span>
          </div>

          {/* Customer Doorstep Notes */}
          {offer.customerNotes && (
            <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-900">Customer Doorstep Instructions</span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed italic">
                “{offer.customerNotes}”
              </p>
            </div>
          )}

          {/* Partner SafeShield Guarantee */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-950">Partner Insurance Active</span>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
                You are covered by Commercial Partner Protection (up to ₹5,00,000) during transit and job execution.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Action Tray */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button
              onClick={() => setShowDeclineSheet(true)}
              className="px-5 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              Decline
            </button>

            <button
              onClick={() => onAccept(offer.id)}
              className="flex-1 h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Check className="w-4 h-4 text-[#b4efd6]" />
              <span>Accept & Start Transit (₹{offer.estimatedNetPayout})</span>
            </button>
          </div>
        </div>

        {/* Decline Reason Sheet */}
        {showDeclineSheet && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0">
            <div className="w-full max-w-lg bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200">
              <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto" />
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900">Reason for Declining</h3>
                <button
                  onClick={() => setShowDeclineSheet(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Sharing honest feedback helps our dispatch algorithm route jobs closer to your current location.
              </p>

              <div className="flex flex-col gap-2">
                {[
                  'Too far from my current route',
                  'Low battery on two-wheeler',
                  'Schedule overlap with another task',
                  'Personal emergency / break'
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setDeclineReason(reason)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                      declineReason === reason
                        ? 'bg-emerald-50 border-[#003426] text-[#003426]'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button
                onClick={handleDeclineConfirm}
                className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl mt-2 transition-all"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
