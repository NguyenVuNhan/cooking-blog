import { BaseRes } from './base';

export type GetIngredientsRes = BaseRes<{
  ingredients: string[];
}>;
