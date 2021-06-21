import { IBaseRepository } from '@cookingblog/express/api/core';
import { IRecipeRankModel } from './recipe-rank.entity';

// ======================================================================
// Repository
// ======================================================================
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecipeRankRepository
  extends IBaseRepository<IRecipeRankModel> {}
