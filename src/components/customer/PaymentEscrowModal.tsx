import React, { useState } from 'react';
import { Booking } from '../../types';
import { ArrowLeft, ShieldCheck, Lock, CreditCard, CheckCircle2, ChevronDown, Check, Loader2 } from 'lucide-react';

interface PaymentEscrowModalProps {
  amount: number;
  onBack: () => void;
  onPaymentSuccess: (method: Booking['paymentMethod']) => void;
}

export const PaymentEscrowModal: React.FC<PaymentEscrowModalProps> = ({
  amount = 1726,
  onBack,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<Booking['paymentMethod']>('gpay');
  const [cvv, setCvv] = useState('892');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  const handlePay = () => {
    setFormError('');
    if (selectedMethod === 'card' && (!cvv || cvv.length < 3)) {
      setFormError('Please enter a valid 3-digit CVV to authorize the escrow hold.');
      return;
    }

    setIsProcessing(true);
    // Simulate real gateway handshake & escrow token lock
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(selectedMethod);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8ff] overflow-y-auto pb-28 animate-in slide-in-from-right duration-200">
      <div className="max-w-lg mx-auto min-h-screen bg-[#faf8ff] flex flex-col">
        {/* Top Stepper Bar */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/60 shadow-xs">
          <button
            onClick={onBack}
            disabled={isProcessing}
            aria-label="Back"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 4 of 4</span>
            <span className="font-display font-bold text-xs sm:text-sm text-slate-900">100% Escrow Protected</span>
          </div>
          <div className="w-9" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Escrow Amount Lock Hero Card */}
          <div className="bg-[#003426] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#b4efd6]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#b4efd6] text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>SafeShield Escrow Vault</span>
            </div>
            <span className="text-xs text-emerald-200 uppercase font-medium tracking-wide">Total Payable Amount</span>
            <div className="font-display font-black text-3xl sm:text-4xl text-white my-1">₹{amount}</div>
            <p className="text-[11px] text-emerald-100/80 max-w-xs mt-1">
              Your money stays locked safely in escrow until you share the SafeStart OTP after verifying doorstep satisfaction.
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-medium">
              {formError}
            </div>
          )}

          {/* Payment Method Category 1: UPI Options */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">UPI Instant Payment</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Zero Surcharge
              </span>
            </div>

            {/* Google Pay */}
            <div
              onClick={() => setSelectedMethod('gpay')}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedMethod === 'gpay'
                  ? 'bg-emerald-50/50 border-[#003426] ring-1 ring-[#003426]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shadow-xs">
                  GPay
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Google Pay</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Recommended • Instant Authorization</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'gpay' ? 'bg-[#003426] border-[#003426] text-white' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'gpay' && <Check className="w-3 h-3" />}
              </div>
            </div>

            {/* PhonePe */}
            <div
              onClick={() => setSelectedMethod('phonepe')}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedMethod === 'phonepe'
                  ? 'bg-emerald-50/50 border-[#003426] ring-1 ring-[#003426]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  Pe
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">PhonePe</span>
                  <span className="text-[10px] text-slate-500">UPI app or linked bank account</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'phonepe' ? 'bg-[#003426] border-[#003426] text-white' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'phonepe' && <Check className="w-3 h-3" />}
              </div>
            </div>

            {/* Paytm */}
            <div
              onClick={() => setSelectedMethod('paytm')}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedMethod === 'paytm'
                  ? 'bg-emerald-50/50 border-[#003426] ring-1 ring-[#003426]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00b9f5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  Paytm
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Paytm UPI</span>
                  <span className="text-[10px] text-slate-500">Pay directly from wallet or bank</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'paytm' ? 'bg-[#003426] border-[#003426] text-white' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'paytm' && <Check className="w-3 h-3" />}
              </div>
            </div>
          </div>

          {/* Payment Method Category 2: Credit / Debit Cards */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cards (Credit / Debit)</span>

            {/* Saved Card */}
            <div
              onClick={() => setSelectedMethod('card')}
              className={`p-3.5 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-all ${
                selectedMethod === 'card'
                  ? 'bg-emerald-50/40 border-[#003426] ring-1 ring-[#003426]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    VISA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">HDFC Bank •••• 4289</span>
                    <span className="text-[10px] text-slate-500">Expires 08/27</span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === 'card' ? 'bg-[#003426] border-[#003426] text-white' : 'border-slate-300'
                  }`}
                >
                  {selectedMethod === 'card' && <Check className="w-3 h-3" />}
                </div>
              </div>

              {selectedMethod === 'card' && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3 animate-in fade-in">
                  <span className="text-xs text-slate-600 font-medium">Enter 3-Digit CVV</span>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-20 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-center font-bold text-xs tracking-widest focus:outline-none focus:ring-2 focus:ring-[#003426]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Category 3: Pay After Service */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div
              onClick={() => setSelectedMethod('cod')}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedMethod === 'cod'
                  ? 'bg-emerald-50/50 border-[#003426] ring-1 ring-[#003426]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                  💵
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Pay After Service (Cash / QR)</span>
                  <span className="text-[10px] text-slate-500">Pay specialist at doorstep upon satisfaction</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedMethod === 'cod' ? 'bg-[#003426] border-[#003426] text-white' : 'border-slate-300'
                }`}
              >
                {selectedMethod === 'cod' && <Check className="w-3 h-3" />}
              </div>
            </div>
          </div>

          {/* Institutional Trust Badges */}
          <div className="bg-slate-100/70 rounded-2xl p-3.5 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>256-bit Encrypted</span>
            </span>
            <span>•</span>
            <span>RBI Regulated</span>
            <span>•</span>
            <span className="text-[#003426] font-bold">100% Refundable</span>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Escrow Locked</span>
              <span className="font-display font-black text-xl text-[#003426]">₹{amount}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="flex-1 max-w-[230px] h-12 bg-[#003426] hover:bg-[#0f4c3a] active:scale-95 disabled:opacity-75 text-white rounded-2xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#b4efd6]" />
                  <span>Securing Escrow...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#b4efd6]" />
                  <span>Pay ₹{amount} & Confirm</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
