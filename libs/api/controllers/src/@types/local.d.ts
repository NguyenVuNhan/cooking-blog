import { APIConfig } from '@cookingblog/api-interfaces';
import { Application as App } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  export interface Application extends App {
    locals: APIConfig;
  }
}
