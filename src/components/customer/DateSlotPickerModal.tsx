import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../../types';
import { ArrowLeft, Clock, ShieldCheck, MapPin, Check, Timer, ArrowRight } from 'lucide-react';

interface DateSlotPickerModalProps {
  service: ServiceItem;
  onBack: () => void;
  onSelectSlot: (date: string, timeSlot: string) => void;
}

export const DateSlotPickerModal: React.FC<DateSlotPickerModalProps> = ({
  service,
  onBack,
  onSelectSlot,
}) => {
  const [selectedDateIdx, setSelectedDateIdx] = useState(2); // Default to Wed 16 Oct
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [remainingSeconds, setRemainingSeconds] = useState(599); // 10 minutes hold timer

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

  const dates = [
    { day: 'Mon', date: '14', full: 'Mon, 14 Oct', status: 'Few slots' },
    { day: 'Tue', date: '15', full: 'Tue, 15 Oct', status: 'Filling fast' },
    { day: 'Wed', date: '16', full: 'Wed, 16 Oct', status: 'Available' },
    { day: 'Thu', date: '17', full: 'Thu, 17 Oct', status: 'Available' },
    { day: 'Fri', date: '18', full: 'Fri, 18 Oct', status: 'Available' },
    { day: 'Sat', date: '19', full: 'Sat, 19 Oct', status: 'Weekend peak' },
    { day: 'Sun', date: '20', full: 'Sun, 20 Oct', status: 'Weekend peak' },
  ];

  const morningSlots = [
    { time: '08:30 AM', available: true, label: 'Early Bird' },
    { time: '09:30 AM', available: true, label: 'Most Popular' },
    { time: '11:00 AM', available: true, label: '2 slots left' },
  ];

  const afternoonSlots = [
    { time: '12:30 PM', available: true },
    { time: '02:00 PM', available: false, label: 'Sold out' },
    { time: '03:30 PM', available: true },
  ];

  const eveningSlots = [
    { time: '04:30 PM', available: true },
    { time: '06:00 PM', available: true },
    { time: '07:15 PM', available: true, label: '1 slot left' },
  ];

  const handleContinue = () => {
    const chosenDate = dates[selectedDateIdx].full;
    onSelectSlot(chosenDate, selectedSlot);
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 2 of 4</span>
            <span className="font-display font-bold text-xs sm:text-sm text-slate-900">Select Date & Time</span>
          </div>
          <div className="w-9" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Service Summary Pill */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 truncate max-w-[190px]">
                  {service.title}
                </h3>
                <span className="text-[11px] text-slate-500">2 Specialists • {service.duration}</span>
              </div>
            </div>
            <span className="font-display font-black text-sm text-[#003426]">₹{service.price}</span>
          </div>

          {/* Slot Hold Countdown Banner */}
          <div className="bg-[#fea619]/15 border border-[#fea619]/40 rounded-2xl p-3 flex items-center justify-between text-xs text-[#855300] font-semibold">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-[#fea619] animate-spin" />
              <span>Selected slot held for:</span>
            </div>
            <span className="font-display font-black text-sm bg-white px-2 py-0.5 rounded-lg border border-[#fea619]/30 text-[#855300]">
              {formatTimer(remainingSeconds)}
            </span>
          </div>

          {/* Month & Horizontal Date Strip */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-sm text-slate-900">October 2024</h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Next 7 Days Open
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
              {dates.map((d, idx) => {
                const isSelected = selectedDateIdx === idx;
                return (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDateIdx(idx)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[58px] transition-all ${
                      isSelected
                        ? 'bg-[#003426] text-white shadow-md scale-102'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-[#b4efd6]' : 'text-slate-400'}`}>
                      {d.day}
                    </span>
                    <span className="font-display font-black text-base my-0.5">{d.date}</span>
                    <span className={`text-[8px] font-bold ${isSelected ? 'text-white' : 'text-emerald-700'}`}>
                      {d.status === 'Weekend peak' ? 'Peak' : 'Open'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots Sections */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-4">
            {/* Morning */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Morning Slots</span>
                <span className="text-[10px] text-slate-400 font-medium">08:00 AM – 12:00 PM</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {morningSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`relative p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#003426] text-white border-[#003426] shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-display font-bold text-xs block">{slot.time}</span>
                      {slot.label && (
                        <span
                          className={`text-[9px] font-semibold block mt-0.5 truncate ${
                            isSelected ? 'text-[#b4efd6]' : 'text-emerald-700'
                          }`}
                        >
                          {slot.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Afternoon Slots</span>
                <span className="text-[10px] text-slate-400 font-medium">12:00 PM – 04:00 PM</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {afternoonSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  const isSoldOut = !slot.available;
                  return (
                    <button
                      key={slot.time}
                      disabled={isSoldOut}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`relative p-2.5 rounded-xl border text-center transition-all ${
                        isSoldOut
                          ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#003426] text-white border-[#003426] shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-display font-bold text-xs block">{slot.time}</span>
                      {slot.label && (
                        <span
                          className={`text-[9px] font-semibold block mt-0.5 truncate ${
                            isSoldOut ? 'text-slate-400' : isSelected ? 'text-[#b4efd6]' : 'text-slate-500'
                          }`}
                        >
                          {slot.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evening */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Evening Slots</span>
                <span className="text-[10px] text-slate-400 font-medium">04:00 PM – 08:00 PM</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {eveningSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`relative p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#003426] text-white border-[#003426] shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-display font-bold text-xs block">{slot.time}</span>
                      {slot.label && (
                        <span
                          className={`text-[9px] font-semibold block mt-0.5 truncate ${
                            isSelected ? 'text-[#b4efd6]' : 'text-amber-700'
                          }`}
                        >
                          {slot.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* On-Time Arrival Guarantee */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-950">On-Time Arrival Guarantee</span>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
                If our certified team arrives more than 15 minutes past your chosen slot without prior notice, get ₹50
                credited directly to your wallet.
              </p>
            </div>
          </div>

          {/* Service Location Quick Confirmation */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#003426]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Indiranagar, Bengaluru</span>
                <span className="text-[10px] text-slate-500">Flat 402, Green Glen Orchid</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#003426] hover:underline cursor-pointer">
              Change
            </span>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Slot Selected</span>
              <span className="font-display font-bold text-xs sm:text-sm text-slate-900">
                {dates[selectedDateIdx].full} • {selectedSlot}
              </span>
            </div>

            <button
              onClick={handleContinue}
              className="flex-1 max-w-[200px] h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <span>Review & Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
