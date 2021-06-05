import { Handler, Router } from 'express';
import { IController } from './types';
import { AsyncFunction } from '@cookingblog/express/api/common';

export abstract class Controller implements IController {
  router: Router;

  constructor(public prefix?: string) {
    this.router = Router();
  }

  setupRouter(): void {
    throw new Error('Not implemented');
  }

  protected wrapTryCatch(handle: AsyncFunction): Handler {
    handle = handle.bind(this);
    return (...args) => handle(...args).catch(args[2]);
  }
}
