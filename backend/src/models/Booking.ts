import mongoose, { Schema, Document, Types } from 'mongoose';

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

export interface IBookingPricing {
  basePrice: number;
  discount: number;
  equipmentFee: number;
  tax: number;
  couponDiscount: number;
  totalPayable: number;
  providerEarnings: number;
  platformFee: number;
}

export interface IBookingTimelineEvent {
  status: BookingStatus;
  label: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface IBookingAddress {
  label: string;
  unit: string;
  street: string;
  area: string;
  pincode: string;
  landmark?: string;
}

export interface IBooking extends Document {
  bookingId: string; // e.g. 'BK-1024'
  serviceId: string;
  serviceTitle: string;
  categoryId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: IBookingAddress;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  otpCode: string;
  providerId?: string;
  specialInstructions?: string;
  pricing: IBookingPricing;
  paymentMethod: 'gpay' | 'phonepe' | 'paytm' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid_escrow' | 'released_to_provider' | 'refunded' | 'pending';
  timelineEvents: IBookingTimelineEvent[];
  createdAt: Date;
}

const BookingTimelineEventSchema = new Schema<IBookingTimelineEvent>({
  status: { type: String, required: true },
  label: { type: String, required: true },
  timestamp: { type: String, required: true },
  completed: { type: Boolean, default: false },
  active: { type: Boolean, default: false }
});

const BookingAddressSchema = new Schema<IBookingAddress>({
  label: { type: String, default: 'Home' },
  unit: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String }
});

const BookingPricingSchema = new Schema<IBookingPricing>({
  basePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  equipmentFee: { type: Number, default: 49 },
  tax: { type: Number, required: true },
  couponDiscount: { type: Number, default: 0 },
  totalPayable: { type: Number, required: true },
  providerEarnings: { type: Number, required: true },
  platformFee: { type: Number, required: true }
});

const BookingSchema = new Schema<IBooking>({
  bookingId: { type: String, required: true, unique: true, index: true },
  serviceId: { type: String, required: true, index: true },
  serviceTitle: { type: String, required: true },
  categoryId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  address: { type: BookingAddressSchema, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: [
      'confirmed',
      'assigned',
      'accepted',
      'en_route',
      'arrived',
      'otp_started',
      'in_progress',
      'completed',
      'cancelled'
    ],
    default: 'confirmed',
    index: true
  },
  otpCode: { type: String, required: true },
  providerId: { type: String, default: null },
  specialInstructions: { type: String, default: '' },
  pricing: { type: BookingPricingSchema, required: true },
  paymentMethod: {
    type: String,
    enum: ['gpay', 'phonepe', 'paytm', 'card', 'cod', 'netbanking'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid_escrow', 'released_to_provider', 'refunded', 'pending'],
    default: 'paid_escrow'
  },
  timelineEvents: [BookingTimelineEventSchema],
  createdAt: { type: Date, default: Date.now }
});

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
