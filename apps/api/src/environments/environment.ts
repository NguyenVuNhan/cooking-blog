import { APIConfig } from '../types';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../../.env.local' });

export const environment: APIConfig = {
  appName: 'Cooking Blog Api',
  appVersion: '0.0.1',
  production: false,
  port: 5000,
  isCORSEnabled: true,
  appSecret: 'SeCrEt',
  url: 'http://localhost:3000',
  maxUploadLimit: '50mb',
  maxParameterLimit: 5000,
  mongodbUrl:
    'mongodb://root:rootpassword@localhost:27017/cookingblog?authSource=admin',
  apiPrefix: 'api',
  queueMonitor: false,
  queueMonitorHttpPort: 5550,
  redisPrefix: 'queue',
  redisHttpPort: 6379,
  redisHttpHost: 'localhost',
  redisDB: 3,
  jwtExpiresIn: 60 * 24,
  redisTimeout: 60,
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
