import { APIConfig } from '@cookingblog/api-interfaces';
import dotenv from 'dotenv';

dotenv.config();

export const environment: APIConfig = {
  production: true,
  port: parseInt(process.env.PORT),
  isCORSEnabled: Boolean(process.env.CORS_ENABLED),
  appSecret: process.env.APP_SECRET,
  url: process.env.APP_URL,
  maxUploadLimit: process.env.APP_MAX_UPLOAD_LIMIT,
  maxParameterLimit: parseInt(process.env.APP_MAX_PARAMETER_LIMIT),
  mongodbUrl: process.env.MONGOOSE_URL,
  apiPrefix: process.env.API_PREFIX,
  queueMonitor: true,
  queueMonitorHttpPort: parseInt(process.env.QUEUE_HTTP_PORT),
  redisPrefix: process.env.REDIS_QUEUE_PREFIX,
  redisHttpPort: parseInt(process.env.REDIS_QUEUE_PORT),
  redisHttpHost: process.env.REDIS_QUEUE_HOST,
  redisDB: parseInt(process.env.REDIS_QUEUE_DB),
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN),
};
