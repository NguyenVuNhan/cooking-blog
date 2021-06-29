export interface APIConfig {
  appName: string;
  appVersion: string;
  production: boolean;
  port: number;
  isCORSEnabled: boolean;
  appSecret: string;
  url: string;
  maxUploadLimit: string;
  maxParameterLimit: number;
  mongodbUrl: string;
  apiPrefix: string;
  queueMonitor: boolean;
  queueMonitorHttpPort: number;
  redisPrefix: string;
  redisHttpPort: number;
  redisHttpHost: string;
  redisDB: number;
  redisTimeout: number;
  jwtExpiresIn: number;
  spoonacularApiKeys: string[];
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}
