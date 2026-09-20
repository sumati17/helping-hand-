import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAddress {
  label: string;
  unit: string;
  street: string;
  area: string;
  pincode: string;
  landmark?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'provider' | 'admin';
  avatarUrl?: string;
  savedAddresses: IUserAddress[];
  createdAt: Date;
}

const AddressSchema = new Schema<IUserAddress>({
  label: { type: String, default: 'Home' },
  unit: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String }
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'provider', 'admin'], default: 'customer' },
  avatarUrl: { type: String, default: '' },
  savedAddresses: [AddressSchema],
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
