import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IRecipeRank extends BaseEntity {
  recipes: {
    recipe: string;
    recipe_name: string;
    last_visit: Date;
    view_count: number;
  }[];
}

export type IRecipeRankModel = IRecipeRank & Document<string>;
