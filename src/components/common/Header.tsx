import React, { useState } from 'react';
import { UserRole } from '../../types';
import { MapPin, ChevronDown, Bell, Shield, User, Sparkles, Check } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedAddress?: string;
  onAddressChange?: (address: string) => void;
  onOpenNotifications?: () => void;
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedAddress = 'Indiranagar, Bengaluru',
  onAddressChange,
  onOpenNotifications,
  onOpenHelp,
}) => {
  const [showAddressMenu, setShowAddressMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const addresses = [
    'Indiranagar, Bengaluru',
    'Koramangala 4th Block, Bengaluru',
    'Bellandur, Outer Ring Rd',
    'Whitefield, Bengaluru'
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#003426] flex items-center justify-center text-[#b4efd6] shadow-sm">
              <span className="font-display font-black text-lg tracking-tight">H</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-[#003426] tracking-tight">Helping Hand</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-semibold tracking-wide uppercase">
                  Verified
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden md:inline">Reliable help, right at your doorstep</span>
            </div>
          </div>

          {/* Location Selector (Customer / Provider Mode) */}
          {currentRole !== 'admin' && (
            <div className="relative ml-1">
              <button
                onClick={() => setShowAddressMenu(!showAddressMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 font-medium hover:bg-slate-50 transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0f4c3a]" />
                <span className="max-w-[120px] sm:max-w-[160px] truncate">{selectedAddress}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showAddressMenu && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Service Locations
                  </div>
                  {addresses.map((addr) => (
                    <button
                      key={addr}
                      onClick={() => {
                        onAddressChange?.(addr);
                        setShowAddressMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="truncate">{addr}</span>
                      {selectedAddress === addr && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center / Right: Role Switcher & Persona Actions */}
        <div className="flex items-center gap-2">
          {/* Persona Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#003426] text-white hover:bg-[#0f4c3a] transition-all text-xs font-semibold shadow-xs"
              title="Switch user view for evaluation"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b4efd6]" />
              <span className="capitalize">
                {currentRole === 'customer' ? 'Customer App' : currentRole === 'provider' ? 'Provider App' : 'Admin Web'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select User Experience
                </div>
                <button
                  onClick={() => {
                    onRoleChange('customer');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between hover:bg-emerald-50 ${
                    currentRole === 'customer' ? 'bg-emerald-50 text-[#003426] font-bold' : 'text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>👤 Customer App (Mobile)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Pooja M. • Booking & Live Tracking</span>
                  </div>
                  {currentRole === 'customer' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
                <button
                  onClick={() => {
                    onRoleChange('provider');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between hover:bg-emerald-50 ${
                    currentRole === 'provider' ? 'bg-emerald-50 text-[#003426] font-bold' : 'text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>👷 Provider App (Mobile)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Rajesh Kumar • Offers & Transit OTP</span>
                  </div>
                  {currentRole === 'provider' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
                <button
                  onClick={() => {
                    onRoleChange('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-xs flex items-center justify-between hover:bg-emerald-50 ${
                    currentRole === 'admin' ? 'bg-emerald-50 text-[#003426] font-bold' : 'text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>💻 Admin Dashboard (Web)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Operations, Verification & Revenue</span>
                  </div>
                  {currentRole === 'admin' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#003426] hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fea619] ring-2 ring-white"></span>
          </button>

          {/* Help / Safety button */}
          <button
            onClick={onOpenHelp}
            aria-label="Help and safety guarantee"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#003426] hover:bg-slate-50 transition-colors shadow-xs"
            title="SafeShield 24/7 Protection"
          >
            <Shield className="w-4 h-4 text-[#0f4c3a]" />
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-xs bg-emerald-100 flex items-center justify-center">
            {currentRole === 'customer' ? (
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9dE5V9IWAZVl_w0VJMBRrV9mbQ4w4neE2pZXqpk-27FR-w-79pcHTOitHQAKHgKaiB4ma-nI7OTRAiszsEq-KBjiosYasIKTyDyORC8w1pgJ07l3A6aaN5unJn_DZyuQi7WqkMa-tAWc917gpq1Rsrm2_uGTVpCiVK203baKrhcFf1zpC2_WS7HkpmwnJz68gWTrwsnOXGmVXLEllRlx1a5_uv1Ot--d-esuq_PHCdP5HUzKhl1Z5g"
                alt="Pooja M."
                className="w-full h-full object-cover"
              />
            ) : currentRole === 'provider' ? (
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHgwaoVBsp697kBTw29XGsbF1mHAVrl8ZJ6S6iqgvyZssiW_GhhBr0OeWPPxi0jx4bPB6G0_xoT30moGAwYnagbY4M-J84QYS95mMpXwlMmF6udam9g83zkjK0G92QK17VGmtHZ7KiDn2H7RHgDShh-g25G7cp5Zq2uvnJJVbPxqcuh3Obb7GWmkNkgIICh3gjjBJZCoHA2dGXBVtmKGGDmxpCog2Whi-sA11dRNUZi3g4k5fl6bK1vQ"
                alt="Rajesh Kumar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#003426] text-[#b4efd6] flex items-center justify-center font-bold text-xs">
                OP
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
