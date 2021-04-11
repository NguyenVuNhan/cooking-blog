import { APIConfig } from '@cookingblog/api-interfaces';
import { log } from '@cookingblog/utils';
import { Application } from 'express';
import apiRouter from '@api/routes';

class Routes {
  public mountApi(express: Application, config: APIConfig): Application {
    const apiPrefix = config.apiPrefix;
    log.info('Routes :: Mounting API Routes...');

    return express.use(`/${apiPrefix}`, apiRouter);
  }
}

export default new Routes();
