import {
  AppError,
  ILogger,
  NotFoundError,
} from '@cookingblog/express/api/common';
import compression from 'compression';
import cors from 'cors';
import express, {
  Application,
  Handler,
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
  private controllers: IController[] = [];

  constructor(public logger: ILogger, protected config: Config = {}) {
    this.config = { ...defaultAppConfig, ...config };

    this.app = express();
    this.server = http.createServer(this.app);

    this.handleRequestError = this.handleRequestError.bind(this);
  }

  private setupControllers(): void {
    this.logger.info('Mounting controllers...');
    this.controllers.forEach((controller) => {
      this.logger.info('--> Add controller at ' + controller.prefix);
      if (controller.prefix) {
        this.app.use(controller.prefix, controller.router);
      } else {
        this.app.use(controller.router);
      }
    });

    this.app.use(this.handleNotImplementedError);
    this.app.use(this.handleRequestError);
  }

  private handleNotImplementedError(_req: Request, _res: Response): void {
    throw new NotFoundError('Resource Not Found');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  private handleRequestError(
    err: AppError | Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    const e = createErrorResponse(err);
    if (this.config.debug) {
      this.logger.warn(`API Error: ${req.url}`, e);
    }

    if (!this.config.debug && e.code && e.code == 500)
      return sendErrorResponse(new Error(), res);
    sendErrorResponse(err, res);
  }

  protected addController(controller: IController): void {
    this.controllers.push(controller);
  }

  protected mountCustomMiddleware(...middlewares: Handler[]) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  showInfo(): void {
    this.logger.info(
      '======================================================================'
    );
    this.logger.info(`Application: ${this.config.name}`);
    this.logger.info(`Version: ${this.config.version}`);
    this.logger.info(
      '======================================================================\n\n'
    );
  }

  start(): void {
    this.logger.info('Mounting local variables...');
    this.app.locals = this.config.locals;
    this.logger.info('Booting middleware...');
    this.app.use(cors(this.config.cors));
    this.app.use(urlencoded(this.config.json));
    this.app.use(json(this.config.json));
    this.app.use(compression());
    this.mountCustomMiddleware();

    this.setupControllers();

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
