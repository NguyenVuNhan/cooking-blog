import { GetRecipeRes, UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { mapIngredients } from '@cookingblog/blog/ingredient/utils';
import { useUpdateRecipe } from '@cookingblog/blog/recipe/data-access';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddIngredientModal } from '../add-ingredient-modal/add-ingredient-modal';

export interface EditIngredientModalProps {
  recipeId: string;
  defaultIngredients: GetRecipeRes['data']['ingredients'];
  open: boolean;
  handleClose: () => void;
}

export function EditIngredientModal(props: EditIngredientModalProps) {
  const { defaultIngredients = [], recipeId, ...rest } = props;
  const formMethods = useForm<UpdateRecipeReq>({
    resolver: classValidatorResolver(RecipeDTO),
    defaultValues: {
      ingredients: mapIngredients(defaultIngredients),
    },
  });
  const { reset } = formMethods;

  const updateRecipe = useUpdateRecipe(recipeId);

  const handleModalSave = (ingredients: UpdateRecipeReq['ingredients']) => {
    updateRecipe({ ingredients });
  };

  useEffect(() => {
    reset({ ingredients: mapIngredients(defaultIngredients) });
  }, [defaultIngredients, reset]);

  return (
    <FormProvider {...formMethods}>
      <AddIngredientModal
        title="Edit Ingredient"
        handleSave={handleModalSave}
        {...rest}
      />
    </FormProvider>
  );
}

export default EditIngredientModal;
