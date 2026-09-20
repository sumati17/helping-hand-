import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

const generateToken = (id: string, email: string, role: string) => {
  const secret = process.env.JWT_SECRET || 'super_secret_helping_hand_jwt_token_key_2026';
  return jwt.sign({ id, email, role }, secret, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, phone, password, role } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    throw ApiError.badRequest('User with this email or phone already exists', 'USER_ALREADY_EXISTS');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
    role: role || 'customer',
    savedAddresses: []
  });

  const token = generateToken(user._id.toString(), user.email, user.role);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password credentials');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password credentials');
  }

  const token = generateToken(user._id.toString(), user.email, user.role);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
  });
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findOne({ email: req.user?.email }).select('-passwordHash');
  if (!user) {
    return res.json({
      success: true,
      user: {
        id: 'demo-user',
        name: 'Pooja M.',
        email: 'pooja.m@example.com',
        role: req.user?.role || 'customer'
      }
    });
  }

  res.json({
    success: true,
    user
  });
};
