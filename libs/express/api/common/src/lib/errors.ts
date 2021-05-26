import { ReasonPhrases, StatusCodes } from 'http-status-codes';
export { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface ErrorDetails {
  platform?: string;
  code?: number;
  message?: string;
  fields?: string[];
}

export class AppError extends Error {
  constructor(
    public code: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    public details?: ErrorDetails
  ) {
    super(message);
    this.message = message;
    this.code = code;
    this.details = details;
  }
}

export class ServerError extends AppError {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    details?: ErrorDetails
  ) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, details);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    details?: ErrorDetails
  ) {
    super(StatusCodes.NOT_FOUND, message, details);
  }
}

export class AlreadyExistsError extends AppError {
  constructor(message = 'Already Exist Error', details?: ErrorDetails) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    details?: ErrorDetails
  ) {
    super(StatusCodes.UNAUTHORIZED, message, details);
  }
}

export class PermissionDeniedError extends AppError {
  constructor(message = 'Permission Denied', details?: ErrorDetails) {
    super(StatusCodes.FORBIDDEN, message, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error', details?: ErrorDetails) {
    super(StatusCodes.BAD_REQUEST, message, details);
  }
}
