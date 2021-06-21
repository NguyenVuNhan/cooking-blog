import { BaseEntity } from '@cookingblog/express/api/mongoose';
import { Document } from 'mongoose';

export interface IMealPlanner extends BaseEntity {
  user: string;
  year: number;
  events: {
    timestamp: Date;
    recipe: string;
    recipeName: string;
  };
}

export interface IMealPlannerModel extends Document<string> {
  id: string;
}
