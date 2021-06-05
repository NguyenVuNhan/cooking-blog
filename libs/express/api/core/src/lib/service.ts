import {
  IBaseRepository,
  FindAllOption,
  FindAllResponse,
  IBaseService,
  ServiceCache,
  UpdateOptions,
} from './types';
import { ILogger } from '@cookingblog/express/api/common';
import { ICache } from '@cookingblog/express/api/cache';

const CACHE_REF_ID = '#refId_';
export abstract class BaseService<T extends { id: string }>
  implements IBaseService<T> {
  private cache?: ICache;
  private prefix?: string;
  private ttl?: number;

  constructor(
    public repo: IBaseRepository<T>,
    cache?: ServiceCache,
    protected logger: ILogger = console
  ) {
    this.repo = repo;
    this.cache = cache?.cache;
    this.prefix = cache?.appName ? cache.appName + '/' + cache.uniqueKey : 'c';
    this.ttl = cache?.second;
    this.logger = logger;
  }

  async create(entity: Partial<T>): Promise<T> {
    const _entity = await this.repo.create(entity);
    return _entity;
  }

  async updateById(id: string, doc: Partial<T>): Promise<boolean> {
    const result = await this.repo.updateById(id, doc);

    this.deleteCache(({ id } as unknown) as Partial<T>);
    return result;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.repo.deleteById(id);

    this.deleteCache(({ id } as unknown) as Partial<T>);
    return result;
  }

  async findOne(query: Partial<T>): Promise<T> {
    const data = await this.getCache(query);
    if (data) return data;

    const _entity = await this.repo.findOne(query);

    if (_entity) this.setCache(query, _entity);
    return _entity;
  }

  async findOneAndUpdate(
    query: Partial<T>,
    doc: Partial<T>,
    options?: UpdateOptions
  ): Promise<T> {
    const _entity = await this.repo.findOneAndUpdate(query, doc, options);

    if (_entity) this.setCache(query, _entity);
    return _entity;
  }

  async findMany(query: Partial<T>): Promise<T[]> {
    const _entities = await this.repo.findMany(query);
    return _entities;
  }

  async findAll(
    query: Partial<T>,
    option?: Partial<FindAllOption>
  ): Promise<FindAllResponse<T>> {
    const data = await this.repo.findAll(query, option);
    return data;
  }

  protected async getCache(query: Partial<T>): Promise<T | null> {
    if (!this.cache) return null;
    if (!Object.keys(query).length) return null;

    const key = this.createCacheKey(query);
    try {
      let result = await this.cache.getAsync(key);
      if (!result) return null;

      // Find again
      if (typeof result === 'string' && result.startsWith(CACHE_REF_ID)) {
        const id = result.split(CACHE_REF_ID)[1];

        result = await this.cache.getAsync(this.createCacheKey({ id }));
        if (result) return JSON.parse(result) as T;

        // Only set cache automatic with this case
        // Another case must call set cache manual
        const entity = await this.repo.findOne(({
          id,
        } as unknown) as Partial<T>);
        if (entity) {
          this.setCache(({ id } as unknown) as Partial<T>, entity);
        }

        return entity;
      }

      // Exception
      return JSON.parse(result);
    } catch (error) {
      this.logger?.warn(`Get cache with key ${key} error: `, error);
      return null;
    }
  }

  protected deleteCache(query: Partial<T>): void {
    if (!this.cache) return;
    if (!Object.keys(query).length) return;

    const key = this.createCacheKey(query);

    this.cache.delAsync(key).catch((error) => {
      this.logger?.warn(`Delete cache with key ${key} error: `, error);
    });
  }

  protected setCache(query: Partial<T>, entity: T): void {
    if (!this.cache) return;
    if (!Object.keys(query).length) return;

    const key = this.createCacheKey(query);

    if (query.id) {
      this.cache
        .setAsync(key, JSON.stringify(entity), 'EX', this.ttl)
        .catch((error) => {
          this.logger?.warn(`Set cache with key ${key} error: `, error);
        });
      return;
    }

    this.cache
      .setAsync(key, `${CACHE_REF_ID}${entity.id}`, 'EX', this.ttl)
      .catch((error) => {
        this.logger?.warn(`Set cache with key ${key} error: `, error);
      });
    return;
  }

  protected createCacheKey(obj: Record<string, unknown>): string {
    let result = this.prefix || '';
    for (const key of Object.keys(obj)) {
      result += `|${key}_${obj[key]}`;
    }

    return result;
  }
}
