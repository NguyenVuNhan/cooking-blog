import { environment as config } from '../environments/environment';
import { RedisCache } from '@cookingblog/express/api/cache';
import { logger } from './logger';

export const cache = new RedisCache(
  {
    host: config.redisHttpHost,
    port: config.redisHttpPort,
  },
  logger
);
