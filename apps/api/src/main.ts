import 'reflect-metadata'; // Required by class-transformer
import { connect } from 'mongoose';
import { environment as config } from './environments/environment';
import { RedisCache } from '@cookingblog/express/api/cache';
import { ServiceCache } from '@cookingblog/express/api/core';
import Application from './app/app';
import { UserRepository, UserService } from '@cookingblog/api/user';
import { AuthService } from '@cookingblog/api/auth';
import { RecipeRepository, RecipeService } from '@cookingblog/api/recipe';
import {
  IngredientRepository,
  IngredientService,
} from '@cookingblog/api/ingredient';

// ======================================================================
// General
// ======================================================================
const logger = console;

const cache = new RedisCache(
  {
    host: config.redisHttpHost,
    port: config.redisHttpPort,
  },
  logger
);

// ======================================================================
// Repositories
// ======================================================================
const userRepository = new UserRepository();
const ingredientRepository = new IngredientRepository();
const recipeRepository = new RecipeRepository();

// ======================================================================
// Services
// ======================================================================
const serviceCache: ServiceCache = {
  cache,
  appName: config.appName,
  uniqueKey: config.redisPrefix,
  second: config.redisTimeout,
};

const userService = new UserService({
  repo: userRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'user' },
});
const authService = new AuthService({ logger, userService });
const ingredientService = new IngredientService({
  repo: ingredientRepository,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'ingredient' },
});
const recipeService = new RecipeService({
  repo: recipeRepository,
  ingredientService,
  logger,
  serviceCache: { ...serviceCache, uniqueKey: 'recipe' },
});

// ======================================================================
// Application
// ======================================================================
const app = new Application({
  authService,
  ingredientService,
  recipeService,
  userService,
  logger,
  config,
});

async function main() {
  connect(
    config.mongodbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
      logger.info('Connecting to mongodb');
      // handle the error case
      if (error) {
        logger.info('Failed to connect to the mongodb !!');
        // eslint-disable-next-line no-console
        console.log(error);
        throw error;
      } else {
        logger.info('Connected to mongodb');
      }
    }
  );

  app.showInfo();
  app.start();
}

main().catch((e) => {
  logger.error('Running app error: ', e);
  process.exit(1);
});

process.on('beforeExit', async (code) => {
  logger.error(`Process beforeExit event with code ${code}`);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  logger.error(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.error(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});
