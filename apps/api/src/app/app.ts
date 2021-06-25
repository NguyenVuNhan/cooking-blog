import { AuthController, IAuthService } from '@cookingblog/api/auth';
import {
  IIngredientService,
  IngredientsController,
} from '@cookingblog/api/ingredient';
import { IRecipeService, RecipeController } from '@cookingblog/api/recipe';
import { IUserModel, IUserService } from '@cookingblog/api/user';
import { ILogger } from '@cookingblog/express/api/common';
import { BaseApp } from '@cookingblog/express/api/core';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { APIConfig } from '../types';

type ApplicationProp = {
  authService: IAuthService;
  ingredientService: IIngredientService;
  recipeService: IRecipeService;
  userService: IUserService;
  logger: ILogger;
  config: APIConfig;
};

export default class Application extends BaseApp {
  private userService: IUserService;
  private appSecret: string;

  constructor({
    authService,
    ingredientService,
    recipeService,
    userService,
    logger,
    config,
  }: ApplicationProp) {
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

    // Passport
    super.mountCustomMiddleware(passport.initialize());
    super.mountCustomMiddleware(passport.session());
    this.setupPassport(this.userService, this.appSecret);
  }
}
