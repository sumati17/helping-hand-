export type UserRole = 'customer' | 'provider' | 'admin';

export type BookingStatus =
  | 'confirmed'
  | 'assigned'
  | 'accepted'
  | 'en_route'
  | 'arrived'
  | 'otp_started'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  startingPrice: number;
}

export interface ServiceInclusion {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  duration: string;
  imageUrl: string;
  badge?: string;
  inclusions: ServiceInclusion[];
  exclusions: string[];
  requirements: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  window: 'morning' | 'afternoon' | 'evening';
  available: boolean;
  remainingSlots?: number;
}

export interface BookingAddress {
  label: string; // e.g., 'Home', 'Office'
  unit: string;  // e.g., 'Flat 402, Green Glen Orchid'
  street: string; // e.g., '4th Cross, 100ft Road'
  area: string; // e.g., 'Indiranagar, Bengaluru'
  pincode: string;
  landmark?: string;
}

export interface Provider {
  id: string;
  name: string;
  roleTitle: string;
  photoUrl: string;
  rating: number;
  completedJobsCount: number;
  isIdVerified: boolean;
  isBackgroundChecked: boolean;
  isVaccinated: boolean;
  vehicle: string;
  phone: string;
  tier: string;
  approvalStatus: 'approved' | 'pending' | 'suspended';
  activeDuty: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  categoryId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: BookingAddress;
  date: string; // e.g., 'Wed, 16 Oct 2024'
  timeSlot: string; // e.g., '09:30 AM'
  status: BookingStatus;
  otpCode: string;
  provider?: Provider;
  specialInstructions?: string;
  pricing: {
    basePrice: number;
    discount: number;
    equipmentFee: number;
    tax: number;
    couponDiscount: number;
    totalPayable: number;
    providerEarnings: number;
    platformFee: number;
  };
  paymentMethod: 'gpay' | 'phonepe' | 'paytm' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid_escrow' | 'released_to_provider' | 'refunded' | 'pending';
  timelineEvents: {
    status: BookingStatus;
    label: string;
    timestamp: string;
    completed: boolean;
    active: boolean;
  }[];
  createdAt: string;
}

export interface JobOffer {
  id: string;
  bookingId: string;
  serviceTitle: string;
  category: string;
  location: string;
  distanceKm: number;
  estimatedDuration: string;
  estimatedNetPayout: number;
  surgeMultiplier?: number;
  expiresInSeconds: number;
  customerNotes?: string;
  customerName: string;
  customerRating: number;
  customerBookingsCount: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}
