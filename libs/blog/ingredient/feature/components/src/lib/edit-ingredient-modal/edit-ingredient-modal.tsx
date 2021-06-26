import { UpdateRecipeReq } from '@cookingblog/api/interfaces';
import { RecipeDTO } from '@cookingblog/api/recipe/dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddIngredientModal } from '../add-ingredient-modal/add-ingredient-modal';

export interface EditIngredientModalProps {
  defaultIngredients: UpdateRecipeReq['ingredients'];
  open: boolean;
  handleClose: () => void;
  onUpdate: (data: UpdateRecipeReq) => void;
}

export function EditIngredientModal(props: EditIngredientModalProps) {
  const { defaultIngredients, onUpdate, ...rest } = props;
  const formMethods = useForm<UpdateRecipeReq>({
    resolver: classValidatorResolver(RecipeDTO),
    defaultValues: { ingredients: defaultIngredients },
  });
  const { reset } = formMethods;
  const handleModalSave = (ingredients: UpdateRecipeReq['ingredients']) => {
    onUpdate({ ingredients });
  };

  useEffect(() => {
    reset({ ingredients: defaultIngredients });
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
