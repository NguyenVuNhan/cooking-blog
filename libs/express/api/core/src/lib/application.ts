import {
  AppError,
  ILogger,
  NotFoundError,
} from '@cookingblog/express/api/common';
import compression from 'compression';
import cors from 'cors';
import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import http, { Server } from 'http';
import { createErrorResponse, sendErrorResponse } from './helpers';
import { Config, IController } from './types';

const defaultAppConfig: Config = {
  port: 5000,
  debug: false,
  version: '1.0.0',
  name: 'Express application',
  cors: {},
  urlEncoded: { extended: false },
  json: { limit: '50MB' },
  locals: {},
};

export abstract class BaseApp {
  private app: Application;
  private server: Server;

  constructor(public logger: ILogger, private config: Config = {}) {
    this.config = { ...defaultAppConfig, ...config };

    this.app = express();

    this.handleRequestError = this.handleRequestError.bind(this);

    logger.info('Mounting local variables...');
    this.app.locals = this.config.locals;
    logger.info('Booting middleware...');
    this.app.use(cors(this.config.cors));
    this.app.use(urlencoded(this.config.json));
    this.app.use(json(this.config.json));
    this.app.use(compression());
    this.server = http.createServer(this.app);
  }

  protected setupControllers(...controllers: IController[]): void {
    this.logger.info('Booting controllers...');
    controllers.forEach((controller) => {
      this.logger.info('--> Mount controller at ' + controller.prefix);
      if (controller.prefix) {
        this.app.use(controller.prefix, controller.router);
      } else {
        this.app.use(controller.router);
      }
    });

    this.app.use(this.handleNotImplementedError);
    this.app.use(this.handleRequestError);
  }

  protected handleNotImplementedError(_req: Request, _res: Response): void {
    throw new NotFoundError('Resource Not Found');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected handleRequestError(
    err: AppError | Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    if (this.config.debug) {
      this.logger.warn(
        `API Error: ${req.url}`,
        (createErrorResponse(err) as unknown) as never
      );
    }

    sendErrorResponse(err, res);
  }

  showInfo(): void {
    this.logger.info(`Application: ${this.config.name}`);
    this.logger.info(`Version: ${this.config.version} \n`);
  }

  start(): void {
    this.logger.info(`Starting server...`);
    this.server.listen(this.config.port, () => {
      this.logger.info(`Server running at Port: ${this.config.port}`);
    });
  }

  close(): void {
    this.logger.info(`Closing server...\n`);

    this.server.close((err) => {
      if (err) {
        this.logger.error(`Closing server failed`, err);
      }
    });
  }
}
