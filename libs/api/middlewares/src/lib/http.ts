import { APIConfig } from '@cookingblog/api-interfaces';
import compress from 'compression';
import MongoStore from 'connect-mongo';
import { Application, json, urlencoded } from 'express';
import session from 'express-session';
import { log } from '@cookingblog/shared/api/utils';

class Http {
  public static mount(express: Application, config: APIConfig): Application {
    log.info("Booting the 'HTTP' middleware...");

    // Enables the request body parser
    express.use(
      json({
        limit: config.maxUploadLimit,
      })
    );

    express.use(
      urlencoded({
        limit: config.maxUploadLimit,
        parameterLimit: config.maxParameterLimit,
        extended: false,
      })
    );

    // Disable the x-powered-by header in response
    express.disable('x-powered-by');

    /**
     * Enables the session store
     *
     * Note: You can also add redis-store
     * into the options object.
     */
    const options = {
      resave: true,
      saveUninitialized: true,
      secret: config.appSecret,
      cookie: {
        maxAge: 1209600000, // two weeks (in ms)
      },
      store: new MongoStore({
        mongoUrl: config.mongodbUrl,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
    };

    express.use(session(options));

    // Enables the "gzip" / "deflate" compression for response
    express.use(compress());

    return express;
  }
}

export default Http;
