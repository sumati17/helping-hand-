import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'An unexpected error occurred. Please try again.';
  let details = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'MONGOOSE_VALIDATION_ERROR';
    message = err.message;
  } else if (err.code === 11000) {
    statusCode = 409;
    errorCode = 'DUPLICATE_KEY_ERROR';
    message = `Duplicate key entered: ${Object.keys(err.keyValue).join(', ')}`;
  } else if (err.message) {
    message = err.message;
  }

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    console.error('Unhandled Server Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details ? { details } : {})
    }
  });
};
