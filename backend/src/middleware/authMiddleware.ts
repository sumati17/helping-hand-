import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'customer' | 'provider' | 'admin';
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo/development ease when no token is passed, allow demo user or throw
    const demoRole = (req.headers['x-demo-role'] as 'customer' | 'provider' | 'admin') || 'customer';
    req.user = {
      id: 'demo-user-1',
      email: `${demoRole}@helpinghand.com`,
      role: demoRole
    };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'super_secret_helping_hand_jwt_token_key_2026';
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return next(ApiError.unauthorized('Invalid or expired authentication token.'));
  }
};
