import { ILogger } from '@cookingblog/express/api/common';
import { ServiceCache } from '@cookingblog/express/api/core';

// ======================================================================
// Service
// ======================================================================
export type SpoonacularBaseServiceProp = {
  logger: ILogger;
  serviceCache: ServiceCache;
  apiKeys: string[];
  baseUrl: string;
};
