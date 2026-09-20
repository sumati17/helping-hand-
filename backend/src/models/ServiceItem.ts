import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceInclusion {
  title: string;
  description: string;
}

export interface IServiceItem extends Document {
  serviceCode: string; // e.g. 'deep-home-cleaning'
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
  inclusions: IServiceInclusion[];
  exclusions: string[];
  requirements: string;
  isAvailable: boolean;
  createdAt: Date;
}

const ServiceItemSchema = new Schema<IServiceItem>({
  serviceCode: { type: String, required: true, unique: true, index: true },
  categoryId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 },
  duration: { type: String, required: true },
  imageUrl: { type: String, required: true },
  badge: { type: String },
  inclusions: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  exclusions: [{ type: String }],
  requirements: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const ServiceItemModel = mongoose.model<IServiceItem>('ServiceItem', ServiceItemSchema);
