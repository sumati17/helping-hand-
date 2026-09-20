import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/apiError.js';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return next(new ApiError(400, 'Validation failed for request parameters', 'VALIDATION_ERROR', issues));
      }
      next(error);
    }
  };
};
