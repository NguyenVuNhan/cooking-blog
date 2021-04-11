import { AppConfig } from './app-config';
import { Application } from 'express';

import { log } from '@api/middlewares';

class Routes {
  public mountApi(express: Application, config: AppConfig): Application {
    const apiPrefix = config.apiPrefix;
    log.info('Routes :: Mounting API Routes...');

    return express.use(`/${apiPrefix}`, (_, res) =>
      res.json({ greeting: 'hello' })
    );
  }
}

export default new Routes();
