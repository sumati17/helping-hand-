import mongoose, { Schema, Document } from 'mongoose';

export interface IEscrowTransaction extends Document {
  txnId: string;
  bookingId: string;
  amount: number;
  providerEarnings: number;
  platformFee: number;
  paymentMethod: string;
  status: 'held_in_vault' | 'released' | 'refunded' | 'disputed';
  releasedAt?: Date;
  refundedAt?: Date;
  createdAt: Date;
}

const EscrowTransactionSchema = new Schema<IEscrowTransaction>({
  txnId: { type: String, required: true, unique: true, index: true },
  bookingId: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  providerEarnings: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['held_in_vault', 'released', 'refunded', 'disputed'],
    default: 'held_in_vault'
  },
  releasedAt: { type: Date },
  refundedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const EscrowTransactionModel = mongoose.model<IEscrowTransaction>('EscrowTransaction', EscrowTransactionSchema);
