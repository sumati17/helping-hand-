import React, { useState } from 'react';
import { Booking } from '../../types';
import { MapCanvas } from '../common/MapCanvas';
import { StatusPill } from '../common/StatusPill';
import { MilestoneTracker } from '../common/MilestoneTracker';
import { ArrowLeft, Phone, MessageSquare, Key, CheckCircle2, AlertCircle, Wrench, Shield, Check, Loader2, Navigation } from 'lucide-react';

interface ProviderActiveTransitViewProps {
  booking: Booking;
  onBack: () => void;
  onUpdateStatus: (status: Booking['status']) => void;
  onVerifyOtp: (otp: string) => Promise<{ success: boolean; message: string }>;
  onCompleteJob: () => void;
}

export const ProviderActiveTransitView: React.FC<ProviderActiveTransitViewProps> = ({
  booking,
  onBack,
  onUpdateStatus,
  onVerifyOtp,
  onCompleteJob,
}) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [checklist, setChecklist] = useState({
    vacuum: true,
    chemicals: true,
    shoeCovers: true
  });
  const [jobDurationMinutes, setJobDurationMinutes] = useState(14);

  const handleDigitPress = (num: string) => {
    if (enteredOtp.length < 4) {
      setEnteredOtp((prev) => prev + num);
      setOtpError('');
    }
  };

  const handleBackspace = () => {
    setEnteredOtp((prev) => prev.slice(0, -1));
    setOtpError('');
  };

  const handleVerifyOtp = async () => {
    if (enteredOtp.length !== 4) {
      setOtpError('Please enter all 4 digits of the SafeStart OTP');
      return;
    }
    setIsVerifying(true);
    const res = await onVerifyOtp(enteredOtp);
    setIsVerifying(false);
    if (!res.success) {
      setOtpError(res.message);
    }
  };

  const handleMarkArrived = () => {
    onUpdateStatus('arrived');
  };

  const isOtpVerified = booking.status === 'otp_started' || booking.status === 'in_progress' || booking.status === 'completed';
  const isJobCompleted = booking.status === 'completed';

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 animate-in fade-in duration-200">
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
          <span className="font-display font-bold text-sm text-slate-900">Partner Navigation & Transit</span>
          <span className="text-[11px] text-slate-400 font-medium">#{booking.id}</span>
        </div>

        <StatusPill status={booking.status} />
      </div>

      {/* Map Route Canvas */}
      <div className="mb-4">
        <MapCanvas
          providerName="You (Rajesh)"
          destinationText={`${booking.address.unit}, ${booking.address.area}`}
          etaMinutes={booking.status === 'arrived' ? 0 : 12}
          distanceKm={booking.status === 'arrived' ? 0 : 2.3}
        />
      </div>

      {/* Milestone Progress Stepper */}
      <div className="mb-4">
        <MilestoneTracker currentStatus={booking.status} />
      </div>

      {/* Customer Contact & Address Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Location</span>
            <h3 className="font-display font-bold text-base text-slate-900">{booking.customerName}</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {booking.address.unit}, {booking.address.street}, {booking.address.area}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Calling customer ${booking.customerName} (+91 98765 43210)`)}
              className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#003426] border border-emerald-200 flex items-center justify-center shadow-xs hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert(`Opening secure partner chat with ${booking.customerName}`)}
              className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {booking.specialInstructions && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 italic">
            Note: “{booking.specialInstructions}”
          </div>
        )}
      </div>

      {/* Action Step 1: Arrive at Gate / Doorstep */}
      {booking.status === 'en_route' || booking.status === 'accepted' || booking.status === 'assigned' ? (
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Navigation className="w-4 h-4 text-[#003426]" />
            <span className="font-display font-bold text-xs sm:text-sm">Step 1: Doorstep Arrival</span>
          </div>
          <p className="text-xs text-slate-500 leading-snug">
            Press the button below once you have parked your vehicle and reached the customer's apartment door.
          </p>
          <button
            onClick={handleMarkArrived}
            className="w-full h-12 bg-[#003426] hover:bg-[#0f4c3a] text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <span>I Have Arrived at Doorstep</span>
          </button>
        </div>
      ) : null}

      {/* Action Step 2: SafeStart OTP Verification Keypad */}
      {!isOtpVerified && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900">
              <Key className="w-4 h-4 text-[#003426]" />
              <span className="font-display font-bold text-xs sm:text-sm">Step 2: Enter SafeStart OTP</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Customer gives this code
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-snug">
            Ask the customer for their 4-digit verification code to start the service and unlock the escrow counter.
            (Hint for demo: customer's code is <strong>{booking.otpCode}</strong>)
          </p>

          {/* OTP Digit Display Boxes */}
          <div className="flex items-center justify-center gap-3 my-1">
            {[0, 1, 2, 3].map((idx) => {
              const char = enteredOtp[idx] || '';
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 rounded-2xl border flex items-center justify-center font-display font-black text-2xl transition-all ${
                    char
                      ? 'bg-[#003426] text-white border-[#003426] shadow-sm'
                      : 'bg-slate-50 border-slate-300 text-slate-400'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>

          {otpError && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{otpError}</span>
            </div>
          )}

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', '⌫'].map((k) => (
              <button
                key={k}
                onClick={() => {
                  if (k === 'Clear') setEnteredOtp('');
                  else if (k === '⌫') handleBackspace();
                  else handleDigitPress(k);
                }}
                className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 font-display font-bold text-sm text-slate-800 flex items-center justify-center transition-all shadow-xs"
              >
                {k}
              </button>
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={isVerifying || enteredOtp.length !== 4}
            className="w-full h-12 bg-[#003426] hover:bg-[#0f4c3a] disabled:opacity-50 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-1"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#b4efd6]" />
                <span>Verifying Secure Escrow Key...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-[#b4efd6]" />
                <span>Verify OTP & Start Job</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Action Step 3: In Progress & Completion */}
      {isOtpVerified && !isJobCompleted && (
        <div className="bg-white rounded-3xl p-4 border border-emerald-200 shadow-md mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900">
              <Wrench className="w-4 h-4 text-[#003426]" />
              <span className="font-display font-bold text-xs sm:text-sm">Job In Progress</span>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Active Timer: {jobDurationMinutes} mins
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex flex-col gap-1.5">
            <span className="font-bold">Standard Checklist Completed:</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-700 font-bold">✓</span>
              <span>Industrial dry vacuuming & 16A hookup</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-700 font-bold">✓</span>
              <span>Eco certified non-corrosive chemical solutions applied</span>
            </div>
          </div>

          <button
            onClick={onCompleteJob}
            className="w-full h-12 bg-[#003426] hover:bg-[#0f4c3a] text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#b4efd6]" />
            <span>Complete Job & Release Payout (₹{booking.pricing.providerEarnings})</span>
          </button>
        </div>
      )}

      {/* Completed State Celebration */}
      {isJobCompleted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center flex flex-col items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            ✓
          </div>
          <h3 className="font-display font-black text-base text-emerald-950">Service Successfully Completed!</h3>
          <p className="text-xs text-emerald-800 max-w-xs">
            Net payout of <strong>₹{booking.pricing.providerEarnings}</strong> has been transferred from escrow to your
            linked payout wallet.
          </p>
          <button
            onClick={onBack}
            className="mt-2 px-5 py-2.5 bg-[#003426] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Return to Partner Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
