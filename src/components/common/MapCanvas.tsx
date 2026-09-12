import React, { useState, useEffect } from 'react';
import { Navigation, Compass, MapPin, Radio, RefreshCw, Bike } from 'lucide-react';

interface MapCanvasProps {
  providerName?: string;
  destinationText?: string;
  etaMinutes?: number;
  distanceKm?: number;
  interactive?: boolean;
  onRecenter?: () => void;
  onRefreshGps?: () => void;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  providerName = 'Rajesh',
  destinationText = 'Indiranagar, 4th Cross',
  etaMinutes = 12,
  distanceKm = 2.3,
  interactive = true,
  onRecenter,
  onRefreshGps
}) => {
  const [pinStep, setPinStep] = useState(0);
  const [isRecentering, setIsRecentering] = useState(false);
  const [gpsUpdatedText, setGpsUpdatedText] = useState('Provider GPS updated 15s ago');

  const routeSteps = [
    { top: '108px', left: '134px' },
    { top: '116px', left: '144px' },
    { top: '128px', left: '158px' },
    { top: '136px', left: '178px' },
    { top: '148px', left: '210px' },
    { top: '165px', left: '245px' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPinStep((prev) => (prev + 1) % routeSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [routeSteps.length]);

  const handleRecenter = () => {
    setIsRecentering(true);
    setTimeout(() => setIsRecentering(false), 500);
    onRecenter?.();
  };

  const handleRefresh = () => {
    setGpsUpdatedText('Refreshing provider telemetry...');
    setTimeout(() => {
      setGpsUpdatedText('Provider GPS updated just now');
      onRefreshGps?.();
    }, 700);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#ebf0f5] shadow-sm border border-slate-200/80">
      {/* Interactive Vector Map SVG */}
      <div className="relative w-full h-80 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          fill="none"
          viewBox="0 0 400 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#EBF0F5" height="320" width="400" />
          {/* Parks / Greenery */}
          <path
            d="M10 20C40 18 60 45 80 50C100 55 130 30 140 60C145 75 120 110 85 115C50 120 20 90 10 70Z"
            fill="#D2E9DC"
            opacity="0.8"
          />
          <path
            d="M280 180C310 170 340 190 370 185C390 180 395 230 380 260C360 280 320 270 300 250C280 230 260 200 280 180Z"
            fill="#D2E9DC"
            opacity="0.7"
          />

          {/* Buildings */}
          <rect fill="#DAE2EC" height="60" opacity="0.6" rx="4" width="45" x="25" y="140" />
          <rect fill="#DAE2EC" height="40" opacity="0.6" rx="4" width="55" x="80" y="150" />
          <rect fill="#DAE2EC" height="40" opacity="0.5" rx="4" width="110" x="25" y="215" />
          <rect fill="#DAE2EC" height="45" opacity="0.6" rx="4" width="70" x="210" y="25" />
          <rect fill="#DAE2EC" height="60" opacity="0.5" rx="4" width="60" x="295" y="30" />
          <rect fill="#DAE2EC" height="50" opacity="0.5" rx="4" width="50" x="240" y="90" />

          {/* Secondary streets */}
          <path d="M0 65H400" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0 210H400" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M150 0V320" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M280 0V320" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0 270L150 270L280 230L400 230" stroke="#FFFFFF" strokeWidth="5" />

          {/* Main Arterial Road (100 Feet Rd) */}
          <path
            d="M-10 125C120 125 150 120 230 150C310 180 330 200 410 200"
            stroke="#CBD7E3"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <path
            d="M-10 125C120 125 150 120 230 150C310 180 330 200 410 200"
            stroke="#FAF8FF"
            strokeLinecap="round"
            strokeWidth="8"
          />

          {/* Road Typographic Annotations */}
          <text fill="#64748b" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.5" x="18" y="118">
            100 FEET RD • INDIRANAGAR
          </text>
          <text fill="#64748b" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="600" transform="rotate(90 156 295)" x="156" y="295">
            12TH MAIN ROAD
          </text>
          <text fill="#64748b" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fontWeight="600" x="300" y="222">
            4TH CROSS BENT
          </text>

          {/* Dynamic Transit Route Path */}
          <path
            d="M75 80L150 80L150 130L230 150L280 180L280 235L315 235"
            id="route-guide"
            stroke="#003426"
            strokeDasharray="6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          {/* Active Traveled Glow Segment */}
          <path d="M75 80L150 80L150 130" stroke="#0F4C3A" strokeLinecap="round" strokeWidth="5" />

          {/* Destination Location Marker & Pulse Rings */}
          <circle className="animate-pulse" cx="315" cy="235" fill="#B4EFD6" fillOpacity="0.55" r="20" />
          <circle cx="315" cy="235" fill="#003426" r="8" />
          <circle cx="315" cy="235" fill="#FFFFFF" r="3.5" />
        </svg>

        {/* Animated Moving Provider Pin Marker */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-1000 ${
            isRecentering ? 'scale-125' : 'scale-100'
          }`}
          style={{
            top: routeSteps[pinStep].top,
            left: routeSteps[pinStep].left
          }}
        >
          <span className="absolute -inset-2.5 rounded-full bg-emerald-400 opacity-70 animate-ping"></span>
          <div className="relative w-11 h-11 rounded-full bg-[#003426] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Bike className="w-5 h-5 text-[#b4efd6]" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#003426] text-white font-display text-[10px] uppercase font-bold tracking-tight shadow-md flex items-center gap-1 border border-emerald-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b4efd6] animate-pulse"></span>
            <span>{providerName}</span>
          </div>
        </div>

        {/* Destination Callout Tag */}
        <div className="absolute bottom-14 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 shadow-md border border-slate-100">
          <MapPin className="w-4 h-4 text-[#003426] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold leading-tight">Your Location</span>
            <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[130px]">{destinationText}</span>
          </div>
        </div>

        {/* Floating ETA & Distance Badge */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-2 pointer-events-auto border border-slate-100">
            <Navigation className="w-4 h-4 text-[#003426]" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-slate-900 text-sm">{etaMinutes}</span>
              <span className="text-xs text-slate-500 font-medium">mins</span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-xs text-[#003426] font-bold">{distanceKm} km away</span>
            </div>
          </div>

          {interactive && (
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                onClick={handleRecenter}
                aria-label="Recenter map"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95 border border-slate-100"
                title="Recenter Map"
              >
                <Compass className="w-4 h-4 text-[#003426]" />
              </button>
              <button
                onClick={handleRefresh}
                aria-label="Refresh GPS telemetry"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95 border border-slate-100"
                title="Sync Live GPS"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Traffic Indicator Strip */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm border border-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Smooth traffic via 100 Feet Rd</span>
        </div>
      </div>

      {/* GPS Status Footer Bar */}
      <div className="px-4 py-2 bg-slate-50/90 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#003426] animate-pulse" />
          <span>{gpsUpdatedText}</span>
        </div>
        <div className="flex items-center gap-1 text-[#003426] font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#003426]"></span>
          <span>Live Satellite Active</span>
        </div>
      </div>
    </div>
  );
};
