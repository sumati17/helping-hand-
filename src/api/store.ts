import { Booking, Provider, ServiceCategory, ServiceItem, AuditLog, JobOffer, BookingStatus } from '../types';
import { INITIAL_BOOKINGS, INITIAL_CATEGORIES, INITIAL_PROVIDERS, INITIAL_SERVICES, INITIAL_AUDIT_LOGS } from './mockData';

// Central in-memory reactive store
class MarketplaceStore {
  private categories: ServiceCategory[] = [...INITIAL_CATEGORIES];
  private services: ServiceItem[] = [...INITIAL_SERVICES];
  private providers: Provider[] = [...INITIAL_PROVIDERS];
  private bookings: Booking[] = [...INITIAL_BOOKINGS];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private activeJobOffer: JobOffer | null = {
    id: 'OFFER-77',
    bookingId: 'BK-1024',
    serviceTitle: 'Home Cleaning (Deep Sanitization)',
    category: 'Cleaning',
    location: 'Indiranagar (1.8 km)',
    distanceKm: 1.8,
    estimatedDuration: 'Est. 2.5 hrs',
    estimatedNetPayout: 1290,
    surgeMultiplier: 1.2,
    expiresInSeconds: 48,
    customerName: 'Pooja M.',
    customerRating: 4.9,
    customerBookingsCount: 18,
    customerNotes: 'Please ring doorbell twice, two pet cats inside apartment. A 16A heavy electrical socket is available in the utility balcony.'
  };

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Categories & Services
  getCategories(): ServiceCategory[] {
    return [...this.categories];
  }

  getServices(categoryId?: string): ServiceItem[] {
    if (categoryId && categoryId !== 'all') {
      return this.services.filter(s => s.categoryId === categoryId);
    }
    return [...this.services];
  }

  getServiceById(id: string): ServiceItem | undefined {
    return this.services.find(s => s.id === id);
  }

  updateService(service: ServiceItem): ServiceItem {
    const idx = this.services.findIndex(s => s.id === service.id);
    if (idx !== -1) {
      this.services[idx] = service;
      this.addAuditLog('ADMIN', 'SERVICE_CATALOG_UPDATE', `Service #${service.id}`, `Updated service details for ${service.title}`);
      this.notify();
    }
    return service;
  }

  addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };
    this.services.unshift(newService);
    this.addAuditLog('ADMIN', 'SERVICE_CATALOG_ADD', `Service #${newService.id}`, `Created service ${newService.title}`);
    this.notify();
    return newService;
  }

  // Bookings
  getBookings(): Booking[] {
    return [...this.bookings];
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

  createBooking(params: {
    serviceId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    address: Booking['address'];
    date: string;
    timeSlot: string;
    paymentMethod: Booking['paymentMethod'];
    specialInstructions?: string;
  }): Booking {
    const service = this.getServiceById(params.serviceId) || this.services[0];
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const basePrice = service.price;
    const discount = Math.round(basePrice * 0.2);
    const equipmentFee = 49;
    const tax = Math.round((basePrice - discount) * 0.18);
    const couponDiscount = 100;
    const totalPayable = basePrice - discount + equipmentFee + tax - couponDiscount;
    const providerEarnings = Math.round(totalPayable * 0.75);
    const platformFee = totalPayable - providerEarnings;

    const assignedProvider = this.providers.find(p => p.approvalStatus === 'approved' && p.activeDuty) || this.providers[0];

    const newBooking: Booking = {
      id: newId,
      serviceId: service.id,
      serviceTitle: service.title,
      categoryId: service.categoryId,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: params.customerEmail,
      address: params.address,
      date: params.date,
      timeSlot: params.timeSlot,
      status: 'confirmed',
      otpCode: randomOtp,
      provider: assignedProvider,
      specialInstructions: params.specialInstructions,
      pricing: {
        basePrice,
        discount,
        equipmentFee,
        tax,
        couponDiscount,
        totalPayable,
        providerEarnings,
        platformFee
      },
      paymentMethod: params.paymentMethod,
      paymentStatus: 'paid_escrow',
      timelineEvents: [
        { status: 'confirmed', label: 'Booking Confirmed', timestamp: 'Just now', completed: true, active: false },
        { status: 'assigned', label: 'Provider Assigned', timestamp: 'Just now', completed: true, active: true },
        { status: 'accepted', label: 'Accepted by Partner', timestamp: 'Pending', completed: false, active: false },
        { status: 'en_route', label: 'En Route', timestamp: 'Pending', completed: false, active: false },
        { status: 'arrived', label: 'Arrived at Gate', timestamp: 'Pending', completed: false, active: false },
        { status: 'otp_started', label: 'SafeStart OTP Check', timestamp: 'Pending', completed: false, active: false },
        { status: 'in_progress', label: 'In Progress', timestamp: 'Pending', completed: false, active: false },
        { status: 'completed', label: 'Job Completed', timestamp: 'Pending', completed: false, active: false },
      ],
      createdAt: new Date().toISOString()
    };

    this.bookings.unshift(newBooking);
    this.addAuditLog('CUSTOMER', 'BOOKING_CREATED', `Booking #${newId}`, `Payment ₹${totalPayable} secured in Escrow`);
    this.notify();
    return newBooking;
  }

  updateBookingStatus(bookingId: string, status: BookingStatus): Booking | undefined {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = status;
      // update timeline
      const statusOrder: BookingStatus[] = [
        'confirmed',
        'assigned',
        'accepted',
        'en_route',
        'arrived',
        'otp_started',
        'in_progress',
        'completed'
      ];
      const targetIdx = statusOrder.indexOf(status);
      booking.timelineEvents.forEach((ev) => {
        const evIdx = statusOrder.indexOf(ev.status);
        if (evIdx < targetIdx) {
          ev.completed = true;
          ev.active = false;
        } else if (evIdx === targetIdx) {
          ev.completed = false;
          ev.active = true;
          ev.timestamp = 'Just now';
        } else {
          ev.completed = false;
          ev.active = false;
        }
      });

      if (status === 'completed') {
        booking.paymentStatus = 'released_to_provider';
      }

      this.addAuditLog('SYSTEM', 'BOOKING_STATUS_CHANGE', `Booking #${bookingId}`, `Status changed to ${status}`);
      this.notify();
    }
    return booking;
  }

  cancelBooking(bookingId: string, reason: string): Booking | undefined {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'cancelled';
      booking.paymentStatus = 'refunded';
      this.addAuditLog('CUSTOMER', 'BOOKING_CANCELLED', `Booking #${bookingId}`, `Cancelled: ${reason}. Full refund initiated.`);
      this.notify();
    }
    return booking;
  }

  reassignProvider(bookingId: string, providerId: string): Booking | undefined {
    const booking = this.bookings.find(b => b.id === bookingId);
    const provider = this.providers.find(p => p.id === providerId);
    if (booking && provider) {
      booking.provider = provider;
      booking.status = 'assigned';
      this.addAuditLog('ADMIN', 'MANUAL_REASSIGNMENT', `Booking #${bookingId}`, `Assigned to ${provider.name}`);
      this.notify();
    }
    return booking;
  }

  // Providers
  getProviders(): Provider[] {
    return [...this.providers];
  }

  getProviderById(id: string): Provider | undefined {
    return this.providers.find(p => p.id === id);
  }

  updateProviderDuty(providerId: string, activeDuty: boolean): Provider | undefined {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider) {
      provider.activeDuty = activeDuty;
      this.notify();
    }
    return provider;
  }

  updateProviderApproval(providerId: string, approvalStatus: Provider['approvalStatus']): Provider | undefined {
    const provider = this.providers.find(p => p.id === providerId);
    if (provider) {
      provider.approvalStatus = approvalStatus;
      this.addAuditLog('ADMIN', 'PROVIDER_STATUS_UPDATE', `Provider #${providerId}`, `Approval status changed to ${approvalStatus}`);
      this.notify();
    }
    return provider;
  }

  // Active Job Offer for Provider
  getActiveOffer(): JobOffer | null {
    return this.activeJobOffer;
  }

  dismissOffer() {
    this.activeJobOffer = null;
    this.notify();
  }

  acceptOffer(offerId: string): Booking | undefined {
    this.activeJobOffer = null;
    const booking = this.bookings.find(b => b.id === 'BK-1024');
    if (booking) {
      this.updateBookingStatus(booking.id, 'accepted');
    }
    this.notify();
    return booking;
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return [...this.auditLogs];
  }

  addAuditLog(actor: string, action: string, target: string, details: string, severity: 'info' | 'warning' | 'critical' = 'info') {
    const log: AuditLog = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      actor,
      action,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details,
      severity
    };
    this.auditLogs.unshift(log);
  }
}

export const marketplaceStore = new MarketplaceStore();
