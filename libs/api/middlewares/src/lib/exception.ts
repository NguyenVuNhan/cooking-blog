import { Application, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { log } from '@cookingblog/shared/api/utils';
import { APIError } from '@cookingblog/shared/exception';

interface ErrorResponse {
  msg: string;
  param: string;
  location?: string;
}

class Handler {
  /**
   * Handles all the not found routes
   */
  public static notFoundHandler(_express: Application): Application {
    _express.use((req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
      return res.status(404).json({
        data: {
          errors: [
            {
              msg: 'Not found',
              param: 'error',
              location: req.originalUrl,
            },
          ],
        },
        message: 'Not found',
        success: false,
      });
    });

    return _express;
  }

  /**
   * Handles validation results
   */
  static validatorHandler(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req).formatWith<ErrorResponse>(
      ({ msg, param }) => ({
        msg,
        param,
      })
    );

    // No error found
    if (result.isEmpty()) next();
    // Return error response
    else
      res.status(400).json({
        data: { errors: result.array() },
        message: 'Error',
        success: false,
      });
  }

  /**
   * Handles your api/web routes errors/exception
   */
  static clientErrorHandler(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    if (err instanceof APIError) {
      return res.status(err.status).json({
        data: {
          errors: [{ msg: err.toString(), param: 'error' }],
        },
        message: 'Something went wrong!',
        success: false,
      });
    }

    if (req.xhr) {
      return res.status(500).json({
        data: {
          error: 'Something went wrong!',
        },
        message: 'Something went wrong!',
        success: false,
      });
    }

    return next(err);
  }

  /**
   * Register error / exception monitoring
   */
  static logErrors(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    _req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    if (!(err instanceof APIError)) {
      log.error(err.stack || err.message);
    }

    return next(err);
  }
}

export default Handler;
