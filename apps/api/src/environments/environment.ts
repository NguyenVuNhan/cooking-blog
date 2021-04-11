import { AppConfig } from '@api/configs';

export const environment: AppConfig = {
  port: 5000,
  isCORSEnabled: true,
  appSecret: 'SeCrEt',
  url: 'http://localhost:5000',
  maxUploadLimit: '50mb',
  maxParameterLimit: 5000,
  mongodbUrl:
    'mongodb://root:rootpassword@localhost:27017/local?authSource=admin',
  apiPrefix: 'api',
  queueMonitor: false,
  queueMonitorHttpPort: 5550,
  redisPrefix: 'queue',
  redisHttpPort: 6379,
  redisHttpHost: 'localhost',
  redisDB: 3,
};
