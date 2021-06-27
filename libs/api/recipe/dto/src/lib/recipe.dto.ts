import { IsNonPrimitiveArray } from '@cookingblog/shared/validator-decorator';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class StepDTO {
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];
}

export class IngredientDTO {
  @IsString()
  @IsNotEmpty({ message: 'Ingredient is required' })
  ingredient: string;

  @IsString()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: string | number;
}

export class RecipeDTO {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Duration is required' })
  duration: string;

  @IsNumber()
  @Min(1, { message: 'Serving must be bigger than 1' })
  @IsNotEmpty({ message: 'Serving is required' })
  serving: number;

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => StepDTO)
  @ArrayNotEmpty({ message: 'At least one step is required' })
  steps: StepDTO[];

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => IngredientDTO)
  @ArrayNotEmpty({ message: 'At least one ingredient is required' })
  ingredients: IngredientDTO[];
}

export class ExtractDTO {
  @IsString()
  @IsNotEmpty({ message: 'Url is required' })
  url: string;
}
