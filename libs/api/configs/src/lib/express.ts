import express, { Application } from 'express';
import Passport from './passport';

import routes from './routes';
import { exception } from '@api/middlewares';
import { APIConfig } from '@cookingblog/api-interfaces';
import { cors, http, swagger } from '@api/middlewares';

class Express {
  /**
   * Create the express object
   */
  public express: Application;
  private config: APIConfig;

  /**
   * Initializes the express server
   */
  constructor(config: APIConfig) {
    this.express = express();
    this.config = config;

    this.mountDotEnv();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountDotEnv(): void {
    this.express.locals = { ...this.express.locals, ...this.config };
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddlewares(): void {
    if (this.config.isCORSEnabled) {
      // Mount CORS middleware
      this.express = cors.mount(this.express, this.config);
    }

    // Mount basic middlewares
    this.express = http.mount(this.express, this.config);

    // Mount passport for authentication
    this.express = Passport.mountPackage(this.express, this.config);

    // Mount swagger for documentation
    this.express = swagger.mount(this.express, this.config);
  }

  /**
   * Mounts all the defined routes
   */
  private mountRoutes(): void {
    this.express = routes.mountApi(this.express, this.config);
  }

  /**
   * Starts the express server
   */
  public init(): void {
    const port: number = this.config.port;

    // Registering Exception / Error Handlers
    this.express.use(exception.logErrors);
    this.express.use(exception.clientErrorHandler);
    this.express = exception.notFoundHandler(this.express);

    // Start the server on the specified port
    this.express.listen(port, () => {
      // eslint-disable-next-line no-console
      return console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running @ 'http://localhost:${port}'`
      );
    });
  }
}

/** Export the express module */
export default Express;
