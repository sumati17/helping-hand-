import React from 'react';
import { UserRole } from '../../types';
import { Home, Calendar, Navigation, User, Briefcase, DollarSign, Layers } from 'lucide-react';

interface BottomNavProps {
  currentRole: UserRole;
  activeCustomerTab: 'explore' | 'bookings' | 'tracking';
  onCustomerTabChange: (tab: 'explore' | 'bookings' | 'tracking') => void;
  hasActiveBooking?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentRole,
  activeCustomerTab,
  onCustomerTabChange,
  hasActiveBooking = true,
}) => {
  if (currentRole === 'admin') return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {currentRole === 'customer' ? (
          <>
            <button
              onClick={() => onCustomerTabChange('explore')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                activeCustomerTab === 'explore' ? 'text-[#003426] font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className={`w-5 h-5 ${activeCustomerTab === 'explore' ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-[10px]">Explore</span>
            </button>

            <button
              onClick={() => onCustomerTabChange('bookings')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                activeCustomerTab === 'bookings' ? 'text-[#003426] font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Calendar className={`w-5 h-5 ${activeCustomerTab === 'bookings' ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-[10px]">Bookings</span>
            </button>

            {hasActiveBooking && (
              <button
                onClick={() => onCustomerTabChange('tracking')}
                className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  activeCustomerTab === 'tracking' ? 'text-[#003426] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className="absolute -top-0.5 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <Navigation className={`w-5 h-5 ${activeCustomerTab === 'tracking' ? 'stroke-[2.5px]' : ''}`} />
                <span className="text-[10px]">Live Track</span>
              </button>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full px-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 text-[#003426]">
                <Briefcase className="w-4 h-4 text-[#003426]" />
                <span>Partner Mode: Rajesh Kumar</span>
              </span>
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                Ather 450X Connected
              </span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
