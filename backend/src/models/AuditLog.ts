import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  logId: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  logId: { type: String, required: true, unique: true, index: true },
  actor: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  timestamp: { type: String, required: true },
  details: { type: String, required: true },
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'info'
  },
  createdAt: { type: Date, default: Date.now }
});

export const AuditLogModel = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
