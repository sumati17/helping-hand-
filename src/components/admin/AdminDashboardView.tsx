import React, { useState } from 'react';
import { Booking, Provider, ServiceItem, AuditLog, BookingStatus } from '../../types';
import { StatusPill } from '../common/StatusPill';
import { 
  Users, Calendar, DollarSign, ShieldAlert, CheckCircle2, XCircle, Search, 
  Filter, ArrowUpDown, Plus, ShieldCheck, AlertTriangle, FileText, Check, 
  RefreshCw, TrendingUp, Zap, ChevronRight, Layers, Eye
} from 'lucide-react';

interface AdminDashboardViewProps {
  bookings: Booking[];
  providers: Provider[];
  services: ServiceItem[];
  auditLogs: AuditLog[];
  onReassignProvider: (bookingId: string, providerId: string) => void;
  onUpdateProviderStatus: (providerId: string, status: Provider['approvalStatus']) => void;
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onAddNewService: (service: Omit<ServiceItem, 'id'>) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  bookings,
  providers,
  services,
  auditLogs,
  onReassignProvider,
  onUpdateProviderStatus,
  onUpdateBookingStatus,
  onAddNewService,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'bookings' | 'providers' | 'services' | 'escrow' | 'logs'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBookingForReassign, setSelectedBookingForReassign] = useState<Booking | null>(null);
  const [targetProviderId, setTargetProviderId] = useState(providers[0]?.id || '');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // New service form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('cleaning');
  const [newPrice, setNewPrice] = useState(799);
  const [newDuration, setNewDuration] = useState('1.5 hrs');
  const [newDescription, setNewDescription] = useState('');

  // Metrics
  const totalBookings = 1245 + bookings.length - 3;
  const activeProvidersCount = providers.filter(p => p.activeDuty).length;
  const pendingApprovalsCount = providers.filter(p => p.approvalStatus === 'pending').length;
  const totalEscrowLocked = bookings
    .filter(b => b.paymentStatus === 'paid_escrow')
    .reduce((sum, b) => sum + b.pricing.totalPayable, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesQuery =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const handleConfirmReassign = () => {
    if (selectedBookingForReassign && targetProviderId) {
      onReassignProvider(selectedBookingForReassign.id, targetProviderId);
      setSelectedBookingForReassign(null);
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNewService({
      categoryId: newCategory,
      title: newTitle,
      shortDescription: newDescription.slice(0, 75) || 'Professional certified doorstep care',
      description: newDescription || 'Standard multi-zone service executed by verified specialists with non-toxic solutions.',
      price: Number(newPrice),
      originalPrice: Math.round(Number(newPrice) * 1.3),
      discountPercentage: 25,
      rating: 4.8,
      reviewsCount: 1,
      duration: newDuration,
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      badge: 'New Launch',
      inclusions: [
        { title: 'Standard Diagnostics', description: 'Complete system inspection and safety verification.' },
        { title: 'Certified Execution', description: 'High-grade tools and parts included.' }
      ],
      exclusions: ['Civil structural work'],
      requirements: 'Standard electricity and water access.'
    });

    setShowAddServiceModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-24">
      {/* Admin Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#003426] text-[#b4efd6] text-xs font-bold uppercase tracking-wider">
              Authority Operations Center
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500 font-medium">Real-Time Dispatch Engine Active</span>
          </div>
          <h1 className="font-display font-black text-2xl text-slate-900 mt-1">Platform Operations & Control</h1>
          <p className="text-xs text-slate-500">Oversee bookings, verified providers, escrow settlements, and audit trails</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddServiceModal(true)}
            className="px-4 py-2.5 bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#b4efd6]" />
            <span>Add Service Catalog</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics Bento */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#003426]" />
          </div>
          <span className="font-display font-black text-2xl text-slate-900">{totalBookings}</span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.8% this month
          </span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Providers</span>
            <Users className="w-4 h-4 text-sky-700" />
          </div>
          <span className="font-display font-black text-2xl text-slate-900">
            {activeProvidersCount} <span className="text-sm font-normal text-slate-400">/ {providers.length}</span>
          </span>
          <span className="text-[11px] text-slate-500">
            {pendingApprovalsCount} pending verification
          </span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Escrow Vault Held</span>
            <DollarSign className="w-4 h-4 text-[#855300]" />
          </div>
          <span className="font-display font-black text-2xl text-[#003426]">₹{totalEscrowLocked}</span>
          <span className="text-[11px] text-amber-800 font-semibold">100% Locked until OTP</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Quality Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="font-display font-black text-2xl text-slate-900">98.6%</span>
          <span className="text-[11px] text-emerald-700 font-semibold">0 Escrow Disputes</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <Layers className="w-4 h-4" /> },
          { id: 'bookings', label: `Bookings (${bookings.length})`, icon: <Calendar className="w-4 h-4" /> },
          { id: 'providers', label: `Providers & KYC (${providers.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'services', label: `Service Catalog (${services.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'escrow', label: 'Escrow & Revenue', icon: <DollarSign className="w-4 h-4" /> },
          { id: 'logs', label: `Audit Trail (${auditLogs.length})`, icon: <ShieldAlert className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all ${
              adminTab === tab.id
                ? 'bg-[#003426] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          {/* Dispatch Alerts & Quick Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">Live Active Orders</h3>
                  <p className="text-xs text-slate-500">Real-time status updates across all local areas</p>
                </div>
                <button
                  onClick={() => setAdminTab('bookings')}
                  className="text-xs font-bold text-[#003426] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-2">Booking</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Provider</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-3 font-semibold text-slate-900">
                          <div>#{b.id}</div>
                          <span className="text-[10px] text-slate-400 truncate max-w-[120px] block">{b.serviceTitle}</span>
                        </td>
                        <td className="py-3">
                          <div className="font-semibold text-slate-800">{b.customerName}</div>
                          <span className="text-[10px] text-slate-400">{b.address.area}</span>
                        </td>
                        <td className="py-3">
                          {b.provider ? (
                            <span className="font-medium text-slate-700">{b.provider.name}</span>
                          ) : (
                            <span className="text-amber-600 font-bold">Unassigned</span>
                          )}
                        </td>
                        <td className="py-3">
                          <StatusPill status={b.status} />
                        </td>
                        <td className="py-3 font-bold text-[#003426]">₹{b.pricing.totalPayable}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedBookingForReassign(b);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verification Queue Preview */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900">KYC Approvals</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  {pendingApprovalsCount} Needs Action
                </span>
              </div>
              <p className="text-xs text-slate-500">Verify government photo IDs and police clearance records</p>

              <div className="flex flex-col gap-2.5 mt-2">
                {providers.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img src={p.photoUrl} alt={p.name} className="w-9 h-9 rounded-xl object-cover border" />
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-xs text-slate-900">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.roleTitle}</span>
                      </div>
                    </div>
                    {p.approvalStatus === 'approved' ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => onUpdateProviderStatus(p.id, 'approved')}
                        className="px-3 py-1 rounded-lg bg-[#003426] text-white text-[11px] font-bold"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS MANAGEMENT */}
      {adminTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer or service..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="assigned">Assigned</option>
                <option value="accepted">Accepted</option>
                <option value="en_route">En Route</option>
                <option value="arrived">Arrived</option>
                <option value="otp_started">OTP Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-2.5">ID & Service</th>
                  <th className="pb-2.5">Customer & Phone</th>
                  <th className="pb-2.5">Address</th>
                  <th className="pb-2.5">Slot</th>
                  <th className="pb-2.5">Provider</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5">SafeStart OTP</th>
                  <th className="pb-2.5">Escrow</th>
                  <th className="pb-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3">
                      <div className="font-bold text-slate-900">#{b.id}</div>
                      <span className="text-[11px] text-slate-500">{b.serviceTitle}</span>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-800">{b.customerName}</div>
                      <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-700 truncate max-w-[140px] block">{b.address.area}</span>
                      <span className="text-[10px] text-slate-400">{b.address.unit}</span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      <div>{b.date.slice(0, 10)}</div>
                      <span className="text-[10px] text-slate-400">{b.timeSlot}</span>
                    </td>
                    <td className="py-3">
                      {b.provider ? (
                        <div className="flex items-center gap-1.5">
                          <img src={b.provider.photoUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="font-medium text-slate-800">{b.provider.name}</span>
                        </div>
                      ) : (
                        <span className="text-amber-700 font-bold">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3">
                      <StatusPill status={b.status} />
                    </td>
                    <td className="py-3">
                      <span className="font-display font-black text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {b.otpCode}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="font-bold text-[#003426]">₹{b.pricing.totalPayable}</div>
                      <span className="text-[9px] text-slate-400 capitalize">{b.paymentStatus.replace('_', ' ')}</span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBookingForReassign(b)}
                          className="px-2.5 py-1 rounded-lg bg-[#003426] text-white text-[11px] font-bold hover:bg-[#0f4c3a]"
                        >
                          Reassign
                        </button>
                        {b.status !== 'completed' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                            title="Force Complete / Sign-off"
                            className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-[11px] font-bold hover:bg-emerald-200"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROVIDERS & KYC */}
      {adminTab === 'providers' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">Verified Providers Directory</h3>
              <p className="text-xs text-slate-500">Manage credentials, police verifications, and active status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((p) => (
              <div key={p.id} className="p-4 rounded-3xl border border-slate-200 bg-slate-50/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.photoUrl} alt={p.name} className="w-12 h-12 rounded-2xl object-cover border" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-sm text-slate-900">{p.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#003426] text-[10px] font-bold">
                          {p.tier}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{p.roleTitle}</span>
                      <span className="text-[10px] text-slate-400">{p.phone}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      p.approvalStatus === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.approvalStatus === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {p.approvalStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-200/60">
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Rating</span>
                    <span className="font-bold text-slate-800">{p.rating} ★</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Jobs Done</span>
                    <span className="font-bold text-slate-800">{p.completedJobsCount}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Duty Status</span>
                    <span className={`font-bold ${p.activeDuty ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {p.activeDuty ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Police Check Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.approvalStatus !== 'approved' && (
                      <button
                        onClick={() => onUpdateProviderStatus(p.id, 'approved')}
                        className="px-3 py-1 rounded-xl bg-[#003426] text-white font-bold text-xs"
                      >
                        Approve KYC
                      </button>
                    )}
                    {p.approvalStatus === 'approved' && (
                      <button
                        onClick={() => onUpdateProviderStatus(p.id, 'suspended')}
                        className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SERVICE CATALOG */}
      {adminTab === 'services' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">Active Service Catalog</h3>
              <p className="text-xs text-slate-500">Live doorstep services offered to Bangalore residents</p>
            </div>
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="px-3.5 py-2 bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold rounded-xl flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#b4efd6]" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="p-4 rounded-3xl border border-slate-200 bg-white flex flex-col gap-3">
                <div className="h-32 rounded-2xl overflow-hidden bg-slate-100 relative">
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#003426]">
                    {s.badge || 'Available'}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{s.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-display font-black text-base text-[#003426]">₹{s.price}</span>
                  <span className="text-slate-400">{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ESCROW & REVENUE */}
      {adminTab === 'escrow' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-in fade-in">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">Escrow Settlement Ledger</h3>
            <p className="text-xs text-slate-500">Track RBI-compliant funds flow, escrow lock, and provider releases</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#003426] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Vault Status</span>
              <div className="font-display font-black text-2xl mt-1">₹{totalEscrowLocked} Currently Locked in Escrow</div>
              <p className="text-xs text-emerald-100/80 mt-1">
                Security funds released to partner account instantly upon customer SafeStart OTP handshake.
              </p>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-xl text-center">
              <span className="text-[10px] text-emerald-200 block uppercase">Platform 15% Split</span>
              <span className="font-display font-black text-xl text-[#b4efd6]">₹{Math.round(totalEscrowLocked * 0.15)}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-2">Txn ID</th>
                  <th className="pb-2">Booking</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Provider Split (75%)</th>
                  <th className="pb-2">Platform Fee (25%)</th>
                  <th className="pb-2">Escrow Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono text-[11px] text-slate-500">TXN-88{b.id.replace('BK-', '')}</td>
                    <td className="py-3 font-bold text-slate-900">#{b.id}</td>
                    <td className="py-3 text-slate-700">{b.customerName}</td>
                    <td className="py-3 font-bold text-emerald-800">₹{b.pricing.providerEarnings}</td>
                    <td className="py-3 text-slate-600">₹{b.pricing.platformFee}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.paymentStatus === 'paid_escrow'
                            ? 'bg-amber-100 text-amber-900'
                            : b.paymentStatus === 'released_to_provider'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {b.paymentStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT TRAIL */}
      {adminTab === 'logs' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-in fade-in">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">System Audit Trail</h3>
            <p className="text-xs text-slate-500">Immutable ledger of admin decisions, OTP verifications, and financial movements</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      log.severity === 'critical'
                        ? 'bg-rose-100 text-rose-800'
                        : log.severity === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-[#003426]'
                    }`}
                  >
                    !
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span className="text-[10px] text-slate-400">{log.target}</span>
                    </div>
                    <p className="text-slate-600 text-xs mt-0.5">{log.details}</p>
                    <span className="text-[10px] text-slate-400 mt-1">Actor: {log.actor} • {log.timestamp}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400">{log.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Provider Reassignment Modal */}
      {selectedBookingForReassign && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900">
                Reassign Booking #{selectedBookingForReassign.id}
              </h3>
              <button
                onClick={() => setSelectedBookingForReassign(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex flex-col gap-1">
              <span className="font-bold text-slate-800">{selectedBookingForReassign.serviceTitle}</span>
              <span>Customer: {selectedBookingForReassign.customerName} ({selectedBookingForReassign.address.area})</span>
              <span>Current Status: {selectedBookingForReassign.status}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Select Available Certified Provider</label>
              <select
                value={targetProviderId}
                onChange={(e) => setTargetProviderId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.roleTitle} • {p.rating}★ • {p.approvalStatus})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedBookingForReassign(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReassign}
                className="flex-1 py-2.5 rounded-xl bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateService}
            className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900">Add New Doorstep Service</h3>
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">Service Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sofa Shampooing & Fabric Care"
                className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
                >
                  <option value="cleaning">Cleaning</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="carwash">Car Wash</option>
                  <option value="electrical">Electrical</option>
                  <option value="appliances">Appliances</option>
                  <option value="painting">Painting</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">Duration</label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="e.g. 1.5 - 2 hrs"
                className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Thorough industrial extraction..."
                className="p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#003426] hover:bg-[#0f4c3a] text-white text-xs font-bold"
              >
                Publish to Marketplace
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
