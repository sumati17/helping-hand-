import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceCategory extends Document {
  categoryId: string; // e.g. 'cleaning'
  name: string;
  icon: string;
  color: string;
  startingPrice: number;
  isActive: boolean;
}

const ServiceCategorySchema = new Schema<IServiceCategory>({
  categoryId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, default: 'bg-emerald-100 text-emerald-800' },
  startingPrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

export const ServiceCategoryModel = mongoose.model<IServiceCategory>('ServiceCategory', ServiceCategorySchema);
