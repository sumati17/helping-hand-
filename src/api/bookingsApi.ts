import { Booking, BookingStatus } from '../types';
import { marketplaceStore } from './store';

// Separated Bookings API abstraction
export const bookingsApi = {
  async fetchBookings(): Promise<Booking[]> {
    await new Promise(res => setTimeout(res, 120));
    return marketplaceStore.getBookings();
  },

  async fetchBookingById(id: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 100));
    return marketplaceStore.getBookingById(id) || null;
  },

  async createBooking(params: {
    serviceId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    address: Booking['address'];
    date: string;
    timeSlot: string;
    paymentMethod: Booking['paymentMethod'];
    specialInstructions?: string;
  }): Promise<Booking> {
    await new Promise(res => setTimeout(res, 350));
    return marketplaceStore.createBooking(params);
  },

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 150));
    return marketplaceStore.updateBookingStatus(bookingId, status) || null;
  },

  async cancelBooking(bookingId: string, reason: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 200));
    return marketplaceStore.cancelBooking(bookingId, reason) || null;
  },

  async reassignProvider(bookingId: string, providerId: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 200));
    return marketplaceStore.reassignProvider(bookingId, providerId) || null;
  }
};
