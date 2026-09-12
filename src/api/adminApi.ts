import { AuditLog, Provider, Booking } from '../types';
import { marketplaceStore } from './store';

// Separated Admin & Authority Operations API abstraction
export const adminApi = {
  async fetchDashboardStats() {
    await new Promise(res => setTimeout(res, 100));
    const bookings = marketplaceStore.getBookings();
    const providers = marketplaceStore.getProviders();

    const totalBookings = 1245 + bookings.length - 3;
    const activeProviders = providers.filter(p => p.activeDuty).length;
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const totalRevenueMonth = 248000;

    return {
      totalBookings,
      activeProviders,
      totalRevenueMonth,
      completionRate: 94.2,
      averageRating: 4.86,
      openComplaints: 2,
      bookingsTrend: [
        { day: 'Mon', count: 42, revenue: 64200 },
        { day: 'Tue', count: 58, revenue: 88400 },
        { day: 'Wed', count: 65, revenue: 99100 },
        { day: 'Thu', count: 72, revenue: 112000 },
        { day: 'Fri', count: 85, revenue: 135000 },
        { day: 'Sat', count: 112, revenue: 182000 },
        { day: 'Sun', count: 98, revenue: 154000 }
      ]
    };
  },

  async fetchAuditLogs(): Promise<AuditLog[]> {
    await new Promise(res => setTimeout(res, 100));
    return marketplaceStore.getAuditLogs();
  },

  async updateProviderStatus(providerId: string, status: Provider['approvalStatus']): Promise<Provider | null> {
    await new Promise(res => setTimeout(res, 180));
    return marketplaceStore.updateProviderApproval(providerId, status) || null;
  },

  async triggerEmergencyDispatch(bookingId: string): Promise<Booking | null> {
    await new Promise(res => setTimeout(res, 200));
    const booking = marketplaceStore.updateBookingStatus(bookingId, 'assigned');
    marketplaceStore.addAuditLog('ADMIN', 'EMERGENCY_DISPATCH', `Booking #${bookingId}`, 'High-priority SOS dispatch triggered');
    return booking || null;
  }
};
