import { APIConfig } from '@cookingblog/api-interfaces';

export const environment: APIConfig = {
  appName: 'Cooking Blog Api',
  appVersion: '0.0.1',
  production: false,
  port: 5000,
  isCORSEnabled: true,
  appSecret: 'SeCrEt',
  url: 'http://localhost:5000',
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
};
