import { ICache } from '@cookingblog/express/api/cache';
import { OptionsJson, OptionsUrlencoded } from 'body-parser';
import { CorsOptions, CorsOptionsDelegate } from 'cors';
import { Router } from 'express';

// ======================================================================
// Response
// ======================================================================
export interface BaseResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

// ======================================================================
// Application
// ======================================================================
export type Config = {
  name?: string;
  version?: string;
  port?: number;
  debug?: boolean;
  cors?: CorsOptions | CorsOptionsDelegate;
  urlEncoded?: OptionsUrlencoded;
  json?: OptionsJson;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locals?: Record<string, any>;
};

// ======================================================================
// Controllers
// ======================================================================
export interface IController {
  router: Router;
  prefix?: string;
}

// ======================================================================
// Services
// ======================================================================
export type ServiceCache = {
  appName: string;
  uniqueKey: string;
  cache: ICache;
  second: number;
};

export interface IBaseService<T> {
  create(entity: Partial<T>): Promise<T>;
  updateById(id: string, doc: Partial<T>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;

  findOne(query: Partial<T>): Promise<T>;
  findOneAndUpdate(
    query: Partial<T>,
    doc: Partial<T>,
    options?: UpdateOptions
  ): Promise<T>;
  findMany(query: Partial<T>): Promise<T[]>;
  findAll(
    query: Partial<T>,
    option?: Partial<FindAllOption>
  ): Promise<FindAllResponse<T>>;
}

// ======================================================================
// Repositories
// ======================================================================
export type UpdateOptions = {
  new?: boolean;
  upsert?: boolean;
};

export type DeleteResponse = {
  ok?: number;
  n?: number;
} & {
  deletedCount?: number;
};

export type FindAllOption = {
  fields: string;
  limit: number;
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sort: any;
};

export type FindAllResponse<T> = {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  data: T[];
};

export interface IBaseRepository<T> {
  create(entity: Partial<T>): Promise<T>;
  updateById(id: string, doc: Partial<T>): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  findOne(query: Partial<T>): Promise<T>;
  findOneAndUpdate(
    query: Partial<T>,
    doc: Partial<T>,
    options?: UpdateOptions
  ): Promise<T>;
  findMany(query: Partial<T>): Promise<T[]>;
  findAll(
    query: Partial<T>,
    option?: Partial<FindAllOption>
  ): Promise<FindAllResponse<T>>;
}
