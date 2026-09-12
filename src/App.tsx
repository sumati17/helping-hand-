import React, { useState, useEffect } from 'react';
import { UserRole, ServiceCategory, ServiceItem, Booking, Provider, JobOffer, AuditLog, BookingStatus } from './types';
import { servicesApi } from './api/servicesApi';
import { bookingsApi } from './api/bookingsApi';
import { providersApi } from './api/providersApi';
import { adminApi } from './api/adminApi';
import { marketplaceStore } from './api/store';

import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { HelpSupportModal } from './components/common/HelpSupportModal';
import { LoadingSpinner, ErrorBanner } from './components/common/StateViews';

import { CustomerExploreView } from './components/customer/CustomerExploreView';
import { ServiceDetailModal } from './components/customer/ServiceDetailModal';
import { DateSlotPickerModal } from './components/customer/DateSlotPickerModal';
import { CheckoutReviewModal } from './components/customer/CheckoutReviewModal';
import { PaymentEscrowModal } from './components/customer/PaymentEscrowModal';
import { BookingConfirmationView } from './components/customer/BookingConfirmationView';
import { CustomerLiveTrackingView } from './components/customer/CustomerLiveTrackingView';
import { CustomerBookingsView } from './components/customer/CustomerBookingsView';

import { ProviderDashboardView } from './components/provider/ProviderDashboardView';
import { JobRequestDetailModal } from './components/provider/JobRequestDetailModal';
import { ProviderActiveTransitView } from './components/provider/ProviderActiveTransitView';

import { AdminDashboardView } from './components/admin/AdminDashboardView';

