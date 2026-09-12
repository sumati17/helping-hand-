import React from 'react';
import { ShieldCheck, PhoneCall, MessageCircle, AlertTriangle, X, Check } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#003426] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">SafeShield Protection Desk</h3>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">24/7 Priority Emergency Support</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col gap-1.5 text-xs text-emerald-950">
          <span className="font-bold">Our 3 Core Guarantees:</span>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>100% Escrow Hold: Money released only with your 4-digit OTP.</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Free 24h Rework or Full Refund if not 100% delighted.</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Comprehensive Damage Insurance up to ₹10,000 per job.</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => {
              alert('Connecting you to Bangalore Operations Escalation Desk (Toll Free: 1800-419-HELP)');
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#003426] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0f4c3a] transition-all"
          >
            <PhoneCall className="w-4 h-4 text-[#b4efd6]" />
            <span>Call Safety Response Hotline</span>
          </button>

          <button
            onClick={() => {
              alert('Support specialist joined in-app live chat.');
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-slate-600" />
            <span>Start Priority WhatsApp / Web Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
