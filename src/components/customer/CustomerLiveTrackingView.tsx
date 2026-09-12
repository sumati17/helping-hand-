import React, { useState } from 'react';
import { Booking } from '../../types';
import { MapCanvas } from '../common/MapCanvas';
import { MilestoneTracker } from '../common/MilestoneTracker';
import { StatusPill } from '../common/StatusPill';
import { ArrowLeft, Phone, MessageSquare, Share2, ShieldCheck, AlertTriangle, Key, ExternalLink, HelpCircle } from 'lucide-react';

interface CustomerLiveTrackingViewProps {
  booking: Booking;
  onBack: () => void;
  onOpenHelpDesk?: () => void;
}

export const CustomerLiveTrackingView: React.FC<CustomerLiveTrackingViewProps> = ({
  booking,
  onBack,
  onOpenHelpDesk,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const provider = booking.provider;

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 animate-in fade-in duration-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-200">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-display font-bold text-sm text-slate-900">Live Service Tracking</span>
          <span className="text-[11px] text-slate-400 font-medium">#{booking.id}</span>
        </div>

        <StatusPill status={booking.status} />
      </div>

      {/* 1. Interactive Vector Map */}
      <div className="mb-4">
        <MapCanvas
          providerName={provider?.name || 'Rajesh'}
          destinationText={`${booking.address.unit}, ${booking.address.area}`}
          etaMinutes={booking.status === 'arrived' ? 0 : 12}
          distanceKm={booking.status === 'arrived' ? 0 : 2.3}
          onRefreshGps={() => triggerToast('GPS satellite signal verified with Ather Telemetry.')}
          onRecenter={() => triggerToast('Map view recentered on active route.')}
        />
      </div>

      {/* 2. 8-Step Milestone Progress Stepper */}
      <div className="mb-4">
        <MilestoneTracker currentStatus={booking.status} />
      </div>

      {/* 3. Doorstep SafeStart OTP Card */}
      <div className="bg-gradient-to-br from-[#003426] to-[#0f4c3a] text-white rounded-3xl p-4 shadow-md relative overflow-hidden mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b4efd6] flex items-center gap-1.5">
            <Key className="w-4 h-4" />
            <span>Doorstep SafeStart Code</span>
          </span>
          <span className="text-[10px] text-emerald-200 font-semibold px-2 py-0.5 rounded-full bg-white/10">
            Escrow Shielded
          </span>
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

        <p className="text-[11px] text-emerald-100/90 text-center leading-relaxed">
          Provide this 4-digit code to <strong>{provider?.name || 'the specialist'}</strong> upon doorstep arrival to
          verify identity and authorize work to commence.
        </p>
      </div>

      {/* 4. Provider Profile Card */}
      {provider && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img src={provider.photoUrl} alt={provider.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#003426] rounded-full flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-base text-slate-900">{provider.name}</h3>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#003426] text-[10px] font-bold">
                    4.9 ★
                  </span>
                </div>
                <span className="text-xs text-slate-500">{provider.roleTitle}</span>
                <span className="text-[11px] text-slate-600 font-medium mt-0.5">{provider.vehicle}</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => triggerToast(`Masked VoIP call connecting to ${provider.name}...`)}
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#003426]" />
              <span>Call</span>
            </button>

            <button
              onClick={() => triggerToast(`Opening encrypted in-app chat with ${provider.name}...`)}
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#003426]" />
              <span>Chat</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Tracking ${provider.name}`,
                    text: `Rajesh is en route for Deep Home Cleaning. ETA: 12 mins.`,
                    url: window.location.href
                  });
                } else {
                  triggerToast('Tracking link copied to clipboard!');
                }
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Share ETA</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Escrow Payment & SafeShield Protection */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-900">Escrow Security Protected</span>
          <p className="text-[11px] text-slate-500 leading-snug">
            Your ₹{booking.pricing.totalPayable} is safely locked in escrow. Payout occurs only after you complete the
            service inspection and confirm satisfactory performance.
          </p>
        </div>
      </div>

      {/* 6. Emergency Support Trigger */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <button
          onClick={onOpenHelpDesk}
          className="flex items-center gap-1.5 text-[#003426] font-bold hover:underline"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Need help with this booking?</span>
        </button>
        <span className="text-[11px] text-slate-400">SafeShield 24/7 Desk</span>
      </div>
    </div>
  );
};