export function App() {
  const [role, setRole] = useState<UserRole>('customer');
  const [customerTab, setCustomerTab] = useState<'explore' | 'bookings' | 'tracking'>('explore');
  const [selectedAddress, setSelectedAddress] = useState('Indiranagar, Bengaluru');
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Data states
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeOffer, setActiveOffer] = useState<JobOffer | null>(null);

  // Customer booking flow states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(0); // 1: DateSlot, 2: CheckoutReview, 3: Payment, 4: Confirmed
  const [selectedDate, setSelectedDate] = useState('Wed, 16 Oct');
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [checkoutNotes, setCheckoutNotes] = useState('');
  const [latestCreatedBooking, setLatestCreatedBooking] = useState<Booking | null>(null);
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<Booking | null>(null);

  // Provider modal states
  const [providerReviewingOffer, setProviderReviewingOffer] = useState<JobOffer | null>(null);
  const [providerTransitBooking, setProviderTransitBooking] = useState<Booking | null>(null);

  // Load initial data
  const refreshData = async () => {
    try {
      const [catList, srvList, provList, bkgList, logList, offer] = await Promise.all([
        servicesApi.fetchCategories(),
        servicesApi.fetchServices(),
        providersApi.fetchProviders(),
        bookingsApi.fetchBookings(),
        adminApi.fetchAuditLogs(),
        providersApi.fetchActiveOffer()
      ]);
      setCategories(catList);
      setServices(srvList);
      setProviders(provList);
      setBookings(bkgList);
      setAuditLogs(logList);
      setActiveOffer(offer);

      // Default active tracking booking if none selected
      const enRouteBooking = bkgList.find(b => b.status === 'en_route' || b.status === 'assigned' || b.status === 'arrived');
      if (enRouteBooking && !activeTrackingBooking) {
        setActiveTrackingBooking(enRouteBooking);
      }
    } catch (err) {
      console.error('Failed to load marketplace data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Subscribe to synchronous and asynchronous updates in store
    const unsubscribe = marketplaceStore.subscribe(() => {
      refreshData();
    });
    return unsubscribe;
  }, []);

  // Current primary active booking for Pooja M.
  const activeBooking = bookings.find(b => b.status !== 'completed' && b.status !== 'cancelled') || bookings[0];
  const defaultProvider = providers.find(p => p.id === 'prov-rajesh') || providers[0];

  // Customer Booking Handlers
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingStep(0);
  };

  const handleStartBookingSlot = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingStep(1); // Date Slot Picker
  };

  const handleSlotChosen = (date: string, timeSlot: string) => {
    setSelectedDate(date);
    setSelectedSlot(timeSlot);
    setBookingStep(2); // Checkout Review
  };

  const handleProceedToPayment = (notes: string, coupon: string) => {
    setCheckoutNotes(notes);
    setBookingStep(3); // Payment & Escrow
  };

  const handlePaymentSuccess = async (method: Booking['paymentMethod']) => {
    if (!selectedService) return;

    const newBooking = await bookingsApi.createBooking({
      serviceId: selectedService.id,
      customerName: 'Pooja M.',
      customerPhone: '+91 98765 43210',
      customerEmail: 'pooja.m@example.com',
      address: {
        label: 'Home',
        unit: 'Flat 402, Tower B, Green Glen Orchid',
        street: '4th Cross, 100ft Road',
        area: 'Indiranagar, Bengaluru',
        pincode: '560038',
        landmark: 'Opp. BDA Complex'
      },
      date: selectedDate,
      timeSlot: selectedSlot,
      paymentMethod: method,
      specialInstructions: checkoutNotes
    });

    setLatestCreatedBooking(newBooking);
    setActiveTrackingBooking(newBooking);
    setBookingStep(4); // Confirmed view
  };

  const handleTrackBooking = (booking: Booking) => {
    setActiveTrackingBooking(booking);
    setCustomerTab('tracking');
    setBookingStep(0);
    setSelectedService(null);
  };

  const handleCancelBooking = async (bookingId: string, reason: string) => {
    await bookingsApi.cancelBooking(bookingId, reason);
  };

  const handleRebook = (serviceId: string) => {
    const srv = services.find(s => s.id === serviceId) || services[0];
    handleStartBookingSlot(srv);
  };

  // Provider Handlers
  const handleToggleDuty = async (active: boolean) => {
    if (defaultProvider) {
      await providersApi.updateDutyStatus(defaultProvider.id, active);
    }
  };

  const handleAcceptOffer = async (offerId: string) => {
    const booked = await providersApi.acceptJobOffer(offerId);
    setProviderReviewingOffer(null);
    if (booked) {
      setProviderTransitBooking(booked);
    }
  };

  const handleDeclineOffer = async (offerId: string, reason: string) => {
    await providersApi.declineJobOffer(offerId, reason);
    setProviderReviewingOffer(null);
  };

  const handleVerifyOtp = async (otp: string) => {
    const targetBookingId = providerTransitBooking?.id || activeBooking?.id || 'BK-1024';
    return await providersApi.verifyOtpAndStart(targetBookingId, otp);
  };

  const handleCompleteJob = async () => {
    const targetBookingId = providerTransitBooking?.id || activeBooking?.id || 'BK-1024';
    await providersApi.completeJob(targetBookingId);
    if (providerTransitBooking) {
      const updated = marketplaceStore.getBookingById(targetBookingId);
      if (updated) setProviderTransitBooking({ ...updated });
    }
  };

  // Admin Handlers
  const handleReassignProvider = async (bookingId: string, providerId: string) => {
    await bookingsApi.reassignProvider(bookingId, providerId);
  };

  const handleUpdateProviderApproval = async (providerId: string, status: Provider['approvalStatus']) => {
    await adminApi.updateProviderStatus(providerId, status);
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    await bookingsApi.updateBookingStatus(bookingId, status);
  };

  const handleAddNewService = async (data: Omit<ServiceItem, 'id'>) => {
    await servicesApi.createService(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <LoadingSpinner message="Initializing Helping Hand Marketplace..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Universal Fixed Header */}
      <Header
        currentRole={role}
        onRoleChange={(newRole) => {
          setRole(newRole);
          setBookingStep(0);
          setSelectedService(null);
        }}
        selectedAddress={selectedAddress}
        onAddressChange={setSelectedAddress}
        onOpenNotifications={() => alert('All recent updates: SafeShield Escrow verified, Provider dispatch nominal.')}
        onOpenHelp={() => setHelpModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-18 pb-12 w-full">
        {/* ROLE 1: CUSTOMER VIEW */}
        {role === 'customer' && (
          <>
            {/* Step 4: Booking Confirmation Screen */}
            {bookingStep === 4 && latestCreatedBooking ? (
              <BookingConfirmationView
                booking={latestCreatedBooking}
                onTrack={(b) => handleTrackBooking(b)}
                onGoHome={() => {
                  setBookingStep(0);
                  setSelectedService(null);
                  setCustomerTab('explore');
                }}
              />
            ) : customerTab === 'explore' ? (
              <CustomerExploreView
                categories={categories}
                services={services}
                activeBooking={activeBooking}
                onSelectService={handleSelectService}
                onTrackBooking={handleTrackBooking}
              />
            ) : customerTab === 'bookings' ? (
              <CustomerBookingsView
                bookings={bookings}
                onTrackBooking={handleTrackBooking}
                onCancelBooking={handleCancelBooking}
                onRebook={handleRebook}
              />
            ) : (
              /* Live Tracking View */
              <CustomerLiveTrackingView
                booking={activeTrackingBooking || activeBooking}
                onBack={() => setCustomerTab('explore')}
                onOpenHelpDesk={() => setHelpModalOpen(true)}
              />
            )}

            {/* Customer Modals for Detailed Booking Flow (Steps 0-3) */}
            {selectedService && bookingStep === 0 && (
              <ServiceDetailModal
                service={selectedService}
                onBack={() => setSelectedService(null)}
                onProceedToBooking={handleStartBookingSlot}
              />
            )}

            {selectedService && bookingStep === 1 && (
              <DateSlotPickerModal
                service={selectedService}
                onBack={() => setBookingStep(0)}
                onSelectSlot={handleSlotChosen}
              />
            )}

            {selectedService && bookingStep === 2 && (
              <CheckoutReviewModal
                service={selectedService}
                date={selectedDate}
                timeSlot={selectedSlot}
                onBack={() => setBookingStep(1)}
                onProceedToPayment={handleProceedToPayment}
              />
            )}

            {selectedService && bookingStep === 3 && (
              <PaymentEscrowModal
                amount={selectedService.price}
                onBack={() => setBookingStep(2)}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
          </>
        )}

        {/* ROLE 2: PROVIDER VIEW */}
        {role === 'provider' && (
          <>
            {providerTransitBooking ? (
              <ProviderActiveTransitView
                booking={providerTransitBooking}
                onBack={() => setProviderTransitBooking(null)}
                onUpdateStatus={(st) => {
                  handleUpdateBookingStatus(providerTransitBooking.id, st);
                  const updated = marketplaceStore.getBookingById(providerTransitBooking.id);
                  if (updated) setProviderTransitBooking({ ...updated });
                }}
                onVerifyOtp={handleVerifyOtp}
                onCompleteJob={handleCompleteJob}
              />
            ) : (
              <ProviderDashboardView
                provider={defaultProvider}
                activeOffer={activeOffer}
                activeBooking={activeBooking}
                allBookings={bookings}
                onToggleDuty={handleToggleDuty}
                onOpenOffer={(offer) => setProviderReviewingOffer(offer)}
                onOpenTransit={(booking) => setProviderTransitBooking(booking)}
              />
            )}

            {/* Incoming Job Offer Detail Modal */}
            {providerReviewingOffer && (
              <JobRequestDetailModal
                offer={providerReviewingOffer}
                onAccept={handleAcceptOffer}
                onDecline={handleDeclineOffer}
                onClose={() => setProviderReviewingOffer(null)}
              />
            )}
          </>
        )}

        {/* ROLE 3: ADMIN VIEW */}
        {role === 'admin' && (
          <AdminDashboardView
            bookings={bookings}
            providers={providers}
            services={services}
            auditLogs={auditLogs}
            onReassignProvider={handleReassignProvider}
            onUpdateProviderStatus={handleUpdateProviderApproval}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onAddNewService={handleAddNewService}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentRole={role}
        activeCustomerTab={customerTab}
        onCustomerTabChange={(tab) => {
          setCustomerTab(tab);
          setBookingStep(0);
          setSelectedService(null);
        }}
        hasActiveBooking={!!activeBooking}
      />

      {/* SafeShield Protection Desk Dialog */}
      <HelpSupportModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
    </div>
  );
}

export default App;
