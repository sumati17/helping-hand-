import React, { useState } from 'react';
import { Provider, JobOffer, Booking } from '../../types';
import { Power, Radio, Zap, Clock, Navigation, CheckCircle2, ChevronRight, AlertCircle, Shield, Award, TrendingUp, Phone } from 'lucide-react';

interface ProviderDashboardViewProps {
  provider: Provider;
  activeOffer: JobOffer | null;
  activeBooking?: Booking;
  allBookings: Booking[];
  onToggleDuty: (active: boolean) => void;
  onOpenOffer: (offer: JobOffer) => void;
  onOpenTransit: (booking: Booking) => void;
}

export const ProviderDashboardView: React.FC<ProviderDashboardViewProps> = ({
  provider,
  activeOffer,
  activeBooking,
  allBookings,
  onToggleDuty,
  onOpenOffer,
  onOpenTransit,
}) => {
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'done' | 'queue'>('all');

  const todaySchedule = [
    {
      id: 'JOB-1',
      time: '08:00 AM',
      title: 'Foam Car Wash & Wax',
      customer: 'Neha Patil',
      area: 'Whitefield',
      status: 'completed',
      payout: 420
    },
    {
      id: 'JOB-2',
      time: '09:30 AM',
      title: 'Deep Full Home Cleaning',
      customer: 'Pooja M.',
      area: 'Indiranagar',
      status: activeBooking?.status === 'completed' ? 'completed' : 'active',
      payout: 1290
    },
    {
      id: 'JOB-3',
      time: '02:00 PM',
      title: 'Kitchen Pipe & Tap Repair',
      customer: 'Rohit Verma',
      area: 'Bellandur',
      status: 'queue',
      payout: 320
    }
  ];

  const filteredSchedule = todaySchedule.filter((item) => {
    if (scheduleFilter === 'all') return true;
    if (scheduleFilter === 'done') return item.status === 'completed';
    return item.status === 'queue' || item.status === 'active';
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2">
      {/* 1. Top Provider Status & Duty Toggle */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-13 h-13 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            <img src={provider.photoUrl} alt={provider.name} className="w-full h-full object-cover" />
            <div
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                provider.activeDuty ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-base text-slate-900">{provider.name}</h2>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#003426] text-[10px] font-bold">
                {provider.tier}
              </span>
            </div>
            <span className="text-xs text-slate-500">{provider.roleTitle}</span>
            <span className="text-[11px] text-slate-400 font-medium">{provider.vehicle}</span>
          </div>
        </div>

        {/* Duty Toggle */}
        <button
          onClick={() => onToggleDuty(!provider.activeDuty)}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
            provider.activeDuty
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{provider.activeDuty ? 'On Duty' : 'Take Break'}</span>
        </button>
      </div>

      {/* 2. Incoming Job Offer Radar Banner (if active) */}
      {activeOffer && provider.activeDuty && (
        <div className="bg-gradient-to-br from-[#003426] to-[#0f4c3a] text-white rounded-3xl p-4 shadow-lg mb-4 relative overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#b4efd6]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fea619] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fea619]"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#b4efd6]">
                Incoming Instant Match
              </span>
            </div>
            <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
              48s Auto-Decline
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 my-1">
            <div>
              <h3 className="font-display font-bold text-base text-white">{activeOffer.serviceTitle}</h3>
              <p className="text-xs text-emerald-100/90">{activeOffer.location} • {activeOffer.estimatedDuration}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-200 block uppercase">Net Payout</span>
              <span className="font-display font-black text-xl text-[#b4efd6]">₹{activeOffer.estimatedNetPayout}</span>
            </div>
          </div>

          {activeOffer.surgeMultiplier && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fea619]/20 text-[#fea619] text-[10px] font-bold border border-[#fea619]/30 mt-1 mb-2">
              <Zap className="w-3 h-3" />
              <span>{activeOffer.surgeMultiplier}x Peak Rush Surge Included</span>
            </div>
          )}

          <button
            onClick={() => onOpenOffer(activeOffer)}
            className="w-full h-11 bg-[#b4efd6] hover:bg-emerald-300 text-[#003426] font-display font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span>Review Offer Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. 4-KPI Pulse Bento Cards */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {/* Earnings */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Today's Payout</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="font-display font-black text-xl text-[#003426]">₹3,450</span>
          <span className="text-[10px] text-slate-500">Auto-payout at 11:30 PM</span>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Pro Rating</span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-xl text-slate-900">4.9</span>
            <span className="text-amber-500 text-xs">★</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">428 Verified Reviews</span>
        </div>

        {/* Acceptance */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Acceptance Rate</span>
          <span className="font-display font-black text-xl text-slate-900">98.2%</span>
          <span className="text-[10px] text-emerald-700 font-semibold">High-Tier Priority</span>
        </div>

        {/* Completion */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">On-Time Score</span>
          <span className="font-display font-black text-xl text-slate-900">100%</span>
          <span className="text-[10px] text-slate-500">Zero late penalties</span>
        </div>
      </div>

      {/* 4. Active Transit Job Card */}
      {activeBooking && activeBooking.status !== 'completed' && activeBooking.status !== 'cancelled' && (
        <div className="bg-white rounded-3xl p-4 border-2 border-[#003426] shadow-md mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-extrabold uppercase text-[#003426] tracking-wide">
                Current Active Assignment
              </span>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Status: {activeBooking.status.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900">{activeBooking.serviceTitle}</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {activeBooking.customerName} • {activeBooking.address.unit}, {activeBooking.address.area}
              </p>
              <span className="text-[11px] text-slate-400">Scheduled: {activeBooking.timeSlot}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Payout</span>
              <span className="font-display font-black text-base text-emerald-800">
                ₹{activeBooking.pricing.providerEarnings}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenTransit(activeBooking)}
            className="w-full h-11 bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Navigation className="w-4 h-4 text-[#b4efd6]" />
            <span>Open Turn-by-Turn Route & OTP Keypad</span>
          </button>
        </div>
      )}

      {/* 5. Today's Schedule & Job Queue */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900">Today's Schedule</h3>
            <span className="text-[11px] text-slate-500">Wednesday, 16 October</span>
          </div>

          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 text-xs font-semibold">
            <button
              onClick={() => setScheduleFilter('all')}
              className={`px-2.5 py-1 rounded-lg ${scheduleFilter === 'all' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'}`}
            >
              All
            </button>
            <button
              onClick={() => setScheduleFilter('done')}
              className={`px-2.5 py-1 rounded-lg ${scheduleFilter === 'done' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'}`}
            >
              Done
            </button>
            <button
              onClick={() => setScheduleFilter('queue')}
              className={`px-2.5 py-1 rounded-lg ${scheduleFilter === 'queue' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'}`}
            >
              Queue
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          {filteredSchedule.map((job) => (
            <div
              key={job.id}
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                job.status === 'active'
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : job.status === 'completed'
                  ? 'bg-slate-50/70 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] font-bold mt-0.5">{job.time.slice(0, 5)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xs text-slate-900">{job.title}</span>
                  <span className="text-[11px] text-slate-500">
                    {job.customer} • {job.area}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-bold text-xs text-[#003426]">₹{job.payout}</span>
                <span
                  className={`text-[9px] font-bold block uppercase mt-0.5 ${
                    job.status === 'completed'
                      ? 'text-emerald-700'
                      : job.status === 'active'
                      ? 'text-amber-800'
                      : 'text-slate-400'
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Commercial Partner Protection Banner */}
      <div className="bg-slate-100/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>Active Partner Insurance (₹5 Lakhs Cover)</span>
        </div>
        <span className="font-bold text-[#003426]">Support SOS</span>
      </div>
    </div>
  );
};
