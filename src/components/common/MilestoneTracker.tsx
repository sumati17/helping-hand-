import React from 'react';
import { BookingStatus } from '../../types';
import { Check, Bike, MapPin, Key, Wrench, CheckCircle2, Clock } from 'lucide-react';

interface MilestoneTrackerProps {
  currentStatus: BookingStatus;
  interactiveStepIndex?: number;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ currentStatus }) => {
  const steps: { status: BookingStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'confirmed', label: 'Confirmed', icon: <Check className="w-3.5 h-3.5" /> },
    { status: 'assigned', label: 'Assigned', icon: <Check className="w-3.5 h-3.5" /> },
    { status: 'accepted', label: 'Accepted', icon: <Check className="w-3.5 h-3.5" /> },
    { status: 'en_route', label: 'En Route', icon: <Bike className="w-3.5 h-3.5" /> },
    { status: 'arrived', label: 'Arrived', icon: <MapPin className="w-3.5 h-3.5" /> },
    { status: 'otp_started', label: 'OTP Start', icon: <Key className="w-3.5 h-3.5" /> },
    { status: 'in_progress', label: 'In Progress', icon: <Wrench className="w-3.5 h-3.5" /> },
    { status: 'completed', label: 'Completed', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
  ];

  const statusOrder: BookingStatus[] = [
    'confirmed',
    'assigned',
    'accepted',
    'en_route',
    'arrived',
    'otp_started',
    'in_progress',
    'completed'
  ];

  const currentIdx = statusOrder.indexOf(currentStatus);
  const activeStepNum = currentIdx >= 0 ? currentIdx + 1 : 4;
  const progressPercent = Math.min(100, Math.max(0, (currentIdx / (steps.length - 1)) * 100));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#003426]" />
          <span>Job Progress Tracker</span>
        </span>
        <span className="text-[11px] font-bold text-[#003426] bg-[#b4efd6]/50 px-2 py-0.5 rounded-full border border-[#b4efd6]">
          Step {activeStepNum} of {steps.length}
        </span>
      </div>

      {/* Horizontal Scrollable Stepper Track */}
      <div className="relative overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex items-center min-w-[560px] justify-between relative pt-1">
          {/* Background track line */}
          <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 z-0"></div>

          {/* Active progress fill line */}
          <div
            className="absolute left-6 top-4 h-0.5 bg-[#003426] z-0 transition-all duration-500"
            style={{ width: `${progressPercent * 0.88}%` }}
          ></div>

          {/* Stepper nodes */}
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIdx;
            const isActive = idx === currentIdx;

            return (
              <div key={step.status} className="flex flex-col items-center gap-1.5 z-10 w-16">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCompleted
                      ? 'bg-[#003426] text-white shadow-xs'
                      : isActive
                      ? 'bg-[#fea619] text-amber-950 font-bold shadow-md ring-4 ring-amber-200 animate-bounce'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-[10px] leading-tight text-center font-medium ${
                    isActive
                      ? 'text-[#855300] font-bold'
                      : isCompleted
                      ? 'text-slate-800 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
