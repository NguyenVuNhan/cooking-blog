import { AuthController } from '@cookingblog/api/auth';
import { IngredientsController } from '@cookingblog/api/ingredient';
import { RecipeController } from '@cookingblog/api/recipe';
import { IUserModel, IUserService } from '@cookingblog/api/user';
import { BaseApp } from '@cookingblog/express/api/core';
import { default as expressWinston } from 'express-winston';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment as config } from '../environments/environment';
import { logger, transports } from './logger';
import {
  authService,
  ingredientService,
  recipeService,
  userService,
} from './services';

class Application extends BaseApp {
  private userService: IUserService;
  private appSecret: string;

  constructor() {
    super(logger, {
      name: config.appName,
      version: config.appVersion,
      debug: process.env.NODE_ENV === 'development',
      port: config.port,
      locals: config,
      cors: { origin: config.url, optionsSuccessStatus: 200 },
    });
    this.addController(new AuthController(authService));
    this.addController(new IngredientsController(ingredientService));
    this.addController(new RecipeController(recipeService));

    this.userService = userService;
    this.appSecret = config.appSecret;
  }

  private setupPassport(userService: IUserService, secretOrKey: string) {
    // Setup user serialize and deserialize
    passport.serializeUser<string>((user, done) => {
      done(null, (user as IUserModel).id);
    });

    passport.deserializeUser((id: string, done) => {
      userService
        .findOne({ id })
        .then((user) => done(null, user))
        .catch((err) => done(err, false));
    });

    // JWT strategy
    passport.use(
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey,
        },
        (payload, done) => {
          userService
            .findOne({ id: payload.id })
            .then((user) => (user ? done(null, user) : done(null, false)))
            .catch((err) => done(err, false));
        }
      )
    );
  }

  protected mountCustomMiddleware() {
    this.logger.info('Booting custom middleware...');

    // Setup logging
    super.mountCustomMiddleware(expressWinston.logger({ transports }));

    // Passport
    super.mountCustomMiddleware(passport.initialize());
    super.mountCustomMiddleware(passport.session());
    this.setupPassport(this.userService, this.appSecret);
  }
}

export default Application;
