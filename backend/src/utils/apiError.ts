export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details?: any;

  constructor(statusCode: number, message: string, errorCode = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static badRequest(message: string, errorCode = 'BAD_REQUEST', details?: any) {
    return new ApiError(400, message, errorCode, details);
  }

  static unauthorized(message = 'Unauthorized access', errorCode = 'UNAUTHORIZED') {
    return new ApiError(401, message, errorCode);
  }

  static forbidden(message = 'Forbidden action', errorCode = 'FORBIDDEN') {
    return new ApiError(403, message, errorCode);
  }

  static notFound(message = 'Resource not found', errorCode = 'NOT_FOUND') {
    return new ApiError(404, message, errorCode);
  }

  static internal(message = 'Internal server error', errorCode = 'INTERNAL_ERROR') {
    return new ApiError(500, message, errorCode);
  }
}
