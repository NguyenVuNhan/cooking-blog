import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from './errors';
import { ValidationErrorDetails } from './types';
import {
  ValidationError as ClsValidationError,
  ValidatorOptions,
  validateOrReject,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

interface ValidateConfig extends ValidatorOptions {
  subject?: 'body' | 'params' | 'query';
  continueOnError?: boolean;
}

class ValidationError extends AppError {
  constructor(errors: ClsValidationError[]) {
    const message = errors.reduce(
      (acc: string, val) =>
        `${acc}${acc == '' ? '' : ', '}${Object.values(val.constraints).join(
          ', '
        )}`,
      ''
    );
    const details = errors.reduce(
      (acc: ValidationErrorDetails, val) => ({
        ...acc,
        [val.property]: val.constraints,
      }),
      {}
    );

    super(StatusCodes.BAD_REQUEST, message, details);
  }
}

export const validate = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  {
    subject = 'body',
    continueOnError = false,
    ...validatorOptions
  }: ValidateConfig = {}
) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await validateOrReject(plainToClass(type, req[subject]), {
      forbidUnknownValues: true,
      validationError: { target: false },
      ...validatorOptions,
    });
  } catch (errors) {
    if (continueOnError) {
      req.app.locals.errors = errors;
    } else {
      return next(new ValidationError(errors));
    }
  }
  return next();
};
