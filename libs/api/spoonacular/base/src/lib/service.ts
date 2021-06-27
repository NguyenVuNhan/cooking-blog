import { BaseCachingService } from '@cookingblog/express/api/core';
import { SpoonacularBaseServiceProp } from './types';
import axios, { AxiosRequestConfig } from 'axios';
import {
  AppError,
  StatusCodes,
  getReasonPhrase,
} from '@cookingblog/express/api/common';

export class SpoonacularBaseService extends BaseCachingService {
  private baseUrl: string;
  private apiKeys: string[];

  constructor({
    apiKeys,
    serviceCache,
    logger,
    baseUrl,
  }: SpoonacularBaseServiceProp) {
    super(serviceCache, logger);
    this.apiKeys = apiKeys;
    this.baseUrl = baseUrl;
  }

  protected async getData<T>(
    url: string,
    method: 'get' | 'post',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataMapping: (data: any) => T,
    params?: URLSearchParams | Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    // Get key based on params
    let key = url;
    const headers = {};
    if (params instanceof URLSearchParams) {
      key = `${url}_${params.toString()}`;
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (typeof params === 'object') {
      key = `${url}_${JSON.stringify(params)}`;
      headers['Content-Type'] = 'application/json';
    }
    const result = (await this.getCache(key)) as T;
    if (result) return result;

    const _config = {
      headers,
      ...config,
    };

    // try different api key
    for (const key of this.apiKeys) {
      const _url = `${this.baseUrl}${url}&apiKey=${key}`;
      this.logger.debug('Calling ext api at: ' + _url);

      try {
        let data: T;
        switch (method) {
          case 'get':
            data = await axios.get(_url);
            break;
          case 'post':
            data = await axios.post(_url, params, _config);
            break;
        }
        data = dataMapping(data);

        this.setCache(key, JSON.stringify(data));
        return data as T;
      } catch (err) {
        const { status, message } = err.response.data;
        this.logger.debug(`Spoonacular error ${status} - ${message}`);
        this.logger.debug(`\tStatus: ${status}`);
        try {
          this.logger.debug(`\tReason: ${getReasonPhrase(status)}`);
        } catch {
          this.logger.debug(`\tReason: unknown`);
        }
        this.logger.debug(`\tMessage: ${message}`);
        continue;
      }
    }

    // If non of api key was working
    this.logger.warn("Spoonacular wasn't able to process data");
    this.logger.warn(`\turl ${url} - `, params);
    throw new AppError(
      StatusCodes.SERVICE_UNAVAILABLE,
      'Service unavailable, please try again later'
    );
  }
}
