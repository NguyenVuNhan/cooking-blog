import { IBaseRepository } from '@cookingblog/express/api/core';
import { IMealPlannerModel } from './meal-planner.entity';

// ======================================================================
// Repository
// ======================================================================
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMealPlannerRepository
  extends IBaseRepository<IMealPlannerModel> {}
