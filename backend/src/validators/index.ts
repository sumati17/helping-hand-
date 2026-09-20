import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'provider', 'admin']).default('customer')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const createBookingSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  customerName: z.string().min(2, 'Customer name is required'),
  customerPhone: z.string().min(10, 'Valid phone number required'),
  customerEmail: z.string().email('Valid email required'),
  address: z.object({
    label: z.string().default('Home'),
    unit: z.string().min(1, 'Flat/House number is required'),
    street: z.string().min(1, 'Street is required'),
    area: z.string().min(1, 'Area is required'),
    pincode: z.string().min(4, 'Pincode is required'),
    landmark: z.string().optional()
  }),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  paymentMethod: z.enum(['gpay', 'phonepe', 'paytm', 'card', 'cod', 'netbanking']),
  specialInstructions: z.string().optional(),
  couponCode: z.string().optional()
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(4, 'Doorstep OTP must be exactly 4 digits')
});

export const updateDutySchema = z.object({
  activeDuty: z.boolean()
});

export const createServiceSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(5, 'Description is required'),
  shortDescription: z.string().min(3, 'Short description is required'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive(),
  discountPercentage: z.number().min(0).max(100).default(0),
  duration: z.string().min(1, 'Duration is required'),
  imageUrl: z.string().url().or(z.string().min(1)),
  badge: z.string().optional(),
  inclusions: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ).default([]),
  exclusions: z.array(z.string()).default([]),
  requirements: z.string().default('')
});
