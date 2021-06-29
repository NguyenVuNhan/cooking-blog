import dotenv from 'dotenv';
import { APIConfig } from '../types';

dotenv.config();

export const environment: APIConfig = {
  appName: 'Cooking Blog Api',
  appVersion: '1.0.0',
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
  redisTimeout: 60,
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  spoonacularApiKeys: [
    process.env.SPOONACULAR_API_KEY_1,
    process.env.SPOONACULAR_API_KEY_2,
    process.env.SPOONACULAR_API_KEY_3,
    process.env.SPOONACULAR_API_KEY_4,
    process.env.SPOONACULAR_API_KEY_5,
  ],
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : void 0,
    secure: process.env.SMTP_SECURE === 'true' ? true : false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
};
