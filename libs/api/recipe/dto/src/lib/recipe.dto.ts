import { IsNonPrimitiveArray } from '@cookingblog/shared/validator-decorator';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class StepDTO {
  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];
}

export class IngredientDTO {
  @IsString()
  ingredient: string;

  @IsString()
  quantity: string;
}

export class RecipeDTO {
  @IsString()
  title: string;

  @IsString()
  duration: string;

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => StepDTO)
  steps: StepDTO[];

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => IngredientDTO)
  ingredients: IngredientDTO[];
}
