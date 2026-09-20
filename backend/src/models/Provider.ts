import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProviderLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface IProvider extends Document {
  providerCode: string; // e.g. 'prov-rajesh'
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
  location: IProviderLocation;
  userRef?: Types.ObjectId;
  createdAt: Date;
}

const ProviderSchema = new Schema<IProvider>({
  providerCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  roleTitle: { type: String, required: true },
  photoUrl: { type: String, default: '' },
  rating: { type: Number, default: 4.8, min: 1, max: 5 },
  completedJobsCount: { type: Number, default: 0 },
  isIdVerified: { type: Boolean, default: false },
  isBackgroundChecked: { type: Boolean, default: false },
  isVaccinated: { type: Boolean, default: true },
  vehicle: { type: String, default: '' },
  phone: { type: String, required: true },
  tier: { type: String, default: 'Silver Pro L1' },
  approvalStatus: {
    type: String,
    enum: ['approved', 'pending', 'suspended'],
    default: 'pending',
    index: true
  },
  activeDuty: { type: Boolean, default: false, index: true },
  location: {
    lat: { type: Number, default: 12.9716 },
    lng: { type: Number, default: 77.6412 },
    address: { type: String, default: 'Indiranagar, Bengaluru' }
  },
  userRef: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export const ProviderModel = mongoose.model<IProvider>('Provider', ProviderSchema);
