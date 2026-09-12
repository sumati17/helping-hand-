import React, { useState } from 'react';
import { ServiceCategory, ServiceItem, Booking } from '../../types';
import { Search, SlidersHorizontal, Zap, Star, Clock, ShieldCheck, CheckCircle2, ChevronRight, MapPin, Sparkles, Navigation, Phone, ArrowRight } from 'lucide-react';

interface CustomerExploreViewProps {
  categories: ServiceCategory[];
  services: ServiceItem[];
  activeBooking?: Booking;
  onSelectService: (service: ServiceItem) => void;
  onTrackBooking: (booking: Booking) => void;
}

export const CustomerExploreView: React.FC<CustomerExploreViewProps> = ({
  categories,
  services,
  activeBooking,
  onSelectService,
  onTrackBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.categoryId === selectedCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2">
      {/* 1. Live Active Booking Card (Persistent Dynamic Island style) */}
      {activeBooking && activeBooking.status !== 'completed' && activeBooking.status !== 'cancelled' && (
        <section className="mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100 relative overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#b4efd6]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Status Pill & ETA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#b4efd6] text-[#003426] text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f4c3a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#003426]"></span>
                </span>
                <span>Live Booking</span>
              </div>
              <span className="text-xs font-bold text-[#855300] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ETA 12 mins
              </span>
            </div>

            {/* Provider & Job information */}
            <div className="flex items-center justify-between gap-3 pt-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-emerald-200">
                  <img
                    src={
                      activeBooking.provider?.photoUrl ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHgwaoVBsp697kBTw29XGsbF1mHAVrl8ZJ6S6iqgvyZssiW_GhhBr0OeWPPxi0jx4bPB6G0_xoT30moGAwYnagbY4M-J84QYS95mMpXwlMmF6udam9g83zkjK0G92QK17VGmtHZ7KiDn2H7RHgDShh-g25G7cp5Zq2uvnJJVbPxqcuh3Obb7GWmkNkgIICh3gjjBJZCoHA2dGXBVtmKGGDmxpCog2Whi-sA11dRNUZi3g4k5fl6bK1vQ'
                    }
                    alt={activeBooking.provider?.name || 'Provider'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#003426] rounded-full flex items-center justify-center text-white text-[9px]">
                    ✓
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-display font-bold text-sm text-slate-900 truncate">
                    {activeBooking.serviceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {activeBooking.provider?.name || 'Rajesh K.'} is on the way to your door
                  </p>
                </div>
              </div>

              <button
                onClick={() => onTrackBooking(activeBooking)}
                className="shrink-0 bg-[#003426] hover:bg-[#0f4c3a] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#b4efd6]" />
                <span>Track</span>
              </button>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#003426] h-full rounded-full w-[65%] transition-all duration-500"></div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Hero Headline & Search */}
      <section className="mb-4">
        <h1 className="font-display text-2xl font-extrabold text-[#003426] tracking-tight leading-tight">
          Trusted local services, right when you need them.
        </h1>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Book reliable home and vehicle services, pay securely, and track your provider from start to finish.
        </p>

        {/* Search input box */}
        <div className="relative w-full mt-3">
          <div className="flex items-center bg-white rounded-2xl border border-slate-200 shadow-xs px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-[#003426]/20 transition-all">
            <Search className="w-4 h-4 text-[#003426] shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service do you need?"
              className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              aria-label="Filter"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-2.5 no-scrollbar -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#003426] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3 h-3 text-[#fea619]" />
            <span>All Services</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#003426] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Service Categories Grid */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-display font-bold text-base text-slate-900">Categories</h2>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-semibold text-[#003426] flex items-center hover:underline"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`bg-white rounded-2xl p-3 flex flex-col items-center text-center border shadow-xs hover:shadow-md transition-all group ${
                  isSelected ? 'border-[#003426] ring-2 ring-[#003426]/10' : 'border-slate-200/80'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform ${cat.color}`}
                >
                  <span className="font-bold text-xs">{cat.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <span className="font-display font-bold text-xs text-slate-900 line-clamp-1">{cat.name}</span>
                <span className="text-[11px] text-[#855300] font-semibold mt-0.5">₹{cat.startingPrice}+</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Popular Services List / Cards */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-bold text-base text-slate-900">Popular Services</h2>
            <p className="text-[11px] text-slate-500">Top-rated local home care booked this week</p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-[#003426] rounded-full text-[10px] font-bold">
            Instant Dispatch
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                {/* Floating Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-slate-100">
                  <Star className="w-3.5 h-3.5 text-[#fea619] fill-current" />
                  <span className="text-xs font-bold text-slate-900">{service.rating}</span>
                  <span className="text-[10px] text-slate-500">({service.reviewsCount})</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#b4efd6]" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{service.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-extrabold text-lg text-[#003426]">₹{service.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{service.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {service.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Peace of Mind Guarantee Banner */}
      <section className="mb-6">
        <div className="bg-[#003426] text-white rounded-2xl p-4 shadow-md relative overflow-hidden flex flex-col gap-2">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#b4efd6]/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#b4efd6] text-[#003426] flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#b4efd6]">
              Peace of Mind Guarantee
            </span>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Free rework or 100% full refund if you aren't completely delighted with the workmanship. Every booking is
            insured up to ₹10,000 for incidental damage.
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] text-[#b4efd6] font-semibold">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Risk
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Support Desk
            </span>
          </div>
        </div>
      </section>

      {/* 6. Why Helping Hand Bento Trust Grid */}
      <section className="mb-4">
        <div className="mb-3">
          <h2 className="font-display font-bold text-base text-slate-900">Why Helping Hand</h2>
          <p className="text-[11px] text-slate-500">Built on institutional trust and certified safety</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#003426] flex items-center justify-center text-sm font-bold">
              🛡️
            </div>
            <h3 className="font-display font-bold text-xs text-slate-900">Verified Providers</h3>
            <p className="text-[11px] text-slate-500 leading-snug">100% Police verification & skill certified.</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#855300] flex items-center justify-center text-sm font-bold">
              🏷️
            </div>
            <h3 className="font-display font-bold text-xs text-slate-900">Transparent Pricing</h3>
            <p className="text-[11px] text-slate-500 leading-snug">Upfront estimates with zero hidden doorstep fees.</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold">
              🔒
            </div>
            <h3 className="font-display font-bold text-xs text-slate-900">Secure Payments</h3>
            <p className="text-[11px] text-slate-500 leading-snug">Funds safely held in escrow until OTP sign-off.</p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-bold">
              📍
            </div>
            <h3 className="font-display font-bold text-xs text-slate-900">Real-Time Tracking</h3>
            <p className="text-[11px] text-slate-500 leading-snug">Live GPS route and direct masked calling.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
