import cors from 'cors';
import { Application } from 'express';

import { log } from '@cookingblog/utils';

class CORS {
  public mount(_express: Application, config: { url: string }): Application {
    log.info("Booting the 'CORS' middleware...");

    const options = {
      origin: config.url,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    };

    _express.use(cors(options));

    return _express;
  }
}

export default new CORS();
