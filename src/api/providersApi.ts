import { Provider, JobOffer, Booking } from '../types';
import { marketplaceStore } from './store';

// Separated Providers API abstraction
export const providersApi = {
  async fetchProviders(): Promise<Provider[]> {
    await new Promise(res => setTimeout(res, 120));
    return marketplaceStore.getProviders();
  },

  async fetchProviderById(id: string): Promise<Provider | null> {
    await new Promise(res => setTimeout(res, 80));
    return marketplaceStore.getProviderById(id) || null;
  },

  async updateDutyStatus(providerId: string, activeDuty: boolean): Promise<Provider | null> {
    await new Promise(res => setTimeout(res, 100));
    return marketplaceStore.updateProviderDuty(providerId, activeDuty) || null;
  },

  async fetchActiveOffer(): Promise<JobOffer | null> {
    await new Promise(res => setTimeout(res, 90));
    return marketplaceStore.getActiveOffer();
  },

  async acceptJobOffer(offerId: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 250));
    return marketplaceStore.acceptOffer(offerId) || null;
  },

  async declineJobOffer(offerId: string, reason: string): Promise<boolean> {
    await new Promise(res => setTimeout(res, 150));
    marketplaceStore.dismissOffer();
    marketplaceStore.addAuditLog('PROVIDER', 'JOB_OFFER_DECLINED', `Offer #${offerId}`, `Declined with reason: ${reason}`, 'warning');
    return true;
  },

  async verifyOtpAndStart(bookingId: string, enteredOtp: string): Promise<{ success: boolean; message: string }> {
    await new Promise(res => setTimeout(res, 300));
    const booking = marketplaceStore.getBookingById(bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }
    if (booking.otpCode !== enteredOtp.trim()) {
      return { success: false, message: 'Invalid Doorstep SafeStart OTP. Please verify with customer.' };
    }
    marketplaceStore.updateBookingStatus(bookingId, 'otp_started');
    setTimeout(() => {
      marketplaceStore.updateBookingStatus(bookingId, 'in_progress');
    }, 500);
    return { success: true, message: 'OTP verified! Cleaning timer started.' };
  },

  async completeJob(bookingId: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 250));
    return marketplaceStore.updateBookingStatus(bookingId, 'completed') || null;
  }
};
