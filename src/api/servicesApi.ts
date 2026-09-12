import { ServiceCategory, ServiceItem } from '../types';
import { marketplaceStore } from './store';

// Separated Services API abstraction (can swap with real fetch('/api/services') later)
export const servicesApi = {
  async fetchCategories(): Promise<ServiceCategory[]> {
    await new Promise(res => setTimeout(res, 80));
    return marketplaceStore.getCategories();
  },

  async fetchServices(categoryId?: string): Promise<ServiceItem[]> {
    await new Promise(res => setTimeout(res, 120));
    return marketplaceStore.getServices(categoryId);
  },

  async fetchServiceById(id: string): Promise<ServiceItem | null> {
    await new Promise(res => setTimeout(res, 100));
    return marketplaceStore.getServiceById(id) || null;
  },

  async createService(data: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    await new Promise(res => setTimeout(res, 200));
    return marketplaceStore.addService(data);
  },

  async updateService(service: ServiceItem): Promise<ServiceItem> {
    await new Promise(res => setTimeout(res, 150));
    return marketplaceStore.updateService(service);
  }
};
