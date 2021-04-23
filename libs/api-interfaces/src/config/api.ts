export interface APIConfig {
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
  jwtExpiresIn: number;
}
