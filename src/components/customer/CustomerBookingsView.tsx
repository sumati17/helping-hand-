import React, { useState } from 'react';
import { Booking } from '../../types';
import { StatusPill } from '../common/StatusPill';
import { Navigation, Calendar, MapPin, ArrowRight, X, AlertTriangle, RefreshCw } from 'lucide-react';

interface CustomerBookingsViewProps {
  bookings: Booking[];
  onTrackBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string, reason: string) => void;
  onRebook: (serviceId: string) => void;
}

export const CustomerBookingsView: React.FC<CustomerBookingsViewProps> = ({
  bookings,
  onTrackBooking,
  onCancelBooking,
  onRebook,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of schedule');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'active') return b.status !== 'completed' && b.status !== 'cancelled';
    if (activeTab === 'completed') return b.status === 'completed';
    return b.status === 'cancelled';
  });

  const handleConfirmCancel = () => {
    if (selectedBookingForCancel) {
      onCancelBooking(selectedBookingForCancel.id, cancelReason);
      setSelectedBookingForCancel(null);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display font-black text-xl text-slate-900">Your Bookings</h1>
          <p className="text-xs text-slate-500">Track current orders & manage your service history</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-slate-100 mb-4">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'cancelled' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-3.5">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-xs text-slate-400">
            No {activeTab} bookings found.
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">#{b.id}</span>
                <StatusPill status={b.status} />
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <h3 className="font-display font-bold text-sm text-slate-900">{b.serviceTitle}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {b.date} • {b.timeSlot}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[220px]">
                      {b.address.unit}, {b.address.area}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display font-black text-sm text-[#003426]">₹{b.pricing.totalPayable}</span>
                  <span className="text-[10px] text-slate-400 block capitalize">
                    {b.paymentStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {b.provider && (
                <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <img
                      src={b.provider.photoUrl}
                      alt={b.provider.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="font-semibold">{b.provider.name}</span>
                  </div>
                  {b.status !== 'completed' && b.status !== 'cancelled' && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      OTP: {b.otpCode}
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                {b.status !== 'completed' && b.status !== 'cancelled' ? (
                  <>
                    <button
                      onClick={() => setSelectedBookingForCancel(b)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => onTrackBooking(b)}
                      className="px-4 py-2 rounded-xl bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#b4efd6]" />
                      <span>Track Live</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onRebook(b.serviceId)}
                    className="px-4 py-2 rounded-xl bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#b4efd6]" />
                    <span>Rebook Service</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancellation Reason Modal */}
      {selectedBookingForCancel && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-display font-bold text-base">Cancel Booking #{selectedBookingForCancel.id}</h3>
              </div>
              <button
                onClick={() => setSelectedBookingForCancel(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your ₹{selectedBookingForCancel.pricing.totalPayable} will be immediately refunded to your original payment
              source per our 100% Escrow Refund Policy.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-700">Select Cancellation Reason</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
              >
                <option value="Change of schedule">Change of schedule</option>
                <option value="Found alternative local helper">Found alternative local helper</option>
                <option value="Accidental booking">Accidental booking</option>
                <option value="Delay in provider arrival">Delay in provider arrival</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedBookingForCancel(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
