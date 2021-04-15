import {
  AddRecipeReq,
  IRecipe,
  UpdateRecipeReq,
} from '@cookingblog/api-interfaces';
import { AddIngredientModal } from '@cookingblog/blog/ui/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface EditIngredientModalProps {
  defaultIngredients: IRecipe['ingredients'];
  open: boolean;
  handleClose: () => void;
  onUpdate: (data: UpdateRecipeReq) => void;
}

export function EditIngredientModal(props: EditIngredientModalProps) {
  const { defaultIngredients, onUpdate, ...rest } = props;
  const { register, control, reset } = useForm<AddRecipeReq>({
    defaultValues: {
      ingredients: defaultIngredients,
    },
  });
  const handleModalSave = (ingredients: IRecipe['ingredients']) => {
    onUpdate({ ingredients });
  };

  useEffect(() => {
    reset({ ingredients: defaultIngredients });
  }, [defaultIngredients, reset]);

  return (
    <AddIngredientModal
      title="Edit Ingredient"
      control={control}
      register={register}
      handleSave={handleModalSave}
      {...rest}
    />
  );
}

export default EditIngredientModal;
