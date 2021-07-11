import { IIngredientService } from '@cookingblog/api/ingredient';
import { ISpoonacularRecipesService } from '@cookingblog/api/spoonacular/recipes';
import { ISpoonacularIngredientsService } from '@cookingblog/api/spoonacular/ingredients';
import {
  AlreadyExistsError,
  NotFoundError,
  PermissionDeniedError,
} from '@cookingblog/express/api/common';
import { BaseService } from '@cookingblog/express/api/core';
import {
  IRecipeIngredient,
  IRecipeModel,
  IRecipe,
  IRecipeStep,
} from './recipe.entity';
import {
  IRecipeRepository,
  IRecipeService,
  RecipeServiceProp,
} from './recipe.types';

export class RecipeService
  extends BaseService<IRecipeModel>
  implements IRecipeService
{
  repo: IRecipeRepository;
  ingredientService: IIngredientService;
  spoonacularRecipesService: ISpoonacularRecipesService;
  spoonacularIngredientsService: ISpoonacularIngredientsService;

  constructor({
    repo,
    logger,
    serviceCache,
    ingredientService,
    spoonacularRecipesService,
    spoonacularIngredientsService,
  }: RecipeServiceProp) {
    super(repo, serviceCache, logger);
    this.ingredientService = ingredientService;
    this.spoonacularRecipesService = spoonacularRecipesService;
    this.spoonacularIngredientsService = spoonacularIngredientsService;
  }

  async extractRecipe(user: string, url: string): Promise<IRecipe> {
    const extractedRecipe = await this.spoonacularRecipesService.extract(url);

    const findRecipe = await this.repo.findOne({
      title: extractedRecipe.title,
      user,
    });
    if (findRecipe) {
      throw new AlreadyExistsError('Recipe already exists');
    }

    const ingredientPromises: Promise<IRecipeIngredient>[] =
      extractedRecipe.extendedIngredients
        .filter(({ name }) => name ?? false)
        .map(async (ingredient): Promise<IRecipeIngredient> => {
          const raw_data = ingredient.originalString;
          const findIngredient = await this.ingredientService.findOne({
            name: ingredient.name,
          });

          let id = findIngredient?.id;
          // Ingredient already exist
          if (!findIngredient) {
            const possibleUnits = ingredient.id
              ? (
                  await this.spoonacularIngredientsService.information(
                    ingredient.id
                  )
                ).possibleUnits
              : [];

            const newIngredient = await this.ingredientService.create({
              name: ingredient.name,
              image: ingredient.image,
              possibleUnits,
              aisle: ingredient.aisle,
            });

            id = newIngredient.id;
          }

          return {
            ingredient: id,
            ingredient_name: ingredient.name,
            quantity: ingredient.amount,
            unit: ingredient.unit,
            raw_data: raw_data,
          };
        });
    // Check ingredient list
    const ingredients = await Promise.all(ingredientPromises);
    const ingredientsStr = ingredients.map((v) => v.ingredient_name).join(', ');

    return {
      id: '-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: extractedRecipe.title,
      user,
      serving: extractedRecipe.servings,
      ingredientsStr,
      ingredients,
      duration: '',
      steps: extractedRecipe.analyzedInstructions.reduce(
        (acc, curr) => [
          ...acc,
          ...curr.steps.map((step) => ({
            description: step.step,
            duration: '',
            ingredients: step.ingredients.map((ingredient) => ingredient.name),
          })),
        ],
        [] as IRecipeStep[]
      ),
      sourceUrl: url,
      image: extractedRecipe.image,
    };
  }

  async getRandomRecipe(): Promise<IRecipeModel> {
    const recipe = await this.repo.getRandom();

    if (!recipe) throw new NotFoundError('Recipe not found');
    return recipe;
  }

  async deleteRecipe(user: string, id: string): Promise<boolean> {
    const recipe = await this.findOne({ id });
    if (!recipe) {
      throw new NotFoundError(`Recipe not found`);
    }

    if (recipe.user.toString() != user) {
      throw new PermissionDeniedError();
    }

    return this.deleteById(id);
  }

  async search(query: string): Promise<IRecipeModel[]> {
    let recipes: IRecipeModel[] = [];

    if (query) {
      recipes = await this.repo.search(query);
    } else {
      recipes = await this.repo.findMany({});
    }

    return recipes;
  }

  async create(entity: Partial<IRecipeModel>): Promise<IRecipeModel> {
    if (await this.findOne({ title: entity.title })) {
      throw new AlreadyExistsError(`Recipe ${entity.title} already exists`);
    }

    const ingredientData = await this.addNewIngredients(entity);

    // Add new ingredients to database
    entity.ingredients = ingredientData.ingredients;
    entity.ingredientsStr = ingredientData.ingredientsStr;

    return super.create(entity);
  }

  async updateRecipe(
    user: string,
    id: string,
    doc: Partial<IRecipeModel>
  ): Promise<IRecipeModel> {
    const recipe = await this.findOne({ id });
    if (!recipe) {
      throw new NotFoundError(`Recipe not found`);
    }

    if (recipe.user.toString() !== user) {
      throw new PermissionDeniedError();
    }

    // If new title was given, check whether it exist or not
    if (doc.title && doc.title != recipe.title) {
      if (await this.findOne({ title: doc.title })) {
        throw new AlreadyExistsError(`Recipe ${doc.title} already exists`);
      }
    }

    if (doc.ingredients) {
      const ingredientData = await this.addNewIngredients(doc);

      // Add new ingredients to database
      doc.ingredients = ingredientData.ingredients;
      doc.ingredientsStr = ingredientData.ingredientsStr;
    }

    delete doc.user;
    return super.findOneAndUpdate({ id }, doc);
  }

  private async addNewIngredients(
    recipe: Partial<IRecipeModel>
  ): Promise<{ ingredients: IRecipeIngredient[]; ingredientsStr: string }> {
    const ingredientPromises: Promise<IRecipeIngredient>[] =
      recipe.ingredients.map(
        async ({ quantity, ingredient }): Promise<IRecipeIngredient> => {
          const raw_data = (quantity ? quantity + ' of ' : '') + ingredient;
          const data = await this.spoonacularRecipesService.parseIngredients(
            raw_data
          );
          const name = ingredient.toLowerCase();
          const newIngredient = await this.ingredientService.create({
            name,
            image: data.image,
            possibleUnits: data.possibleUnits,
            aisle: data.aisle,
          });

          return {
            ingredient: newIngredient.id as string,
            ingredient_name: name,
            quantity: data.amount,
            unit: data.unit,
            raw_data,
          };
        }
      );

    // Add new ingredients to database
    const ingredients = await Promise.all(ingredientPromises);
    const ingredientsStr = recipe.ingredients
      .map((v) => v.ingredient)
      .join(', ');
    return { ingredients, ingredientsStr };
  }
}
