import mongoose, { Schema, Document } from 'mongoose';

export interface IJobOffer extends Document {
  offerId: string;
  bookingId: string;
  targetProviderId: string;
  serviceTitle: string;
  category: string;
  location: string;
  distanceKm: number;
  estimatedDuration: string;
  estimatedNetPayout: number;
  surgeMultiplier: number;
  expiresInSeconds: number;
  customerNotes?: string;
  customerName: string;
  customerRating: number;
  customerBookingsCount: number;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  declineReason?: string;
  createdAt: Date;
}

const JobOfferSchema = new Schema<IJobOffer>({
  offerId: { type: String, required: true, unique: true, index: true },
  bookingId: { type: String, required: true, index: true },
  targetProviderId: { type: String, required: true, index: true },
  serviceTitle: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  distanceKm: { type: Number, default: 1.5 },
  estimatedDuration: { type: String, default: '2 hrs' },
  estimatedNetPayout: { type: Number, required: true },
  surgeMultiplier: { type: Number, default: 1.0 },
  expiresInSeconds: { type: Number, default: 60 },
  customerNotes: { type: String, default: '' },
  customerName: { type: String, required: true },
  customerRating: { type: Number, default: 4.9 },
  customerBookingsCount: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'expired'],
    default: 'pending'
  },
  declineReason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const JobOfferModel = mongoose.model<IJobOffer>('JobOffer', JobOfferSchema);
