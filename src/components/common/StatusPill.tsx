import React from 'react';
import { BookingStatus } from '../../types';

interface StatusPillProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, size = 'sm' }) => {
  const configs: Record<BookingStatus, { label: string; bg: string; text: string; dot?: string }> = {
    confirmed: { label: 'Confirmed', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500' },
    assigned: { label: 'Assigned', bg: 'bg-sky-50 text-sky-800 border-sky-200', text: 'text-sky-800', dot: 'bg-sky-500' },
    accepted: { label: 'Accepted', bg: 'bg-blue-50 text-blue-800 border-blue-200', text: 'text-blue-800', dot: 'bg-blue-500' },
    en_route: { label: 'En Route', bg: 'bg-amber-100 text-amber-900 border-amber-300', text: 'text-amber-900', dot: 'bg-amber-500 animate-ping' },
    arrived: { label: 'Arrived at Gate', bg: 'bg-purple-50 text-purple-800 border-purple-200', text: 'text-purple-800', dot: 'bg-purple-500' },
    otp_started: { label: 'OTP Verified', bg: 'bg-indigo-50 text-indigo-800 border-indigo-200', text: 'text-indigo-800', dot: 'bg-indigo-500' },
    in_progress: { label: 'In Progress', bg: 'bg-teal-50 text-teal-800 border-teal-200', text: 'text-teal-800', dot: 'bg-teal-500 animate-pulse' },
    completed: { label: 'Completed', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', text: 'text-emerald-900', dot: 'bg-emerald-600' },
    cancelled: { label: 'Cancelled', bg: 'bg-rose-50 text-rose-800 border-rose-200', text: 'text-rose-800', dot: 'bg-rose-500' }
  };

  const config = configs[status] || configs.confirmed;
  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${padding}`}>
      {config.dot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      <span>{config.label}</span>
    </span>
  );
};
