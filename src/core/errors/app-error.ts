/* ============================================
   App Error
   Custom error class for consistent error
   handling across the application.
   ============================================ */

export type ErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'PAYMENT_ERROR'
  | 'EXTERNAL_SERVICE_ERROR';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode?: number,
    isOperational = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode ?? getDefaultStatusCode(code);
    this.isOperational = isOperational;

    // Preserve proper stack trace
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /** Create a NOT_FOUND error. */
  static notFound(resource: string, id?: string): AppError {
    const detail = id ? ` (${id})` : '';
    return new AppError(`${resource} não encontrado${detail}`, 'NOT_FOUND', 404);
  }

  /** Create a VALIDATION_ERROR. */
  static validation(message: string): AppError {
    return new AppError(message, 'VALIDATION_ERROR', 400);
  }

  /** Create an UNAUTHORIZED error. */
  static unauthorized(message = 'Não autorizado'): AppError {
    return new AppError(message, 'UNAUTHORIZED', 401);
  }

  /** Create a FORBIDDEN error. */
  static forbidden(message = 'Acesso negado'): AppError {
    return new AppError(message, 'FORBIDDEN', 403);
  }
}

function getDefaultStatusCode(code: ErrorCode): number {
  const map: Record<ErrorCode, number> = {
    NOT_FOUND: 404,
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    PAYMENT_ERROR: 402,
    EXTERNAL_SERVICE_ERROR: 502,
  };
  return map[code];
}
