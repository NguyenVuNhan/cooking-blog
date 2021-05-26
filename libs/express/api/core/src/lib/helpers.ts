import { Response } from 'express';
import {
  AppError,
  StatusCodes,
  ReasonPhrases,
} from '@cookingblog/express/api/common';

export function sendErrorResponse(e: Error, res: Response): void {
  const error = createErrorResponse(e);
  res.status(error.code || 500);

  delete error.code;
  res.json({
    data: error.details ?? error,
    message: error.message ?? 'Some thing went wrong',
    success: false,
  });
}

export function sendSuccessResponse(
  data: unknown,
  res: Response,
  message = 'Success!'
): void {
  res.json({ data, message, success: true });
}

export function createErrorResponse(
  error: AppError | Error
): Partial<AppError> {
  const err: Partial<AppError> = {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };

  if (!error) return err;

  const { message, code, details } = error as AppError;
  if (message) err.message = message;
  if (code) err.code = code;

  if (!details) return err;

  err.details = details;
  return err;
}
