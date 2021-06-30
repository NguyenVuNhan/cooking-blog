import { RedisCache } from '@cookingblog/express/api/cache';
import IORedis from 'ioredis';
import { environment as config } from '../environments/environment';
import { logger } from './logger';

export const cache = new RedisCache(
  {
    host: config.redisHttpHost,
    port: config.redisHttpPort,
  },
  logger
);

export const connection = new IORedis({
  host: config.redisHttpHost,
  port: config.redisHttpPort,
  db: 3,
});
